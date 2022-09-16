const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const BOT_EMAIL = "Leonid.Ivanov187@gmail.com";

const sendEmail = async (data) => {
    try {
        await sgMail.send({ ...data, from: BOT_EMAIL });
        console.log("email send!");
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body);
        }
    }
};

module.exports = sendEmail;
