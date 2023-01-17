const fs = require("fs")
const path = require("path")
const puppeteer = require('puppeteer');

async function printPDF() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://www.jd.com', {waitUntil: 'networkidle0'});
    const pdf = await page.pdf({format: 'A4'});
    await browser.close();
    fs.writeFileSync(path.join(__dirname, '/test.pdf'), pdf);
}

printPDF().then();