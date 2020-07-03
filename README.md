# Overview 
Get an email when Nintendo Switch is back in stock.

This is a rudimentary scraper for a single page, checking whether an element has the content "Out of stock" or not.

# Prerequisites
* Install node  
* Run npm install  
* Create a new app for your Gmail account and use those credentials in the .env file.  

# Usage
Run with: npm start

I have this running on a Raspberry Pi as a cron job. To get this to run on a Pi, you will likely need to add the following options to the puppeteer launch call:

```javascript
.launch({
  defaultViewport: {height: 1080, width: 1920}, 
  headless: false, 
  args: ['--display=:1', '--no-sandbox', '--disable-extensions'], 
  executablePath: '/usr/bin/chromium-browser'
})
```
