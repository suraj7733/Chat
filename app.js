//var http = require("http");
var express = require("express");
var app = express();
var socket = require("socket.io");
var WebSocketServer = require("ws");
var conn = require("./dbserver.js");
const port = process.env.PORT || 3000;
var server = app.listen(port, ()=>console.log("Server starting on port no. 3000"));
//var routes = require("./routes.js");
var session = require("express-session");
var validator = require("email-validator");
//const { request } = require("express");
var bodyparser = require("body-parser");
app.use(bodyparser.json({limit : '10mb', extended : true}));
app.use(bodyparser.urlencoded({limit : '10mb' , extended : true}));
app.set("view engine","ejs");
app.use(express.static("dist"));
app.use(session({
    secret : "XpAtwRvKf9qkpG0uWPkZ",
    resave : false,
    saveUninitialized : true
}));


var moment = require("moment");
//const Connection = require("mysql/lib/Connection");
//const { json } = require("body-parser");
//const Session = require("express-session/session/session");
//const { JSON } = require("mysql/lib/protocol/constants/types");
//app.get("/Signin", routes);
app.get("/Signin", (req,res)=>{
    res.render("signin.ejs");
 });
 
//app.get("/Signup", routes);
app.get("/Signup", (req,res)=>{
    res.render("signup.ejs");
});

//app.post("/checkemail", routes);
app.post("/checkemail", (req,res)=>{
    var email = req.body.email;
    if(validator.validate(email)==false){
        res.json({ r : "not" });
    }else{
            conn.query("SELECT * FROM user WHERE user_email = '"+email+"'",(perr,presult,pfield)=>{
                //console.log(presult[0].user_email)
                if(presult != ""){
                    res.json({ r : "Email already exist!" });
                }
            });
    }      
});

//app.post("/createAccount", routes);
app.post("/checkmobile", (req,res)=>{
    var mobile = req.body.mobile;
    conn.query("SELECT * FROM user WHERE user_phone = '"+mobile+"'",(err,result,field)=>{
        if(result != ""){
            res.json({ mobileerror : "Mobile already exist!" });
        }
    });
});

//app.post("/checkmobile", routes);
app.post("/createAccount", (req,res)=>{
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var mobile = req.body.mobile;
    var email = req.body.email;
    var password = req.body.password;
    conn.query("SELECT * FROM user WHERE user_email = '"+email+"' OR user_phone = '"+mobile+"'",(perr,presult,pfield)=>{
        if(presult != ""){
            if(presult[0].user_email == email && presult[0].user_phone == mobile)
                res.json({ r : "Email and Mobile already exist!" });
            else if(presult[0].user_phone == mobile){
                console.log(email);
                res.json({ r : "Mobile already exist!" });
            }
            else
                res.json({ r : "Email already exist!" });
        }
        else{
            conn.query("INSERT INTO user(user_firstname, user_lastname, user_phone, user_email, user_password) VALUES('"+firstname+"','"+lastname+"','"+mobile+"','"+email+"','"+password+"')",(err,result,field)=>{
                if(err) throw err;
                res.json({ r : "Account Created!" });
            });
        }
    });
});

//app.post("/checklogin", routes);

//app.get("/", routes);

//app.post("/keyDown", routes);
//app.post("/nextInNewChat", routes);

//send request
//app.post("/sendRequest", routes);

//show request notification
//app.post("/showRequestList", routes);

//Reject request
//app.post("/rejectRequest", routes);

//Accept Request
//app.post("/acceptRequest", routes);

// Show Accepted members
//app.post("/showAcceptedMembers", routes);

// show friends content
//app.post("/showFriendsContent", routes);

// show friends Profile
//app.post("/showFriendProfile", routes);

//var members = {};
var smobile = "";
app.post("/checklogin", (req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    console.log("hello");
    conn.query("SELECT * FROM user WHERE user_email = '"+email+"' AND user_password = '"+password+"'",(err,result,field)=>{
        if(result == ""){
            res.json({ ret : "Invalid Email and Password!" });
        }else{
            smobile = result[0].user_phone;
            req.session.mobile = result[0].user_phone;
            req.session.email = result[0].user_email;
            res.json({ ret : "ok", mobile : smobile });
        }
    });
});
app.get("/", (req,res)=>{
    if(req.session.mobile){
        var mobile = req.session.mobile;
        //console.log(req.session.mobile);
        conn.query("SELECT * FROM user WHERE user_phone = '"+mobile+"'",(err,result,field)=>{
            if(smobile){
                res.render("chat-1",{ ownDetails : result, uphone : req.session.mobile});
            }else{
                smobile = req.session.mobile;
                res.render("chat-1",{ ownDetails : result, uphone : req.session.mobile });
            }
            
            
        });
        
    }else{
        smobile = "";
        res.render("signin");
    }
});

app.post("/keyDown", (req,res)=>{
    var searchData = req.body.searchData;
    //alert("hello");
    conn.query("SELECT * FROM user WHERE user_phone LIKE '"+searchData+"%'",(err,result,field)=>{
       res.json({ sendData : result, ownNumber : req.session.mobile });
    });
});

