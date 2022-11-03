const nodemailer = require('nodemailer');

const config = {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GOOGLE_MAIL, //구글 계정 메일
        pass: process.env.GOOGLE_PASSWORD,
    }
}

const send = async (data) => {
    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(data, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            return info.response;
        }
    });
}

const sendDemo = async (data) => {
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "61b751c4dc36f5",
          pass: "11f71833a99ef6"
        }
    });
      transport.sendMail(data, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            return info.response;
        }
    });
}

module.exports = {
    send,
    sendDemo
}