var mysql = require("mysql");
var conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "chatdata"
});
conn.connect(function(err){
    if(err) throw err;
    console.log("connected !");
});

module.exports = conn;