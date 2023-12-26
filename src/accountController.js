
let db = require("./db")
let hello = function(req,res){

    let userid = req.userid;

    let sql = 'select name from users where id = ? ';
    let params = [userid];

    db.query(sql, params, function(error, results){
        if(error){
            console.error("Fao;ed to fetch name", error);
            res.sendStatus(500);
        } else if(results.length == 0){
            res.sendStatus(500);
        } else {
            res.json("hello "+ results[0].name);
        }
    })
    
    
}

module.exports = {
    hello
}