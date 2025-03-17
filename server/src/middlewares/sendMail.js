import nodemailer from 'nodemailer'
import ApiError from '../utils/ApiError.js';

const MailSender = async (email, subject, body) => {

  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
        pass: process.env.NODE_CODE_SENDING_PASSWORD,
      },
    });
    
    let info = await transporter.sendMail({
      from: '"SKY-STAY" <ayushsinghtemp@gmail.com>',
      to: email,
      subject: subject,
      html: body,
    });
    
    return info;
  } catch (error) {
    throw new ApiError("Couldn't send mail", error);
  }
}


export default MailSender;