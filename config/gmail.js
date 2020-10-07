const nodemailer = require('nodemailer');
const email="berrytern@gmail.com"
const gmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    }
  });
const randomCode=({email,code,socketid})=>{
    gmailOptions = {
        from: process.env.EMAIL,
        to: `${email}`,
        subject: 'Authentication',
        html: `<html><body>Account validation<br/>Was you? <a href="https://easyfire-forceroute.herokuapp.com/verify?code=${code}&email=${email}&id=${socketid}">yes</a>
                </body></body></html>`
    };
    send(gmailOptions);
}
const send=(json)=>gmail.sendMail(json, function(error, info){
if (error) {
    console.log(error);
} else {
    console.log('Email sent: ' + info.response);
}
});

const activate =(email,code)=>{
  location.href
}
module.exports = {randomCode}