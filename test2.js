const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://127.0.0.1:3000', {waitUntil: 'networkidle0'}); 
    await page.evaluate(() => {
        // Find hr tab and click it
        const tabs = document.querySelectorAll('.nav-item');
        tabs.forEach(t => {
            if (t.dataset.target === 'hr') t.click();
        });
    });
    await new Promise(r => setTimeout(r, 2000));
    await browser.close();
})();
