import {insertUser,findByEmail} from "../services/user-services"


import User from "../models/users.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await findByEmail(email);
    if (!existingUser.message) {
      return res.status(409).json({ message: "Email already in use" });
    }


    // Create and save new user
    const user = insertUser({email,password,username:name})
    if(user.message) return res.status(500).json({message:user.message});
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export { register, findByEmail};
