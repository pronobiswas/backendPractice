const nodemailer = require("nodemailer");
const { ApiError } = require("./apiError");
const { MakeTemplate } = require("../Helpers/makeTamplate");

const SentMail = async (FirstName, Email, OTP) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.HOST_MAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.HOST_MAIL, // sender address
      to: `${Email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Verifiy Massage", // plain text body
      html: MakeTemplate(FirstName,OTP), // html body
    });
    return info;
  } catch (error) {
    new ApiError(false, null, 400, `sent mail Controller Error:  ${error} !!`);
  }
};

module.exports = { SentMail };
