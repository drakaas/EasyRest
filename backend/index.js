const init =require("./src/server");
const dbConnection = require("./src/repository/db")

function main() {
    
     dbConnection()
     .then(() => {
         let app = init(5000,(port)=>{console.log("app listening on port "+port)});
     }
     
 
     )
     .catch((error) => {
     console.error("Error starting the app:", error);
     });
 }
 
 main();
 