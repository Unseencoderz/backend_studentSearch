const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const sendVerificationEmail = (email, token) => {
  const url = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  

  const mailOptions = {
    from: "Student Search <noreply@studentsearch.com>",
    to: email,
    subject: 'Verify Your Email - Student Search',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333; line-height: 1.6;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);">
          <h2 style="text-align: center; color: #4CAF50; font-size: 24px; margin-bottom: 20px;">Welcome to Student Search!</h2>
          <p style="font-size: 16px; margin: 10px 0;">Hi there,</p>
          <p style="font-size: 16px; margin: 10px 0;">Thank you for signing up for Student Search. We're excited to have you on board!</p>
          <p style="font-size: 16px; margin: 10px 0;">Before we get started, we just need to confirm your email address.</p>
          <p style="text-align: center;">
            <a href="${url}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">Verify Email</a>
          </p>
          <p style="font-size: 16px; margin: 10px 0;">If the button doesn't work, please copy and paste the following link into your browser:</p>
          <p style="font-size: 16px; margin: 10px 0;"><a href="${url}" style="color: #4CAF50; text-decoration: underline;">${url}</a></p>
          <p style="font-size: 16px; margin: 10px 0;">If you didn't create an account using this email address, please ignore this message.</p>
          <p style="font-size: 16px; margin: 20px 0;">Thanks,<br>Student Search Team</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
          <p>Student Search, 123 Campus Ave, University City, 56789</p>
          <p>You are receiving this email because you signed up for Student Search.</p>
          <p>© 2024 Student Search, All rights reserved.</p>
        </div>
      </div>
    `,
    replyTo: "no-reply@studentsearch.com", 
  };
  
  transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;




