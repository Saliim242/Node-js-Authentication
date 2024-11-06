import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { generateVerificationToken } from "../utils/generareVerificationToken.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendPasswordResetSuccessEmail,
} from "../mailtrap/emails.js";

// SignUp Funtion Process
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //check What the user pass is not empty
    if (!name || !email || !password) {
      throw new Error("All feilds are required");
    }
    // check this user is already exists or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use by another user");
    }

    // make the user password hashed for security purspose
    const hashPassword = await bcryptjs.hash(password, 10);
    const verificationToken = generateVerificationToken();

    const user = new User({
      name,
      email,
      password: hashPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24
    });

    await user.save();
    // lets genarate  Jwt for the use
    generateTokenAndSetCookie(res, user._id);

    // Send User verification Email
    await sendVerificationEmail(user.email, verificationToken);
    res.status(201).json({
      status: true,
      message: "User Created Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

// Verify Email Account
export const verifyEmail = async (req, res) => {
  // get The User Verification code first
  const { code } = req.body;

  try {
    // lets check if the user sends the verification code or not
    if (!code) {
      throw new Error("Verification code is required");
    }

    // lets find the user who sends the verification code
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    // lets check the user who sends the verification code is already in database or not
    if (!user) {
      throw new Error("Invalid or expired verification code");
    }

    // lets update the user verification status and verify the user
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({
      status: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// lets make user to login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // lets check what the user sends is valid or empty
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    // lets check the user who sends to login is verified or not
    const user = await User.findOne({ email });
    if (!user.isVerified) {
      throw new Error("User is not verified");
    }
    // lets check The user email and password are correct
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (user && isValidPassword) {
      // lets send the genration token to Cookies
      generateTokenAndSetCookie(res, user._id);
      // lets generate a token for the user
      // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      //   expiresIn: "7d",
      // });

      // lets Update the user last login time
      user.lastLogin = new Date();
      await user.save();

      res.status(200).json({
        status: true,
        message: "User Login Successfully",
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    } else {
      throw new Error("Invalid email or password");
    }

    // lets find the user who sends the login request
  } catch (error) {
    // console error accours for testing purpose
    console.error("User login Error accour ", error);

    res.status(500).json({ status: false, message: error.message });
  }
  // res.status(200).json({ status: true, message: "Login Successfulyy" });
};

// Check The User is Authenticated Or not Authenticated

export const checkAuth = async (req, res) => {
  // lets find the user who sends to check The Auth

  try {
    const user = await User.findById(req.userId).select("-password");
    console.log(req.userId);
    console.log(user);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User is not found" });
    }

    // lets give the user feedback
    res
      .status(200)
      .json({ status: true, message: "user is authorized", user: user });
  } catch (error) {
    // console error accours for testing purpose
    console.error("User check Auth Error accour ", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

// logout the user
export const logout = async (req, res) => {
  // lets clear all cokies we set the
  res.clearCookie("token");
  res.status(200).json({ status: true, message: "Logout Successfully" });
};

// lets make user forget password
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      // throw new Error("Email is required");
      return res
        .status(400)
        .json({ status: false, message: "User Email is required" });
    }
    // lets find the user who sends the forget password request
    const user = await User.findOne({ email });
    if (!user) {
      // throw new Error("User not found");
      return res.status(400).json({
        status: false,
        message: `User with this ${email} is not found`,
      });
    }
    // lets generate a token and expire toke time   send it to the user email
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpire = Date.now() + 1 * 60 * 1000; // Expires in one Hour

    // lets update the user with the new token and expire time
    user.resetPassowrdToken = resetPasswordToken;
    user.resetPassowrdExpiresAt = resetPasswordExpire;

    await user.save();

    // lets send the token to the user email
    await sendResetPasswordEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );
    // send feedback to the user
    res
      .status(200)
      .json({ status: true, message: "Reset Password Email Sent" });
  } catch (error) {
    // console error accours for testing purpose
    console.error("User forget password Error accour ", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

// lets make reset password
export const resetPassword = async (req, res) => {
  const { newPassword } = req.body;
  const { token } = req.params;
  console.log(newPassword);
  console.log(token);

  try {
    // lets check If the user is passes the new password or not
    if (!newPassword) {
      return res
        .status(400)
        .json({ status: false, message: "New password required" });
    }

    // lets find the user who wants to reset password
    const user = await User.findOne({
      resetPassowrdToken: token,
      resetPassowrdExpiresAt: { $gt: Date.now() },
    });

    console.log(user);

    // lets check if the user exists or not
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Invalid or expired verification code",
      });
    }

    // lets Update the user password with the new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPassowrdToken = undefined;
    user.resetPassowrdExpiresAt = undefined;

    await user.save();
    //lets Send the user Success EmAIL FOR CHANGE PASSWORD
    await sendPasswordResetSuccessEmail(user.email);
    // lets give the user feedback that the password is correct changed
    res
      .status(200)
      .json({ status: true, message: "Password changed successfully " });
  } catch (error) {
    // lets display the error message
    console.log("Error while updating password for user ", error);
    res.status(500).json({ status: false, message: error.message });
  }
};
