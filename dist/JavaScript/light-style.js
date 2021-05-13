$(document).ready(function(){
    $("#merror").hide();
    $("#perror").hide();
    $("#eerror").hide();
  $("#mobile").blur(function(){
      if(($("#mobile").val().length > 10 || $("#mobile").val().length < 10) && $("#mobile").val().length > 0){
          $("#merror").show();
          document.getElementById("merror").innerHTML = "Please enter valid Mobile Number";
      }else{
        var mobile = $("#mobile").val();
        $.ajax({
          url : "/checkmobile",
          data : {
            mobile : mobile
          },
          type : "POST",
          success : function(data){
            if(data.mobileerror == "Mobile already exist!"){
            document.getElementById("merror").innerHTML = "Mobile already exist!";
            $("#merror").show();
            }else{
            $("#merror").hide();
            document.getElementById("merror").innerHTML = "";
            }
          }
        });
      }
  });
  $("#mobile").click(function(){
    $("#merror").hide();
    document.getElementById("merror").innerHTML = "";
  });
  $("#password").blur(function(){
      if($("#password").val().length < 8)
      {
        if($("#password").val() == "")
        {
          $("#perror").hide();
          document.getElementById("perror").innerHTML = "";
        }
        else
        {
        $("#perror").show();
        document.getElementById("perror").innerHTML = "Please enter at least 8 digit password";
        }
      } 
  });

  $("#password").click(function(){
    $("#perror").hide();
    document.getElementById("perror").innerHTML = "";
  });

  $("#email").click(function(){
    $("#eerror").hide();
    document.getElementById("eerror").innerHTML = "";
  });

  $("#email").blur(function(){
    var email = $("#email").val();
    if(email.length == 0){
      $("#eerror").hide();
      document.getElementById("eerror").innerHTML = "";
    }else{
      $.ajax({
        url : "/checkemail",
        data : {
          email : email
        },
        type : "POST",
        success : function(data){
          if(data.r == "Email already exist!"){
          $("#eerror").show();
          document.getElementById("eerror").innerHTML = data.r;
          }else if(data.r == "not"){
            $("#eerror").show();
            document.getElementById("eerror").innerHTML = "Email is not valid";
          }else{
            $("#eerror").hide();
            document.getElementById("eerror").innerHTML = "";
          }
        }
      });
    }
    
  });

  $("#submit").click(function(){
    
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    var mobile = $("#mobile").val();
    var email = $("#email").val();
    var password = $("#password").val();
    if(firstname == "" || lastname == "" || mobile == "" || email == "" || password == ""){
      alert("Please Fill all the Blocks!");
    }else if(password.length < 8){
      document.getElementById("perror").innerHTML = "Please enter 8";
    }else{
    $.ajax({
      url : "/createAccount",
      data : {
        firstname : firstname,
        lastname : lastname,
        mobile : mobile,
        email : email,
        password : password
      },
      type : "POST",
      success : function(data){
        if(data.r == "Mobile already exist!"){
          document.getElementById("merror").innerHTML = data.r;
          $("#merror").show();
        }else if(data.r == "Email already exist!"){
          document.getElementById("eerror").innerHTML = data.r;
          $("#eerror").show();
        }else if(data.r == "Email and Mobile already exist!"){
          alert(data.r);
        }else if(data.r == "Account Created!"){
          alert(data.r);
          window.location.href = "/Signin";
        }
      }
    });
    }
  });

  // for Chat-1 page
 
// writeMessage
// sendMessage
});
/*
function showonlymobile(){
  $.ajax({
    url : "/forGetMobileuserrequset",
    data : {},
    type : "POST",
    success : function(data){
      $("#ShowRequestNotification").empty();
    data.reqlist.forEach(relement => {
      data.userlist.forEach(uelement => {
        if(relement.sender_phone == uelement.user_phone){
          $("#ShowRequestNotification").append('<li  class="list-group-item">'+
          '<div class="media">'+
              '<div class="btn btn-primary btn-icon rounded-circle text-light mr-2">'+
                  '<!-- Default :: Inline SVG -->'+
                  '<svg class="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">'+
                      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>'+
                  '</svg>'+
                      
                  '<!-- Alternate :: External File link -->'+
                  '<!-- <img class="injectable hw-24" src="./../assets/media/heroicons/outline/user-add.svg" alt=""> -->'+
              '</div>'+
  
              '<div class="media-body">'+
                  '<h6><a href="#">'+uelement.user_firstname.toUpperCase()+" "+uelement.user_lastname.toUpperCase()+'</a> send you a friend request</h6>'+
  
                  '<p class="text-muted mb-0">'+relement.rtime+'</p>'+
              '</div>'+
          '</div>'+
          '<div class="d-flex justify-content-center mt-2">'+
              '<button type="button" onclick="reject('+uelement.user_phone+')" class="btn btn-outline-danger mx-1">Reject</button>'+
              '<button type="button" onclick="accept('+uelement.user_phone+')" class="btn btn-primary mx-1">Accept</button>'+
          '</div>'+
  
      '</li>');
        }
      });
    });
    },
    error : function(x,y,z){
      console.log("error find");
    }
  });
}
*/

