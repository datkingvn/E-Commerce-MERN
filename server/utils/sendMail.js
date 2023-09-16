const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async ({ email, contentForgotPassword }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_ORIGINAL, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Shopping Support" <no-relply@dvfb.vn>', // sender address
        to: email, // list of receivers
        subject: "Forgot Password", // Subject line
        html: contentForgotPassword, // html body
    });

    return info;
});

module.exports = sendMail;