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

  await browser.close();
  console.log(`Done! Saved to ${OUT_PATH}`);
})();
