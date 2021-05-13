var mysql = require("mysql");
var conn = mysql.createConnection({
    host : "sql11.freemysqlhosting.net",
    user : "sql11412237",
    password : "2Vtfr8glRr",
    database : "sql11412237"
});
conn.connect(function(err){
    if(err) throw err;
    console.log("connected !");
});

module.exports = conn;