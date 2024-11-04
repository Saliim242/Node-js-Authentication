// import Nodemailer from "nodemailer";
import { MailtrapClient } from "mailtrap";
import dontenv from "dotenv";

dontenv.config();

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAIL_TRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
