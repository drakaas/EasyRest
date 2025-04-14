const { Router } = require("express");
const router = Router()
// const service = require("../services/auth-services")
const passport = require("passport")
const jwt = require("jsonwebtoken");
let dotenv = require('dotenv').config()
const {register,login} =require("../services/auth-services")

router.post("/register",register)

router.post("/login",login)

const {isLoggedIn} = require("../middlewares/isLoggedIn");
router.get('/protected',isLoggedIn,(req,res)=>{
     res.send("hello"+req.user)
})

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
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // Create a userData object with all the fields you want to pass
    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };
    
    // Encode the user data as a URL-safe string
    const encodedUserData = encodeURIComponent(JSON.stringify(userData));
    
    // Redirect to your frontend with both token and user data
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}&userData=${encodedUserData}`);
  }
);
  router.get("/me",(req, res) => {
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
