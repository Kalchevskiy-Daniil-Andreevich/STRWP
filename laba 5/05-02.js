const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sendmail', (req, res) => {
    const { senderEmail, recipientEmail, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: 'kalchevskiy.danya@mail.ru',
            pass: '710gfWBNgsReesxBQKT4'
        }
    });

    const mailOptions = {
        from: 'kalchevskiy.danya@mail.ru',
        to: recipientEmail,
        subject: 'Тестовое письмо с помощью Nodemailer',
        html: `<p>${message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Ошибка при отправке письма');
        } else {
            console.log('Email отправлен: ' + info.response);
            res.send('Письмо успешно отправлено');
        }
    });
});

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});