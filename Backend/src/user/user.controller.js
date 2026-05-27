import UserModel from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mail.js";
import { otpTemplate } from "../utils/otp.template.js";
import { generateOTP } from "../utils/generate.otp.js";
import { forgotPasswordTemplate } from "../utils/forgot.templete.js";

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const user = new UserModel(data);
    await user.save();
    res.json(user);
    console.log(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const OTP = generateOTP();
    const isEmail = await UserModel.findOne({ email });

    if (isEmail)
      return res
        .status(400)
        .json({ message: "This email is already registered ! " });

    await sendMail(email, "OTP for Signup", otpTemplate(OTP));

    res.json({
      message: "Email Sent Successfully ",
      otp: OTP,
      success: true,
    });

    console.log(email);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// generate token
const createToken = async (user) => {
  const payload = {
    id: user._id,
    fullname: "user.fullname",
    email: "user.email",
    role: user.role,
  };

  const token = await jwt.sign(payload, process.env.AUTH_SECRETE, {
    expiresIn: "1d",
  });

  return token;
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "user not found" });
    if (!user.status) return res.status(404).json({ message: "You are not active member" });

    const isLoged = await bcrypt.compare(password, user.password);

    if (!isLoged)
      return res.status(401).json({ message: "incorrect password" });

    const token = await createToken(user);

    res.cookie("authToken", token, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
      secure: process.env.ENVIRONMENT === "DEV" ? false : true,
      sameSite: process.env.ENVIRONMENT === "DEV" ? "lax" : "none",
      path: "/",
      domain: undefined, // dev
    });

    res.json({ message: "Login Success", role: user.role,});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("authToken", null, {
      httpOnly: true,
      secure: process.env.ENVIRONMENT !== "DEV",
      sameSite: process.env.ENVIRONMENT === "DEV" ? "lax" : "none",
      path: "/",
      domain: undefined,
      maxAge: 0,
    });
 res.status(200).json({ message: "Logout Success" });
  
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) return res.status(404).json({ message: "user not found " });

    const token = await jwt.sign(
      { id: user._id },
      process.env.FORGOT_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    const link = `${process.env.DOMAIN}/forgot-password?token=${token}`;

    const sent = await sendMail(
      email,
      "Password Reset Link ?",
      forgotPasswordTemplate(user.fullname, link),
    );

    if (!sent) {
      return res.status(424).json({ message: "Failed to send email " });
    }

    res.json({
      message: "Email sent successfully , Please check your email ",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const verifyToken = async (req, res) => {
  try {
    res.status(200).json({ message: "Verified successfully" });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
export const changePassword = async (req, res) => {
  try {
    const { password } = req.body;

    const encryptedPassword = await bcrypt.hash(password.toString(), 12);

    await UserModel.findByIdAndUpdate(req.user.id, {
      password: encryptedPassword,
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel
      .find()
      .sort({ createdAt: -1 });
res.json(users);

  } catch (error) {
    console.log("getAllUsers ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};
export const updateStatus = async (req, res) => {
  try {
       const {status} = req.body;
       const {id}=req.params;
const user =await UserModel.findByIdAndUpdate(id,{status},{new:true})
  if (!user) {
      return res.status(404).json({
        message: "User not found!",
     user
      });
    
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
