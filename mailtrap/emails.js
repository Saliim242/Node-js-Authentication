import { mailtrapClient, sender } from "./mailtrap.confic.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./email.temple.js";

// Send Verify Email to the user
export const sendVerificationEmail = async (email, verificationToken) => {
  const recepient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recepient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email verification",
    });
    console.log(`Verificatiuon Email Sends Success ${response}`);
  } catch (error) {
    console.error(`Error sending verification email: ${error}`);
    throw new Error(`Error Sending verification Email ${error}`);
  }
};

// Send Welcome Email to the user When he/she verifies their email
export const sendWelcomeEmail = async (email, name) => {
  const recepient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recepient,
      template_uuid: "35ee3aea-5967-4d2d-81c8-b5a1916cf055",
      template_variables: {
        company_info_name: "Auth Campany",
        name: name,
      },
    });
    console.log(`Welcome Email Sends Success ${response}`);
  } catch (error) {
    console.error(`Error sending welcome email: ${error}`);
    throw new Error(`Error Sending welcome Email ${error}`);
  }
};

// Send Email to forget password
export const sendResetPasswordEmail = async (email, resetUrl) => {
  const recepient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recepient,
      subject: "Reset your password",

      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetUrl),
      category: "Password reset",
    });
    console.log(`Password Reset Email Sends Success ${response}`);
  } catch (e) {
    console.error(`Error sending password reset email: ${e}`);
    throw new Error(`Error Sending password reset Email ${e}`);
  }
};

// Send password reset email

export const sendPasswordResetSuccessEmail = async (email) => {
  const recepient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recepient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "password reset",
    });

    console.log("Password reset successful", response);
  } catch (error) {
    console.error(`Error sending password reset email: ${error}`);
    throw new Error(`Error Sending password reset Email ${error}`);
  }
};
