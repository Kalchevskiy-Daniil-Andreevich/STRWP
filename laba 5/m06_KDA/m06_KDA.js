const nodemailer = require('nodemailer');

function send(email, password, message) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: email,
            pass: password
        }
    });

    const mailOptions = {
        from: email,
        to: email,
        subject: 'Тестовое письмо с помощью Nodemailer',
        html: `<p>${message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email отправлен: ' + info.response);
        }
    });
}

module.exports = send;