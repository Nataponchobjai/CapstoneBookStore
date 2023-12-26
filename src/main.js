let express = require("express");
require("dotenv").config();
 
let PORT = process.env.PORT || 9999;

let app = express();
app.use(express.json());

app.use(require("./authRoutes"));
app.use(require("./accountRoutes"));

app.listen(PORT, function(){
    console.log("Application started on port", PORT);
})