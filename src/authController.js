
let db = require("./db");

let argon2 = require("argon2");

let jwt = require ("jsonwebtoken");

let register = async function(req, res){

    let email= req.body.email;
    let password = req.body.password;
    let name = req.body.name;


    let hash = await argon2.hash(password);

    let customerid = req.body.customerid;
    let address = req.body.address;


    let sql = "INSERT INTO Customers(CustomerID, email, passwordHash, name, Address) VALUES (?, ?, ?, ?, ?)";



    let params = [customerid, email, hash, name, address];


    db.query(sql, params, function(error, results){
        if(error){
            console.error("Failed to create a user", error);
res.status(500).json({ error: "Failed to create a user" });
        } else {
            res.json({ message: "User registered successfully" });
        }
    });

    
}

let login = function(req, res){

    // get the email and password from the request body
    // if the password hash from the db for that email
    //chech that hash from the db against the password they sent
    // if they match up, then return token
    //if they do not match up, then return a status 404

    let email = req.body.email;
    let password = req.body.password;

    let sql = "SELECT PasswordHash, CustomerID FROM Customers WHERE email = ?";
    let params = [email];

    db.query(sql, params, async function(error, results){
        if(error){
            console.error("Failed to fetch hash from db ", error);
            res.sendStatus(500);
        } else if (results.length == 0){
            res.status(404).send("User not found");
        } else if (results.length > 1){
            console.error("Found more than 1 entry for email", email);
            res.status(500).send("Internal Server Error");
        } else {
            let hash = results[0].PasswordHash;
            let customerid = results[0].CustomerID;
            let password = req.body.password;


            if (!password) {   
                res.status(400).send("Password is missing");
                return; 
              }

            let goodPassword = await argon2.verify(hash, password);

            if(goodPassword){
                let token = {
                    "email": email,
                    "customerid": customerid 
                }

                let signedToken = jwt.sign(token, process.env.JWT_SECRET, {expiresIn: "24h"});

                res.json(signedToken)
            } else {
                res.sendStatus(404);
            }

        }

    });
}

module.exports = {
    login,
    register
}