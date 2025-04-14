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
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account' // optional: forces account chooser
  })
);


// router.get('/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/login' }), 
//     (req, res) => {
//       const user = req.user;
//       const token = jwt.sign({ id: user.id, name: user.displayName, email: user.emails[0].value },  process.env.JWT_SECRET, {
//         expiresIn: "1h",
//       });
//       console.log(token);
//       res.cookie("token", token, { httpOnly: true, secure: false });
//       res.redirect("http://localhost:5173/dashboard");
//     }
//   );
  router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
      const user = req.user;
      const token = jwt.sign({ id: user.id, name: user.displayName, email: user.emails[0].value },  process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({
        success: true,
        message: "Login successful",
        token: token,
        user: {
          id: user.id,
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
