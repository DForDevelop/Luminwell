import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    //configuring nodemailer providing service provider and credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_SMTP_USER!,
        pass: process.env.GOOGLE_SMTP_PASSWORD!,
      },
    });

    //verify transporter
    await transporter.verify();
    //console.log("✅ SMTP Server is ready to take messages");

    //payload to send email
    const mailOptions = {
      from: `"Luminwell" <${process.env.GOOGLE_SMTP_USER!}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    //console.error("❌ Nodemailer error:", error);
    throw new Error("Failed to send email: " + error.message);
  }
}
