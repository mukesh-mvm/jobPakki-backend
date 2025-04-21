import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import  sendVerificationEmail from "../utils/sendEmail.js";



// @desc   Register a new user
// @route  POST /api/auth/register
// @access Public
export const registerUser = async (req, res) => {
  const { name, email, phone, password, dateOfBirth, specialization } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      name,
      email,
      phone,
      password,
      dateOfBirth,
      specialization,
      verificationToken,
    });

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: "User registered. Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc   Login user via email or phone
// @route  POST /api/auth/login
// @access Public
export const loginUser = async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or phone

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(res, user._id);
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          specialization: user.specialization,
        },
        token: token,
      });
    } else {
      res.status(401).json({ message: "Invalid email/phone or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc   Logout user
// @route  POST /api/auth/logout
// @access Private
export const logoutUser = (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
};



export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllUser = async(req,res)=>{
   try {
       const users = await User.find({});
       if(!users){
        return res.status(400).json({message:"Users not found"})
       }

       res.status(200).json({
        message:"Users find successfully",
        users:users
       })

   } catch (error) {
    res.status(500).json({ message: "Server Error", error });
   }
}
