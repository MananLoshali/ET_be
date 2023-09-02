import { User } from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signInUser = async (req, res) => {
  const { email, password } = await req.body;
  try {
    const userExist = await User.findOne({ email: email }).select("+password");
    if (!userExist) {
      res.status(404).json({ success: false, message: "User Dosen't exist" });
      return;
    } else {
      const isMatch = await bcrypt.compare(password, userExist.password);

      if (!isMatch) {
        res.status(404).json({ success: false, message: "Invalid password" });
        return;
      } else {
        const jwtToken = jwt.sign({ _id: userExist._id }, process.env.JWT_SEC);
        res
          .status(201)
          .cookie("token", jwtToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
          })
          .json({
            success: true,
            message: `Login successfull. Welcome back ${userExist.username}`,
            user: userExist,
          });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};
