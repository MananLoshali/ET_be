import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUpUser = async (req, res) => {
  const { username, email, password } = await req.body;
  console.log(username, email, password);
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(404).json({ success: false, message: "User already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    const savedUser = await newUser.save();

    const jwtToken = jwt.sign({ _id: savedUser._id }, process.env.JWT_SEC);

    res
      .status(201)
      .cookie("token", jwtToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .json({
        success: true,
        message: "user created successfully",
        user: savedUser,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
