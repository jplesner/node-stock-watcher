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

const defaultMailOptions = { from: process.env['GMAIL_USER'], to: process.env['EMAIL_RECIPIENT'] };

function mailer() {
  function sendInStockAlert(url) {
    if (data.getData(lastEmailKey) == 'true') { return; } 

    var mailOptions = {
      ...defaultMailOptions,
      subject: 'Your Stuff Is In Stock!!',
      text: `Good news, get it quick : ${url}`
    };

    transporter.sendMail(mailOptions, send);
    data.setData(lastEmailKey, 'true');
  };

  function sendOutOfStockAlert(url) {
    if (data.getData(lastEmailKey) == 'false') { return; } 

    var mailOptions = {
      ...defaultMailOptions,
      subject: 'Stuff is Out Of Stock again...',
      text: `You missed out on : ${url}`
    };

    transporter.sendMail(mailOptions, send);
    data.setData(lastEmailKey, 'false');
  };

  function sendErrorEmail(url, message) {
    var mailOptions = {
      ...defaultMailOptions,
      subject: 'Error with stock checker',
      text: `Error encountered while checking stock for ${url} : ${message}`
    };

    transporter.sendMail(mailOptions, send);
  };

  return { sendInStockAlert, sendOutOfStockAlert, sendErrorEmail };
};

function send(error, info) {
  if (error) {
    console.log(chalk.redBright(error));
  } else {
    console.log(chalk.green('Email sent: ' + info.response));
  }
}

module.exports = mailer();