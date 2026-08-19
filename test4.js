const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://127.0.0.1:3000', {waitUntil: 'networkidle0'}); 
    await page.type('#login-username', 'ADMIN');
    await page.type('#login-password', 'Admin123@');
    await page.evaluate(() => document.querySelector('#login-form button').click());
    
    await new Promise(r => setTimeout(r, 1000));
    
    await page.evaluate(() => {
        const tabs = document.querySelectorAll('.nav-item');
        tabs.forEach(t => {
            if (t.dataset.target === 'revenue') t.click();
        });
    });
    await new Promise(r => setTimeout(r, 2000));
    
    const tableHTML = await page.evaluate(() => {
        const tbody = document.querySelector('#revenuePlanTable tbody');
        return tbody ? tbody.innerHTML : 'No tbody found';
    });
    console.log('TABLE HTML:', tableHTML);

    await browser.close();
})();
