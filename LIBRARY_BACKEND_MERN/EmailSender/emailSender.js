

import nodemailer from "nodemailer";

 const sendEmail = async ({to, subject, text}) => {
    // console.log(to , subject , text);
    
  try {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure:false ,
        //   service: "gmail", 
        auth: {
            user: 'iva.dicki3@ethereal.email',
            pass: 'YaHuHhd4K6ZeUakeQV'
        }
    });

    const info = await transporter.sendMail({ from: "darien.dach71@ethereal.email",  to,  subject,  text });
    console.log("Email sent:", info.response);

  } catch (error) {
    console.log("Email error:", error);
    throw error;
  }
};


export default sendEmail