require("dotenv").config();
const nodemailer = require('nodemailer');
const chalk = require('chalk');
const data = require('./data')

const lastEmailKey = 'lastEmailSentWasInStock';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env['GMAIL_USER'],
    pass: process.env['GMAIL_PASS']
  }
});

function mailer() {
  function sendInStockAlert(url) {
    if (data.getData(lastEmailKey) == 'true') { return; } 

    var mailOptions = {
      from: process.env['GMAIL_USER'],
      to: process.env['EMAIL_RECIPIENT'],
      subject: 'Your Stuff Is In Stock!!',
      text: `Good news, get it quick : ${url}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        data.setData(lastEmailKey, 'true');
      }
      send(error, info)
    });
  };

  function sendOutOfStockAlert(url) {
    if (data.getData(lastEmailKey) == 'false') { return; } 

    var mailOptions = {
      from: process.env['GMAIL_USER'],
      to: process.env['EMAIL_RECIPIENT'],
      subject: 'Stuff is Out Of Stock again...',
      text: `You missed out on : ${url}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        data.setData(lastEmailKey, 'false');
      }
      send(error, info)
    });
  };

  return { sendInStockAlert, sendOutOfStockAlert };
};

function send(error, info) {
  if (error) {
    console.log(chalk.redBright(error));
  } else {
    console.log(chalk.green('Email sent: ' + info.response));
  }
}

module.exports = mailer();