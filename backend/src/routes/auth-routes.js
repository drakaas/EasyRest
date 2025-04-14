const { Router } = require("express");
const router = Router()
// const service = require("../services/auth-services")
const passport = require("passport")
const jwt = require("jsonwebtoken");
import register from "../services/auth-services"


router.get("/register",register)



// const {isLoggedIn} = require("../middlewares/is_logged");
router.get('/protected',isLoggedIn,(req,res)=>{
     res.send("hello"+req.user.displayName)
})
router.get('/google',passport.authenticate("google",{scope:['email','profile']}))


router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }), 
    (req, res) => {
      const user = req.user;
      const token = jwt.sign({ id: user.id, name: user.displayName, email: user.emails[0].value }, "your_jwt_secret", {
        expiresIn: "1h",
      });
      console.log(token);
      res.cookie("token", token, { httpOnly: true, secure: false });
      res.redirect("http://localhost:5173/dashboard");
    }
  );

  router.get("/me",(req, res) => {
    const token = req.cookies.csrftoken;
    console.log(req.cookies);
    if (!token) return res.status(401).json({ authenticated: false });
  
    try {
      const decoded = jwt.verify(token, "your_jwt_secret");
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
