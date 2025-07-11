const express = require("express");
const ProductRouter = require("./routes/product-routes")
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const AuthRouter = require("./routes/auth-routes")
const CartRouter = require("./routes/cart-routes")

const path = require('path');

require('./routes/auth');


// require('./routes/auth');

function init(port, callback) {
    const app = express();
    const corsOptions = {
      origin: ['http://127.0.0.1:3000', 'http://localhost:5173'],  // Allow both origins
      credentials: true,  // Allow credentials (cookies, authorization headers)
    };
    
    // Apply CORS middleware with the specified options
    app.use("/images", express.static(path.join(__dirname, "../public/images")));
        console.log(path.join(__dirname, "public/images"))
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(cookieParser());


    app.use(
        session({
          secret: "cats",
          resave: false,
          saveUninitialized: true,
        })
      );
      


     app.use(passport.initialize())
     app.use(passport.session());

     app.use(express.json());
     app.use('/product',ProductRouter)
     app.use('/cart', CartRouter)



     // app.get('/',(req,res)=>{
     //      res.send('<a href="/auth/google/">Authenticate with Google</a>')
     // })

     app.use('/auth',AuthRouter);



     // app.use('/chatbot', ChatbotRouter);




    app.listen(port, callback(port));


    return app;
}
module.exports = init;
