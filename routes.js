var express = require("express");
var conn = require("./dbserver.js");
var bodyparser = require("body-parser");
//const session = require("express-session");
var router = express.Router();
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({extended : true}));

router.get("/Signin", (req,res)=>{
   res.render("signin.ejs");
   
});

router.get("/Signup", (req,res)=>{
    res.render("signup.ejs");
});

router.post("/checkemail", (req,res)=>{
    var email = req.body.email;
    conn.query("SELECT * FROM user WHERE user_email = '"+email+"'",(perr,presult,pfield)=>{
        //console.log(presult[0].user_email)
        if(presult != ""){
            res.json({ emailerror : "Email already exist!" });
        }
    });
});

router.post("/checkmobile", (req,res)=>{
    var mobile = req.body.mobile;
    conn.query("SELECT * FROM user WHERE user_phone = '"+mobile+"'",(err,result,field)=>{
        if(result != ""){
            res.json({ mobileerror : "Mobile already exist!" });
        }
    });
});

router.post("/createAccount", (req,res)=>{
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var mobile = req.body.mobile;
    var email = req.body.email;
    var password = req.body.password;
    conn.query("SELECT * FROM user WHERE user_email = '"+email+"' OR user_phone = '"+mobile+"'",(perr,presult,pfield)=>{
        if(presult != ""){
            if(presult[0].user_email == email)
                res.json({ r : "Email already exist!" });
            else if(presult[0].user_phone == mobile)
                res.json({ r : "Mobile already exist!" });
            else
                res.json({ r : "Email and Mobile already exist!" });
        }
        else{
            conn.query("INSERT INTO user(user_firstname, user_lastname, user_phone, user_email, user_password) VALUES('"+firstname+"','"+lastname+"','"+mobile+"','"+email+"','"+password+"')",(err,result,field)=>{
                if(err) throw err;
                res.json({ r : "Account Created!" });
            });
        }
    });
});

router.post("/checklogin", (req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    conn.query("SELECT * FROM user WHERE user_email = '"+email+"' AND user_password = '"+password+"'",(err,result,field)=>{
        if(result == ""){
            res.json({ ret : "Invalid Email and Password!" });
        }else{
            req.session.mobile = result[0].user_phone;
            req.session.email = result[0].user_email;
            res.json({ ret : "ok" });
        }
    });
});

router.get("/", (req,res)=>{
    if(req.session.mobile){
        var mobile = req.session.mobile;
        //console.log(req.session.mobile);
        conn.query("SELECT * FROM user WHERE user_phone = '"+mobile+"'",(err,result,field)=>{
            res.render("chat-1",{ ownDetails : result });
        });
        
    }else{
        res.render("signin");
    }
});

router.post("/keyDown", (req,res)=>{
    var searchData = req.body.searchData;
    conn.query("SELECT * FROM user WHERE user_phone LIKE '"+searchData+"%'",(err,result,field)=>{
       res.json({ sendData : result, ownNumber : req.session.mobile });
    });
});

router.post("/nextInNewChat", (req,res)=>{
    var phone = req.body.phone;
    conn.query("SELECT * FROM user WHERE user_phone = '"+phone+"'",(err,result,field)=>{
        if(err) throw err;
        res.json({ retData : result });
    });
});

router.post("/sendRequest", (req,res)=>{
    var phone = req.body.phone;
    var rtime = req.body.rtime;
    conn.query("SELECT * FROM userrequest WHERE sender_phone = '"+phone+"' AND receiver_phone = '"+req.session.mobile+"'",(perr,presult,pfield)=>{
        if(presult == ""){
            conn.query("INSERT INTO userrequest(sender_phone, receiver_phone, rtime) VALUES('"+phone+"','"+req.session.mobile+"','"+rtime+"')",(err,result,field)=>{
                if(err) throw err;
                res.json({ reqres : "send request" });
            });
        }else{
                res.json({ reqres : "request has already sent" });
        }
    });
   
});

/*router.post("/showRequestList", (req,res)=>{
    conn.query("SELECT * FROM user",(perr,presult,pfield)=>{
        conn.query("SELECT * FROM userrequest WHERE sender_phone = '"+req.session.mobile+"'",(err,result,field)=>{
            if(result != ""){
                res.json({ userlist : presult, reqlist : result });
            }
        });
    });
});*/

router.post("/rejectRequest", (req,res)=>{
    var phone = req.body.phone;
    conn.query("DELETE FROM userrequest WHERE sender_phone = '"+req.session.mobile+"' AND receiver_phone = '"+phone+"'",(err,result,field)=>{
        if(err) throw err;
        res.json({ rejectMSG : "Data Deleted" });
    });
});

router.post("/acceptRequest", (req,res)=>{
    var phone = req.body.phone;
    conn.query("INSERT INTO accept_list (own_phone, others_phone) VALUES ('"+req.session.mobile+"', '"+phone+"')",(err,result,field)=>{
        res.json({ rdata : "Accepted" });
    });
});

router.post("/showAcceptedMembers", (req,res)=>{
    conn.query("SELECT * FROM accept_list WHERE own_phone = '"+req.session.mobile+"'", (err,result,field)=>{
        conn.query("SELECT * FROM user",(cerr,cresult,cfield)=>{
            res.json({ aldata : result, udata : cresult });
        });
    });
});

router.post("/showFriendsContent", (req,res)=>{
    conn.query("SELECT * FROM accept_list WHERE own_phone = '"+req.session.mobile+"'", (err,result,field)=>{
        conn.query("SELECT * FROM user",(cerr,cresult,cfield)=>{
            res.json({ aldata : result, udata : cresult });
        });
    });
});

router.post("/showFriendProfile", (req,res)=>{
    var phone = req.body.phone;
    conn.query("SELECT * FROM user WHERE user_phone = '"+phone+"'", (err,result,fields)=>{
        res.json({ pldata : result });
    });
});

module.exports = router;
//module.exports = window.smobile;
//module.exports = window.semail;