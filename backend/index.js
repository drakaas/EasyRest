const init =require("./src/server");


function main() {
    let app = init(3000,(port)=>{console.log("app listening on port "+port)});
 }
 
 main();
 