app.post("/nextInNewChat", (req,res)=>{
    var phone = req.body.phone;
    conn.query("SELECT * FROM user WHERE user_phone = '"+phone+"'",(err,result,field)=>{
        if(err) throw err;
        res.json({ retData : result });
    });
});

app.post("/sendRequest", (req,res)=>{
    var phone = req.body.phone;
    var rtime = req.body.rtime;
    conn.query("SELECT * FROM accept_list WHERE own_phone = '"+req.session.mobile+"' AND others_phone = '"+phone+"'", (sperr,spresult,spfield)=>{
        conn.query("SELECT * FROM accept_list WHERE own_phone = '"+phone+"' AND others_phone = '"+req.session.mobile+"'", (cerr,cresult,cfield)=>{
        if(spresult != ""){
            res.json({ reqres : "It is already your member" });
        }
        else if(cresult != ""){
            res.json({ reqres : "It is already your member" });
        }else{
            conn.query("SELECT * FROM userrequest WHERE sender_phone = '"+phone+"' AND receiver_phone = '"+req.session.mobile+"'",(perr,presult,pfield)=>{
                conn.query("SELECT * FROM userrequest WHERE sender_phone = '"+req.session.mobile+"' AND receiver_phone = '"+phone+"'",(pcerr,pcresult,pcfield)=>{
                if(presult == "" && pcresult == ""){
                    conn.query("INSERT INTO userrequest(sender_phone, receiver_phone, rtime) VALUES('"+phone+"','"+req.session.mobile+"','"+rtime+"')",(err,result,field)=>{
                        if(err) throw err;
                        res.json({ reqres : "send request" });
                    });
                }else if(pcresult != ""){
                        res.json({ reqres : "request has come already in your notifications list" });
                }else{
                        res.json({ reqres : "request has already sent" });
                }
            });
            });
        }
    });
    });
});
/// work flow function

app.post("/showRequestList", (req,res)=>{
    var phone = req.body.phone;
    conn.query("SELECT * FROM user",(perr,presult,pfield)=>{
        conn.query("SELECT * FROM userrequest WHERE sender_phone = '"+phone+"'",(err,result,field)=>{
            if(result != ""){
               res.json({ reqlist : result, userlist : presult });
            }
        });
    });
});

app.post("/rejectRequest", (req,res)=>{
    var phone = req.body.phone;
    conn.query("DELETE FROM userrequest WHERE sender_phone = '"+req.session.mobile+"' AND receiver_phone = '"+phone+"'",(err,result,field)=>{
        if(err) throw err;
        res.json({ rejectMSG : "Data Deleted" });
    });
});

app.post("/acceptRequest", (req,res)=>{
    var phone = req.body.phone;
    conn.query("INSERT INTO accept_list (own_phone, others_phone) VALUES ('"+req.session.mobile+"', '"+phone+"')",(err,result,field)=>{
        conn.query("INSERT INTO accept_list (own_phone, others_phone) VALUES ('"+phone+"', '"+req.session.mobile+"')",(err,result,field)=>{ 
        res.json({ rdata : "Accepted" });
        });
    });
});

app.post("/showAcceptedMembers", (req,res)=>{
    conn.query("SELECT * FROM accept_list WHERE own_phone = '"+req.session.mobile+"'", (err,result,field)=>{
        conn.query("SELECT * FROM user",(cerr,cresult,cfield)=>{
            res.json({ aldata : result, udata : cresult, myPhone : req.session.mobile });
        });
    });
});

app.post("/showFriendsContent", (req,res)=>{
    conn.query("SELECT * FROM accept_list WHERE own_phone = '"+req.session.mobile+"'", (err,result,field)=>{
        conn.query("SELECT * FROM user",(cerr,cresult,cfield)=>{
            res.json({ aldata : result, udata : cresult });
        });
    });
});

app.post("/showFriendProfile", (req,res)=>{
    var phone = req.body.phone;
    conn.query("SELECT * FROM user WHERE user_phone = '"+phone+"'", (err,result,fields)=>{
        res.json({ pldata : result });
    });
});

// show chat header details...........
app.post("/chatHeader", (req,res)=>{
    var phone = req.body.phone;
    conn.query("SELECT * FROM user WHERE user_phone = '"+phone+"'", (err, result, field)=>{
        res.json({ chatHeader : result });
    });
});
// show messages
app.post("/showFullMessage", (req,res)=>{
    var phone = req.body.phone;
    conn.query("SELECT * FROM chat_list", (err, result, field)=>{
        //conn.query("SELECT * FROM chat_list WHERE own_phone = '"+phone+"' AND others_phone = '"+req.session.mobile+"'",(cerr, cresult, cfield)=>{
            res.json({ resData : result, myPhone : req.session.mobile});
        //});
    });
});

//Clear notificaions
app.post("/clearNotifications", (req,res)=>{
    var phone = req.body.phone;
    conn.query("DELETE FROM userrequest WHERE sender_phone = '"+phone+"'", (err,result,field)=>{
        res.json({ r : "ok" });
    });
});

