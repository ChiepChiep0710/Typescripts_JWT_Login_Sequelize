import nodemailer from 'nodemailer';
const emailConfig = {
  host: process.env.EMAIL_SMTP_HOST,
  port: process.env.EMAIL_SMTP_PORT,
  secure: process.env.EMAIL_SMTP_SECURE,
  user: process.env.EMAIL_SMTP_USER,
  password: process.env.EMAIL_SMTP_PASS,
};
const sendMail = async (payload: {
  email: string;
  subject: string;
  text?: string;
  html?: string;
}): Promise<Error | unknown> => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password,
      },
    } as unknown);
    const { email, subject, text, html } = payload;
    const message = {
      from: emailConfig.user,
      to: email,
      subject,
      text,
      html,
    };
    const result = await transporter.sendMail(message);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export default sendMail;
