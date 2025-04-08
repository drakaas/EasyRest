const init =require("./src/server");


function main() {
    let app = init(5000,(port)=>{console.log("app listening on port "+port)});
 }
 
 main();
 