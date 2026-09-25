const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();

  try {
    console.log('Navigating to site...');
    await page.goto('https://dogeminerpro.com/', { waitUntil: 'networkidle2' });

    // Login Form Fill
    await page.waitForSelector('input[type="email"]', { timeout: 15000 });
    await page.type('input[type="email"]', process.env.MY_EMAIL);
    await page.type('input[type="password"]', process.env.MY_PASSWORD);

    // Click Login
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log('Login successful!');

    // Click Withdraw
    await page.waitForSelector('button.Withdraw', { timeout: 15000 });
    await page.click('button.Withdraw');
    console.log('Withdraw requested successfully!');

  } catch (error) {
    console.error('Execution error:', error.message);
  } finally {
    await browser.close();
  }
})();
