const { Router } = require("express");
const router = Router()
// const service = require("../services/auth-services")
const passport = require("passport")
const jwt = require("jsonwebtoken");
let dotenv = require('dotenv').config()
const {register,login} =require("../services/auth-services")

router.post("/register",register)

router.post("/login",login)

// const {isLoggedIn} = require("../middlewares/is_logged");
// router.get('/protected',isLoggedIn,(req,res)=>{
//      res.send("hello"+req.user.displayName)
// })

// Route for initiating Google login
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'consent', // Forces the consent screen every time
    accessType: 'offline', // Requests access to the user's offline data (refresh tokens)
    session: false, // No sessions, we're handling JWT instead
  })
);

// Google callback URL after authentication
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }), // Don't store in session, handle JWT directly
  (req, res) => {
    const user = req.user;

    // Sign the JWT after successful authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Send the token back in the response, and include user data
    res.json({
      success: true,
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  }
);
  router.get("/me",(req, res) => {
    const token = req.cookies.csrftoken;
    console.log(req.cookies);
    if (!token) return res.status(401).json({ authenticated: false });
  
    try {
      const decoded = jwt.verify(token,  process.env.JWT_SECRET);
      res.json({ authenticated: true, user: decoded });
    } catch (err) {
      res.status(401).json({ authenticated: false });
    }
  });
  
  // Logout Route
  router.get("/logout", (req, res) => {
    res.clearCookie("token");
    req.session.destroy(() => {
  });
    res.json({ message: "Logged out" });
  });
  

 

router.get('/failure',(req,res)=>{
     res.send('something went wrong');
});

module.exports = router;
