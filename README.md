# Overview 
Get an email when an item you want is back in stock.

This is a rudimentary scraper for a single page, checking whether the supplied element has the supplied content (e.g. "Out of stock") or not and sending an email each time that value has changed since the last check.

# Prerequisites
* Install node  
* Run npm install  
* Create a new app for your Gmail account and use those credentials in the .env file.  

# Usage
Run with: 
```
$ node app.js <url> <elementSelector> <noStockValue>
```

For example, to check whether the switch SNES controller stock has been updated:
```
$ node app.js "https://store.nintendo.ca/super-nintendo-entertainment-system-controller.html" ".product-info-stock-sku > .stock > span" "Out of stock"
```

This works because the span element contains the value "Out of stock" when there is no stock.


I have this running on a Raspberry Pi as a cron job. To get this to run on a Pi, you will likely need to add the following options to the puppeteer launch call:

```javascript
.launch({ executablePath: 'chromium-browser' })
```

If that doesn't work, make sure you have chromium installed or install it with
```
$ sudo apt-get install chromium-browser --yes
```

