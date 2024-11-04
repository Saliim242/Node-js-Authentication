// import Nodemailer from "nodemailer";
import { MailtrapClient } from "mailtrap";
import dontenv from "dotenv";

dontenv.config();

// const TOKEN = process.env.MAIL_TRAP_TOKEN;
// https://mailtrap.io/sending/domains/8768d6c9-bd83-476d-b15a-4aebb50e6001?current_tab=smtp_settings&stream=transactional

// const transport = Nodemailer.createTransport(
//   MailtrapTransport({
//     token: TOKEN,
//   })
// );

// const sender = {
//   address: "hello@demomailtrap.com",
//   name: "Mailtrap Test",
// };
// const recipients = ["salim7442a@gmail.com"];

// transport
//   .sendMail({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAIL_TRAP_TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

//
