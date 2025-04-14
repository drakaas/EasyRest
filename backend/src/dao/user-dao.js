const  User = require( "../models/users");

const insertUser = async ({ email, password, name, isOAuth = false, oauthProvider = null, oauthId = null }) => {
  try {

    const user = new User({
      email,
      password,
      username: name,
      isOAuth,
      oauthProvider,
      oauthId,
    });
    console.log(user)
    const res = await user.save();
    return res;
  } catch (error) {
     console.log(error)
    return { message: "error " + error.message };
  }
};
const findByEmail= async(email)=>{
     try {
          const existingUser = await User.findOne({ email });
          if(!existingUser){
               return {message:"erreur user introuvable"}
          }
          return existingUser

          
     } catch (error) {
          return {message:"errour "+error.message}
     }

 
}
module.exports = { insertUser ,findByEmail};
