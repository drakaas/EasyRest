const { error } = require("console");
const {insertUser,findByEmail,findLocal} =require( "../dao/user-dao")
const jwt = require("jsonwebtoken")
let dotenv = require('dotenv').config()
const bcrypt = require('bcryptjs');
const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await findByEmail(email);
    if (!existingUser.message) {
      return res.status(409).json({ message: "Email already in use" });
    }


    // Create and save new user
    const user =await  insertUser({email,password,username:name})
    if(user.message!=null) return res.status(500).json({message:user.message});
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET , { expiresIn: '7d' });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.name
      }
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
const login =async(req,res)=>{


  
  try {
    const { email, password } = req.body;
    const user = await findLocal({email});
    if (user.message!=null) return res.status(401).json({ message: user.message });
    console.log(user)
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
    console.log(object)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user._id, email: user.email, username: user.username } });
  } catch (err) {
    console.log(error);
    res.status(500).json({ message: 'Server error '+err.message });
  }
};



module.exports= { register,login};
