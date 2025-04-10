const express = require("express");
const ProductRouter = require("./routes/product-routes")
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const express = require("express");
const AuthRouter = require("./routes/auth-router")


require('./routes/auth');


// require('./routes/auth');

function init(port, callback) {
    const app = express();
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true           
    }));
    app.use(express.json());
    app.use(cookieParser());


    app.use(
        session({
          secret: "cats",
          resave: false,
          saveUninitialized: true,
        })
      );
           app.use(express.static('public'));
     app.use(passport.initialize())
     app.use(passport.session());

     app.use(express.json());
     app.use('/product',ProductRouter)



     // app.get('/',(req,res)=>{
     //      res.send('<a href="/auth/google/">Authenticate with Google</a>')
     // })

     app.use('/auth',AuthRouter);



     // app.use('/chatbot', ChatbotRouter);




    app.listen(port, callback(port));


    return app;
}
module.exports = init;
