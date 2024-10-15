import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetPasswordEmail = (email, token) => {
  const url = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  const mailOptions = {
    from: "Student Search <noreply@studentsearch.com>",
    to: email,
    subject: 'Reset Your Password - Student Search',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333; line-height: 1.6;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);">
          <h2 style="text-align: center; color: #FF5722; font-size: 24px; margin-bottom: 20px;">Reset Your Password</h2>
          <p style="font-size: 16px; margin: 10px 0;">Hi there,</p>
          <p style="font-size: 16px; margin: 10px 0;">We received a request to reset your password for your Student Search account.</p>
          <p style="font-size: 16px; margin: 10px 0;">Click the link below to reset your password:</p>
          <p style="text-align: center;">
            <a href="${url}" style="display: inline-block; background-color: #FF5722; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">Reset Password</a>
          </p>
          <p style="font-size: 16px; margin: 10px 0;">If you didn't request a password reset, please ignore this email.</p>
          <p style="font-size: 16px; margin: 20px 0;">Thanks,<br>Student Search Team</p>
        </div>
        <div style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">
          <p>Student Search, 123 Campus Ave, University City, 56789</p>
          <p>You are receiving this email because you requested a password reset.</p>
          <p>© 2024 Student Search, All rights reserved.</p>
        </div>
      </div>
    `,
    replyTo: "no-reply@studentsearch.com", 
  };
  
  // Send the email
  transporter.sendMail(mailOptions);
};

export default sendResetPasswordEmail;
