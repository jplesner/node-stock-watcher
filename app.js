const puppeteer = require('puppeteer');
const chalk = require('chalk');
const $ = require('cheerio');
const mailer = require('./mailer');

const url = process.argv[2];
const elementSelector = process.argv[3];
const outOfStockValue = process.argv[4];

puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage()
    .then(function(page) {
      return page.goto(url)
        .then(function() {
        return page.content();
      });
    })
    .then(function(html) {
      const matchingElements = $(elementSelector, html);
      if (matchingElements.length == 1){
        const elementProperties = matchingElements[0].children;
        if (elementProperties.length) {
          return elementProperties[0].data;
        }
      }
      throw new Error('Unable to find content.');
    })
    .then(function(data) {
      if (data != outOfStockValue) {
        console.log('Item is in stock!');
        mailer.sendInStockAlert(url);
      } else {
        console.log('Item is out of stock.');
        mailer.sendOutOfStockAlert(url);
      }
    })
    .catch(function(err) {
      console.log(chalk.red(err));
      mailer.sendErrorEmail(url, err);
    })
    .finally(function(){
      browser.close();
    });
  });