// Image Upload
app.post("/uploadImage",(req,res)=>{
    var img = req.body.image;
    conn.query("UPDATE user SET user_photo = '"+img+"' WHERE user_phone = '"+req.session.mobile+"'", (err,result,field)=>{
        res.json({ rdata : "image upload" });
    });
});

// Get all details
app.post("/getAllDetails", (req,res)=>{
    var phone = req.body.phone;
    console.log(phone);
    conn.query("SELECT * FROM user WHERE user_phone = '"+phone+"'", (err,result,field)=>{
        res.json({ r : result });
    });
});

app.post("/updateUserDetails", (req,res)=>{
    var phone = req.body.phone;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;
    conn.query("UPDATE user SET user_firstname = '"+firstname+"' , user_lastname = '"+lastname+"' , user_email = '"+email+"' , user_password = '"+password+"' WHERE user_phone = '"+phone+"'", (err,result,field)=>{
        res.json({ resp : "ok" });
    });
});

//unload


var io = socket(server);
var userMobiles = {};
//let broadcaster;
io.on("connection", function(socket){
    //if(smobile != ""){
        //socket.userMobile = smobile;
        //userMobiles[smobile] = socket.id;
        //console.log(userMobiles[smobile]);
    //}
    //console.log(smobile);
    // Add phone From C#
    socket.on("AddPhoneC#", function(data){
        var datas =JSON.parse(data) ;
        if(datas.phone == null){
            io.to(userMobiles[smobile]).emit("AddMobileOnclientSide", { phone : smobile });
        }else{
            console.log("Not Null");
        }
        userMobiles[datas.phone] = socket.id;
    });
    socket.on("showRequest", function(data){
       //console.log(smobile);
       // app.get("/", (req,res)=>{
        var datas = data;
            conn.query("SELECT * FROM user",(perr,presult,pfield)=>{
                conn.query("SELECT * FROM userrequest WHERE sender_phone = '"+datas.phone+"'",(err,result,field)=>{
                    
                    //if(result != ""){
                        //console.log("hello");
                        io.to(userMobiles[datas.phone]).emit("showRequest", { userlist : presult, reqlist : result });
                        //io.sockets.emit("showRequest", { userlist : presult, reqlist : result });
                    //}
                });
            });
       // });
    });

    // Get messages
    socket.on("MessageHere", function(data){
            //console.log(data.message+ "" + data.phone);
  var dt = new Date();
  var h = dt.getHours();
  var m = dt.getMinutes();
  var s = dt.getSeconds();
  var d = dt.getDate();
  var mo = dt.getMonth();
  var y = dt.getFullYear();
  var a = "AM";
  var month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sept";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  var cmo = month[mo];
  if(h>12){
    h = h - 12;
    a = "PM";
  }if(h<=9){
    h = "0"+h;
  }if(m<=9){
    m = "0"+m;
  }if(d<=9){
    d = "0"+d;
  }
  var rtime = d +"/"+ cmo +"/"+ y +"  "+ h +":"+ m +":"+s+" "+ a;
            //var dates = moment(dt);
            var datas =JSON.parse(data);
            //console.log(datas.phone);
            //console.log(dates.startOf('hour').fromNow());
            conn.query("INSERT INTO chat_list(own_phone, others_phone, message, date) VALUES('"+datas.myphone+"', '"+datas.phone+"', '"+datas.message+"', '"+rtime+"')", (err, result, field)=>{
                var sendata = {message : datas.message, name : datas.uname, photo : datas.photo, date : rtime};
                io.to(userMobiles[datas.phone]).emit("MessageThere", sendata);
            });
    });

    // show accepted member in other browser
    socket.on("showMemberOnOtherBrowser", function(data){
        var datas =JSON.parse(data);
        conn.query("SELECT * FROM accept_list WHERE others_phone = '"+datas.myphone+"'", (err,result,field)=>{
            conn.query("SELECT * FROM user",(cerr,cresult,cfield)=>{
                console.log("OK");
                io.to(userMobiles[data.otherphone]).emit("showMemberOnOtherBrowserFS", { aldata : result, udata : cresult });
            });
        });
    })

    socket.on("disconnect", function(){     
        while(true){
            if(userMobiles[smobile] == socket.id){
                //console.log(socket.id);
                delete userMobiles[smobile];
                break;
            }
        }
        
    });

    //Video call Codding
    /*
    socket.on("broadcaster", () => {
        broadcaster = socket.id;
        console.log("BraodCaster recive");
        socket.broadcast.emit("broadcaster");
      });
      socket.on("watcher", () => {
        console.log("watcher recive");
        socket.to(broadcaster).emit("watcher", socket.id);
      });
      socket.on("offer", (id, message) => {
        console.log("offer recive");
        socket.to(id).emit("offer", socket.id, message);
      });
      socket.on("answer", (id, message) => {
        console.log("Answer recive");
        socket.to(id).emit("answer", socket.id, message);
      });
      socket.on("candidate", (id, message) => {
        console.log("candidate recive");
        socket.to(id).emit("candidate", socket.id, message);
      });
      socket.on("disconnect", () => {
        socket.to(broadcaster).emit("disconnectPeer", socket.id);
      });*/
});

//WebSocket Coding
    