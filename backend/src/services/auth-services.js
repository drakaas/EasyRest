const {insertUser,findByEmail} =require( "../dao/user-dao")

const register = async (req, res) => {
  try {
     console.log(req.body)
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await findByEmail(email);
    if (!existingUser.message) {
      return res.status(409).json({ message: "Email already in use" });
    }


    // Create and save new user
    const user = insertUser({email,password,username:name})
    if(user.message) return res.status(500).json({message:user.message});
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports= { register};
