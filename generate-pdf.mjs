/**
 * generate-pdf.mjs
 *
 * Generates portfolio.pdf from the #print route using Playwright.
 * Requires: dev server running at localhost:5173
 *
 * Usage:  node generate-pdf.mjs
 * Output: public/portfolio.pdf
 */

import { createRequire } from 'module';
import { readFileSync, writeFileSync } from 'fs';
const require = createRequire(import.meta.url);
const pw = require('./portfolio/node_modules/playwright');

const DEV_URL = 'http://localhost:5173/#print';
const OUT_PATH = 'public/portfolio.pdf';

(async () => {
  console.log('Launching browser...');
  const browser = await pw.chromium.launch();
  const page = await browser.newPage();

  console.log('Loading print page...');
  await page.goto(DEV_URL, { waitUntil: 'networkidle' });

  // Wait for PaginatedBody measurement to complete (it renders after measuring block heights)
  // The .print-page elements are the final output
  await page.waitForSelector('.print-page', { timeout: 15000 });

  // Give fonts and images a moment to fully load
  await page.waitForTimeout(2000);

  // Force-hide wrapper background and kill trailing blank page
  await page.addStyleTag({ content: `
    html, body, #root, .print-page-wrapper {
      background: #fff !important;
      min-height: auto !important;
    }
    .print-page:last-child { page-break-after: avoid !important; }
  `});

  // Count actual .print-page elements to set page range
  const pageCount = await page.evaluate(() => document.querySelectorAll('.print-page').length);
  console.log(`Generating PDF (${pageCount} pages)...`);
  await page.pdf({
    path: OUT_PATH,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    pageRanges: `1-${pageCount}`,
  });

  // Extract hierarchical bookmark data from DOM before closing browser
  const bookmarkTree = await page.evaluate(() => {
    const pages = [...document.querySelectorAll('.print-page')];
    const getPageNum = (el) => {
      if (!el) return 1;
      // Walk up to find the .print-page ancestor
      let node = el;
      while (node && !node.classList?.contains('print-page')) node = node.parentElement;
      return node ? pages.indexOf(node) + 1 : 1;
    };
    const getPageById = (id) => {
      const el = document.getElementById(id);
      return el ? pages.indexOf(el) + 1 : 1;
    };
    // Find data-nav elements within a project section (between two hero pages)
    const getNavPage = (navLabel, startPage, endPage) => {
      const navEls = document.querySelectorAll(`[data-nav="${navLabel}"]`);
      for (const el of navEls) {
        const p = getPageNum(el);
        if (p >= startPage && p <= endPage) return p;
      }
      return startPage; // fallback
    };

    const p1Start = getPageById('print-p1');
    const p2Start = getPageById('print-p2');
    const p3Start = getPageById('print-p3');
    const endPage = getPageById('print-end');

    return {
      cover: { title: 'Cover', page: getPageById('print-cover') },
      case1: {
        title: 'Case 01 \u2014 Not a people problem',
        page: p1Start,
        children: [
          { title: 'Context', page: getNavPage('Context', p1Start, p2Start - 1) },
          { title: 'Diagnosis', page: getNavPage('Diagnosis', p1Start, p2Start - 1) },
          { title: 'Design', page: getNavPage('Design', p1Start, p2Start - 1) },
          { title: 'Turning point', page: getPageById('print-p1-turning') },
          { title: 'Looking back', page: getPageById('print-p1-lookback') },
        ],
      },
      case2: {
        title: 'Case 02 \u2014 The client said fix the UI',
        page: p2Start,
        children: [
          { title: 'Starting point', page: getNavPage('Starting Point', p2Start, p3Start - 1) },
          { title: 'Walkthrough', page: getNavPage('Walkthrough', p2Start, p3Start - 1) },
          { title: 'Validation', page: getNavPage('Validation', p2Start, p3Start - 1) },
          { title: 'Solution', page: getNavPage('Solution', p2Start, p3Start - 1) },
          { title: 'Looking back', page: getPageById('print-p2-lookback') },
        ],
      },
      case3: {
        title: 'Case 03 \u2014 The hardest part of AI',
        page: p3Start,
        children: [
          { title: 'Context', page: getNavPage('Context', p3Start, endPage - 1) },
          { title: 'Step 1: MVP', page: getNavPage('MVP', p3Start, endPage - 1) },
          { title: 'Step 2: API selection', page: getNavPage('API Selection', p3Start, endPage - 1) },
          { title: 'Step 3: Product upgrade', page: getNavPage('Product Upgrade', p3Start, endPage - 1) },
          { title: 'Step 4: Format breakthrough', page: getNavPage('Format Breakthrough', p3Start, endPage - 1) },
          { title: 'Step 5: Integration & launch', page: getNavPage('Integration & Launch', p3Start, endPage - 1) },
          { title: 'Troubleshooting', page: getNavPage('Troubleshooting', p3Start, endPage - 1) },
          { title: 'Results', page: getNavPage('Results', p3Start, endPage - 1) },
          { title: 'Looking back', page: getPageById('print-p3-lookback') },
        ],
      },
      closing: { title: 'Closing', page: endPage },
    };
  });

  // Log bookmark targets
  const logSection = (s) => {
    console.log(`  ${s.title} → p.${s.page}`);
    if (s.children) s.children.forEach(c => console.log(`    ${c.title} → p.${c.page}`));
  };
  console.log('Bookmark hierarchy:');
  logSection(bookmarkTree.cover);
  logSection(bookmarkTree.case1);
  logSection(bookmarkTree.case2);
  logSection(bookmarkTree.case3);
  logSection(bookmarkTree.closing);

  await browser.close();

  // Post-process: add PDF bookmarks/outline using pdf-lib
  const { PDFDocument, PDFName, PDFHexString, PDFNumber } = await import('pdf-lib');

  const pdfBytes = readFileSync(OUT_PATH);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const context = pdfDoc.context;
  const allPages = pdfDoc.getPages();

  // Helper: create an outline item dict (without Parent/Prev/Next/First/Last — those are set later)
  const makeItem = (title, pageNum) => {
    const pageIndex = Math.min(pageNum - 1, allPages.length - 1);
    const pageRef = allPages[pageIndex].ref;
    const dict = context.obj({
      Title: PDFHexString.fromText(title),
      Dest: context.obj([pageRef, PDFName.of('Fit')]),
    });
    return context.register(dict);
  };

  // Helper: link a flat array of sibling refs with Prev/Next, set Parent
  const linkSiblings = (refs, parentRef) => {
    for (let i = 0; i < refs.length; i++) {
      const dict = context.lookup(refs[i]);
      dict.set(PDFName.of('Parent'), parentRef);
      if (i > 0) dict.set(PDFName.of('Prev'), refs[i - 1]);
      if (i < refs.length - 1) dict.set(PDFName.of('Next'), refs[i + 1]);
    }
  };

  // Build top-level items
  const topSections = [bookmarkTree.cover, bookmarkTree.case1, bookmarkTree.case2, bookmarkTree.case3, bookmarkTree.closing];
  const topRefs = [];
  let totalCount = topSections.length;

  for (const section of topSections) {
    const ref = makeItem(section.title, section.page);
    if (section.children && section.children.length > 0) {
      const childRefs = section.children.map(c => makeItem(c.title, c.page));
      linkSiblings(childRefs, ref);
      const dict = context.lookup(ref);
      dict.set(PDFName.of('First'), childRefs[0]);
      dict.set(PDFName.of('Last'), childRefs[childRefs.length - 1]);
      // Positive Count = open by default, showing children
      dict.set(PDFName.of('Count'), PDFNumber.of(childRefs.length));
      totalCount += childRefs.length;
    }
    topRefs.push(ref);
  }

  // Create outline root
  const outlineDict = context.obj({
    Type: PDFName.of('Outlines'),
    First: topRefs[0],
    Last: topRefs[topRefs.length - 1],
    Count: PDFNumber.of(totalCount),
  });
  const outlineRef = context.register(outlineDict);

  // Link top-level siblings and set Parent to outline root
  linkSiblings(topRefs, outlineRef);

  // Attach outline to catalog
  pdfDoc.catalog.set(PDFName.of('Outlines'), outlineRef);

  const modifiedBytes = await pdfDoc.save();
  writeFileSync(OUT_PATH, modifiedBytes);
  console.log(`Added ${totalCount} bookmarks (${topRefs.length} top-level + children) to PDF.`);
  console.log(`Done! Saved to ${OUT_PATH}`);
})();
