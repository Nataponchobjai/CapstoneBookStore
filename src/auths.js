
let jsonwebtoken = require("jsonwebtoken");

let checkJWT = function(req, res, next){


    let headerValue = req.get("Authorization");
    let signedToken;
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRhaW5keUBnbWFpbC5jb20iLCJpYXQiOjE3MDI0MjQzOTcsImV4cCI6MTcwMjUxMDc5N30.d5gT2a2O44-QRs-KmHsLSi_95a3iCForH3M2_04uwH4
    if(headerValue){
        let parts = headerValue.split(" ")
        signedToken = parts[1];
    }

    try{
        let token = jsonwebtoken.verify(signedToken, process.env.JWT_SECRET);

        
        req.userid = token.userid;
        next();
    } catch(err){
        res.sendStatus(401);
    }
    
}

module.exports = {
    checkJWT
}