// show request
/*
function setSocket(){
   socket = io.connect("http://localhost:3000");
}
function showRequestlist(){
  //alert(smobile);
  //var socket = io.connect("http://localhost:3000");
  socket.emit('showRequest');
  socket.on('showRequest', function(data){
    //alert(data.reqlist[0].receiver_phone);
    $("#ShowRequestNotification").empty();
    data.reqlist.forEach(relement => {
      data.userlist.forEach(uelement => {
        if(relement.sender_phone == uelement.user_phone){
          $("#ShowRequestNotification").append('<li  class="list-group-item">'+
          '<div class="media">'+
              '<div class="btn btn-primary btn-icon rounded-circle text-light mr-2">'+
                  '<!-- Default :: Inline SVG -->'+
                  '<svg class="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">'+
                      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>'+
                  '</svg>'+
                      
                  '<!-- Alternate :: External File link -->'+
                  '<!-- <img class="injectable hw-24" src="./../assets/media/heroicons/outline/user-add.svg" alt=""> -->'+
              '</div>'+
  
              '<div class="media-body">'+
                  '<h6><a href="#">'+uelement.user_firstname.toUpperCase()+" "+uelement.user_lastname.toUpperCase()+'</a> send you a friend request</h6>'+
  
                  '<p class="text-muted mb-0">'+relement.rtime+'</p>'+
              '</div>'+
          '</div>'+
          '<div class="d-flex justify-content-center mt-2">'+
              '<button type="button" onclick="reject('+uelement.user_phone+')" class="btn btn-outline-danger mx-1">Reject</button>'+
              '<button type="button" onclick="accept('+uelement.user_phone+')" class="btn btn-primary mx-1">Accept</button>'+
          '</div>'+
  
      '</li>');
        }
      });
    });
  });  
}*/

// Reject Request


  // For Sign in Page...................................
function signin(){
    email = $("#lemail").val();
    var password = $("#lpassword").val();
    //alert(email);
    if(email == "" || password == ""){
      alert("Please fill all the blocks!");
    }else{
      $.ajax({
        url : "/checklogin",
        type : "POST",
        data : {
          email : email,
          password : password
        },
        success : function(data){
          if(data.ret == "Invalid Email and Password!"){
            alert("Sorry, Email and Password Invalid!");
          }else if(data.ret == "ok"){
            //if(typeof(Storage) != "undefined"){
              //sessionStorage.setItem("phone", data.mobile);
            //}
            //window.smobile = data.smobile;
            //setMobileIntoSocket(data.mobile);
            window.location.href = "/";
            //sessionStorage.setItem("socket", io.connect("http://localhost:3000"));
          }
        }
      });
    }
  }