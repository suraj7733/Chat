//const { NULL } = require("mysql/lib/protocol/constants/types");
sessionStorage.clear();
var userPhone = $("title").html();
sessionStorage.setItem("phone", userPhone);

$(document).ready(function () {
    showMembers();
    friendsContent();
    $("#chatFooter").hide();
    $("#clearNotifications").click(function (e) { 
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/clearNotifications",
            data: {
                phone : sessionStorage.getItem("phone")
            },
            success: function (response) {
                if(response.r = "ok"){
                    //alert("ok");
                    
                }
            }
        });
    });
});

//Show Accepted Members
//chatContactTab


function showMembers() {
    $.ajax({
        url: "/showAcceptedMembers",
        type: "POST",
        data: {

        },
        success: function (data) {
            setMobileIntoSocket(data.myPhone);
            $("#chatContactTab").empty();
            var i = 0;
            data.aldata.forEach(element => {
                data.udata.forEach(uelement => {
                    if (element.others_phone == uelement.user_phone) {
                        if (i == 0) {
                            i = i + 1;
                            if (uelement.user_photo == null) {
                                var name = uelement.user_firstname + " " + uelement.user_lastname;
                                var shortname = showMembersPhotoName(name);
                                $("#chatContactTab").append('<li onclick="chatHeader(' + uelement.user_phone + ')" class="contacts-item friends active">' +
                                    '<a class="contacts-link" href="#chatsShow">' +
                                    '<div class="avatar">' +
                                    '<span>' + shortname + '</span>' +
                                    '</div>' +
                                    '<div class="contacts-content">' +
                                    '<div class="contacts-info">' +
                                    '<h6 class="chat-name">' + uelement.user_firstname + '' + " " + '' + uelement.user_lastname + '</h6>' +
                                    '<div class="chat-time"></div>' +
                                    '</div>' +
                                    '<div class="contacts-texts">' +
                                    '<p class="text-truncate"></p>' +
                                    '<div class="badge badge-rounded badge-primary ml-1"></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</a>' +
                                    '</li>');
                            } else {
                                $("#chatContactTab").append('<li onclick="chatHeader(' + uelement.user_phone + ')" class="contacts-item friends active">' +
                                    '<a class="contacts-link" href="#chatsShow">' +
                                    '<div class="avatar">' +
                                    '<img src="' + uelement.user_photo + '" alt="">' +
                                    '</div>' +
                                    '<div class="contacts-content">' +
                                    '<div class="contacts-info">' +
                                    '<h6 class="chat-name text-truncate">' + uelement.user_firstname + '' + " " + '' + uelement.user_lastname + '</h6>' +
                                    '<div class="chat-time"></div>' +
                                    '</div>' +
                                    '<div class="contacts-texts">' +
                                    '<p class="text-truncate"></p>' +
                                    '</div>' +
                                    '</div>' +
                                    '</a>' +
                                    '</li>');
                            }
                        }
                        else {
                            if (uelement.user_photo == null) {
                                var name = uelement.user_firstname + " " + uelement.user_lastname;
                                var shortname = showMembersPhotoName(name);
                                $("#chatContactTab").append('<li onclick="chatHeader(' + uelement.user_phone + ')" class="contacts-item friends unread">' +
                                    '<a class="contacts-link" href="#chatsShow">' +
                                    '<div class="avatar">' +
                                    '<span>' + shortname + '</span>' +
                                    '</div>' +
                                    '<div class="contacts-content">' +
                                    '<div class="contacts-info">' +
                                    '<h6 class="chat-name">' + uelement.user_firstname + '' + " " + '' + uelement.user_lastname + '</h6>' +
                                    '<div class="chat-time"></div>' +
                                    '</div>' +
                                    '<div class="contacts-texts">' +
                                    '<p class="text-truncate"></p>' +
                                    '<div class="badge badge-rounded badge-primary ml-1"></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</a>' +
                                    '</li>');
                            } else {
                                $("#chatContactTab").append('<li onclick="chatHeader(' + uelement.user_phone + ')" class="contacts-item friends unread">' +
                                    '<a class="contacts-link" href="#chatsShow">' +
                                    '<div class="avatar">' +
                                    '<img src="' + uelement.user_photo + '" alt="">' +
                                    '</div>' +
                                    '<div class="contacts-content">' +
                                    '<div class="contacts-info">' +
                                    '<h6 class="chat-name">' + uelement.user_firstname + '' + " " + '' + uelement.user_lastname + '</h6>' +
                                    '<div class="chat-time"></div>' +
                                    '</div>' +
                                    '<div class="contacts-texts">' +
                                    '<p class="text-truncate"></p>' +
                                    '<div class="badge badge-rounded badge-primary ml-1"></div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</a>' +
                                    '</li>');
                            }
                        }
                    }
                });
            });
        },
        error: function (x, y, z) {
            console.log("there is an error!");
        }
    });
}
// Request List
function showRequestAjexlist(){
    $.ajax({
      url : "/showRequestList",
      data : {
          phone : sessionStorage.getItem("phone")
      },
      type : "POST",
      success : function(data){
        $("#ShowRequestNotification").empty();
        data.reqlist.forEach(relement => {
          data.userlist.forEach(uelement => {
            if(relement.receiver_phone == uelement.user_phone){
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
      }
    });
  }
// Taking for light-style.js
var interval = setInterval(function(){
    var dt = new Date();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    var a = "AM";
    if(h>12){
      h = h - 12;
      a = "PM";
    }if(m<=9){
      m = "0"+m;
    }if(s<=9){
      s = "0"+s;
    }
    document.getElementById("localtime").innerHTML = h+":"+m+":"+s+" "+a;
   }, 100);
  
   // search new chat
   
    $("#searchNewChat").keyup(function(){
      var searchData = $("#searchNewChat").val();
      $.ajax({
        url : "/keyDown",
        type : "POST",
        data : {
          searchData : searchData
        },
        success : function(data){
          $("#appendnewchat").empty();
          if($("#searchNewChat").val() == ""){
            $("#appendnewchat").empty();
          }else{
          data.sendData.forEach(element => {
            if(element.user_phone != data.ownNumber){
          $("#appendnewchat").append('<li class="list-group-item" onclick="showNewPeople('+element.user_phone+')" role="button" data-toggle="modal" data-dismiss="modal" data-target="#nextInNewChat">'+
          '<div class="media">'+
              '<div class="avatar avatar-online mr-2">'+
                  '<img src="'+element.user_photo+'" alt="">'+
              '</div>'+
  
              '<div class="media-body">'+
                  '<h6 class="text-truncate">'+
                      '<a href="#" class="text-reset">'+element.user_firstname+''+" "+''+element.user_lastname+'</a>'+
                  '</h6>'+
  
                  '<p class="text-muted mb-0">'+element.user_phone+'</p>'+
              '</div>'+
          '</div>'+
      '</li>');
            }else{
              $("#appendnewchat").append('<li class="list-group-item">'+
              '<div class="media">'+
                  '<div class="avatar avatar-online mr-2">'+
                      '<img src="'+element.user_photo+'" alt="">'+
                  '</div>'+
      
                  '<div class="media-body">'+
                      '<h6 class="text-truncate">'+
                          '<a href="#" class="text-reset">You</a>'+
                      '</h6>'+
      
                      '<p class="text-muted mb-0"><b>'+element.user_phone+'</b></p>'+
                  '</div>'+
              '</div>'+
          '</li>');
            }
        });
      }
        }
      });
    });
  
    // Show Request.....................
  showRequestAjexlist();
  $("#todayMessage").hide();

  function showNewPeople(phone){
    window.rphone = phone;
    //
    //alert("hello");
    $.ajax({
      url : "/nextInNewChat",
      type : "POST",
      data : {
        phone : phone
      },
      success : function(data){
        $("#nextInNewChatPhoto").attr("src", data.retData[0].user_photo);
        document.getElementById("nextInNewChatPhone").innerHTML = phone;
        document.getElementById("nextInNewChatName").innerHTML = data.retData[0].user_firstname +" "+ data.retData[0].user_lastname;
      },
      error : function(x,z,y){
        console.log("error");
      }
    });
  }
  // Works on Send Request button
  
  $("#sendRequest").click(function(){
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
    var rtime = d +"-"+ cmo +"-"+ y +"  "+ h +":"+ m +"  "+ a;
      $.ajax({
        url : "/sendRequest",
        type : "POST",
        data : {
          phone : window.rphone,
          rtime : rtime
        },
        success : function(data){
          if(data.reqres == "send request"){
            alert("request sent");
            showRequestlist(window.rphone);
          }else if(data.reqres == "request has already sent"){
            alert(data.reqres);
          }else if(data.reqres == "It is already your member"){
            alert(data.reqres);
          }else if(data.reqres == "request has come already in your notifications list"){
            alert(data.reqres);
          }
        },
        error : function(x,z,c){
          console.log("error");
        }
      });
  });
  function reject(phone){
    //alert("helolo");
    $.ajax({
      url : "/rejectRequest",
      type : "POST",
      data : {
        phone : phone
      },
      success : function(data){
        if(data.rejectMSG == "Data Deleted"){
          $("#ShowRequestNotification").empty();
           showRequestlist();
          //$("#ShowRequestNotification").show();
        }
      },
      error : function(x,y,z){
        console.log("error Finding");
      }
  
    });
  }
  
  
  //Accept Request
  
  function accept(phone){
    $.ajax({
      url : "/acceptRequest",
      type : "POST",
      data : {
        phone : phone
      },
      success : function(data){
        if(data.rdata == "Accepted"){
          reject(phone);
          showFSMembers(phone);
          showMembers();
          friendsContent();
        }
      },
      error : function(x,y,z){
        console.log("there is a error");
      }
    });
  
  }
  
  $("#backbtn").click(function(){
    function myFunction(x){
      if(x.matches){
          $(".main-layout .main").removeAttr("style");
          //$(".main-layout .main.main-visible").css("transform","translateX(100%)");
      }else{
          $(".main-layout .main .main-visible").css("visibility","hidden")
      }
  }
  var x = window.matchMedia("(max-width: 1199.98px)");
  myFunction(x);
  })
    
// Show Friends Content

function friendsContent() {
    $.ajax({
        url: "/showFriendsContent",
        type: "POST",
        data: {

        },
        success: function (data) {
            $("#friendsTab").empty();
            data.aldata.forEach(element => {
                data.udata.forEach(uelement => {
                    if (element.others_phone == uelement.user_phone) {
                        if (uelement.user_photo == null) {
                            var name = uelement.user_firstname + " " + uelement.user_lastname;
                            var shortname = showMembersPhotoName(name);
                            $("#friendsTab").append('<li onclick="friendsProfile(' + uelement.user_phone + ')" class="contacts-item active">' +
                                '<a class="contacts-link" href="#friendsProfile">' +
                                '<div class="avatar bg-info text-light">' +
                                '<span>' + shortname + '</span>' +
                                '</div>' +
                                '<div class="contacts-content">' +
                                '<div class="contacts-info">' +
                                '<h6 class="chat-name text-truncate">' + uelement.user_firstname + '' + " " + '' + uelement.user_lastname + '</h6>' +
                                '</div>' +
                                '<div class="contacts-texts">' +
                                '<!-- Default :: Inline SVG -->' +
                                '<svg class="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">' +
                                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>' +
                                '</svg>' +

                                '<!-- Alternate :: External File link -->' +
                                '<!-- <img class="injectable hw-16 text-muted mr-1" src="./../assets/media/heroicons/solid/phone.svg" alt=""> -->' +
                                '<p class="text-muted mb-0">' + uelement.user_phone + '</p>' +
                                '</div>' +
                                '</div>' +
                                '</a>' +
                                '</li>');
                        } else {
                            $("#friendsTab").append('<li onclick="friendsProfile(' + uelement.user_phone + ')" class="contacts-item active">' +
                                '<a class="contacts-link" href="#friendsProfile">' +
                                '<div class="avatar">' +
                                '<img src="' + uelement.user_photo + '" alt="">' +
                                '</div>' +
                                '<div class="contacts-content">' +
                                '<div class="contacts-info">' +
                                '<h6 class="chat-name text-truncate">' + uelement.user_firstname + '' + " " + '' + uelement.user_lastname + '</h6>' +
                                '</div>' +
                                '<div class="contacts-texts">' +
                                '<!-- Default :: Inline SVG -->' +
                                '<svg class="hw-16 text-muted mr-1" viewBox="0 0 20 20" fill="currentColor">' +
                                '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>' +
                                '</svg>' +

                                '<!-- Alternate :: External File link -->' +
                                '<!-- <img class="injectable hw-16 text-muted mr-1" src="./../assets/media/heroicons/solid/phone.svg" alt=""> -->' +
                                '<p class="text-muted mb-0">' + uelement.user_phone + '</p>' +
                                '</div>' +
                                '</div>' +
                                '</a>' +
                                '</li>');
                        }
                    }
                });
            });
        },
        error: function (x, y, z) {
            console.log("there is an error!");
        }
    });
}

function friendsProfile(phone) {
    $.ajax({
        url: "/showFriendProfile",
        type: "POST",
        data: {
            phone: phone
        },
        success: function (data) {
            $("#friendsProfile").empty();
            //visibility: visible;
            function myFunction(x) {
                if (x.matches) {
                    $(".main-layout .main").css("visibility", "visible");
                    $(".main-layout .main").css("transform", "translateX(0)");
                }
            }
            var x = window.matchMedia("(max-width: 1199.98px)");
            myFunction(x);
            data.pldata.forEach(element => {
                if (element.user_photo == null) {
                    var name = element.user_firstname + " " + element.user_lastname;
                    var shortname = showMembersPhotoName(name);
                    $("#friendsProfile").append('<div class="container-xl">' +
                        '<div class="row">' +
                        '<div class="col">' +
                        '<div class="card card-body card-bg-1 mb-3">' +
                        '<div class="d-flex flex-column align-items-center">' +
                        '<div class="avatar avatar-lg mb-3 bg-info text-light">' +
                        '<span>' + shortname + '</span>' +
                        '</div>' +

                        '<div class="d-flex flex-column align-items-center">' +
                        '<h5 class="mb-1">' + element.user_firstname + '' + " " + '' + element.user_lastname + '</h5>' +
                        '<!-- <p class="text-white rounded px-2 bg-primary">' + element.user_phone + '</p> -->' +
                        '</div>' +
                        '</div>' +

                        '<div class="chat-closer d-xl-none">' +
                        '<!-- Chat Back Button (Visible only in Small Devices) -->' +
                        '<button onclick="myfunction()" class="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button" data-close="">' +
                        '<svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>' +
                        '</svg>' +

                        '<!-- <img class="injectable hw-20" src="./../assets/media/heroicons/outline/arrow-left.svg" alt=""> -->' +
                        '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +

                        '<div class="row friends-info">' +
                        '<div class="col">' +
                        '<div class="card">' +
                        '<ul class="list-group list-group-flush">' +
                        '<li class="list-group-item">' +
                        '<div class="media align-items-center">' +
                        '<div class="media-body">' +
                        '<p class="small text-muted mb-0">Phone</p>' +
                        '<p class="mb-0">' + element.user_phone + '</p>' +
                        '</div>' +
                        '<svg class="text-muted hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>' +
                        '</svg>' +
                        '<!-- <img class="injectable text-muted hw-20" src="./../assets/media/heroicons/outline/phone.svg" alt=""> -->' +
                        '</div>' +
                        '</li>' +
                        '<li class="list-group-item">' +
                        '<div class="media align-items-center">' +
                        '<div class="media-body">' +
                        '<p class="small text-muted mb-0">Email</p>' +
                        '<p class="mb-0">' + element.user_email + '</p>' +
                        '</div>' +
                        '<svg class="text-muted hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>' +
                        '</svg>' +
                        '<!-- <img class="injectable text-muted hw-20" src="./../assets/media/heroicons/outline/mail.svg" alt=""> -->' +
                        '</div>' +
                        '</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +

                        '</div>');
                } else {
                    $("#friendsProfile").append('<div class="container-xl">' +
                        '<div class="row">' +
                        '<div class="col">' +
                        '<div class="card card-body card-bg-1 mb-3">' +
                        '<div class="d-flex flex-column align-items-center">' +
                        '<div class="avatar avatar-lg mb-3">' +
                        '<img class="avatar-img" src="' + element.user_photo + '" alt="">' +
                        '</div>' +

                        '<div class="d-flex flex-column align-items-center">' +
                        '<h5 class="mb-1">' + element.user_firstname + '' + " " + '' + element.user_lastname + '</h5>' +
                        '<!-- <p class="text-white rounded px-2 bg-primary">' + element.user_phone + '</p> -->' +
                        '</div>' +
                        '</div>' +

                        '<div class="chat-closer d-xl-none">' +
                        '<!-- Chat Back Button (Visible only in Small Devices) -->' +
                        '<button onclick="myfunction()" class="btn btn-secondary btn-icon btn-minimal btn-sm text-muted" type="button" data-close="">' +
                        '<svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>' +
                        '</svg>' +

                        '<!-- <img class="injectable hw-20" src="./../assets/media/heroicons/outline/arrow-left.svg" alt=""> -->' +
                        '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +

                        '<div class="row friends-info">' +
                        '<div class="col">' +
                        '<div class="card">' +
                        '<ul class="list-group list-group-flush">' +
                        '<li class="list-group-item">' +
                        '<div class="media align-items-center">' +
                        '<div class="media-body">' +
                        '<p class="small text-muted mb-0">Phone</p>' +
                        '<p class="mb-0">' + element.user_phone + '</p>' +
                        '</div>' +
                        '<svg class="text-muted hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>' +
                        '</svg>' +
                        '<!-- <img class="injectable text-muted hw-20" src="./../assets/media/heroicons/outline/phone.svg" alt=""> -->' +
                        '</div>' +
                        '</li>' +
                        '<li class="list-group-item">' +
                        '<div class="media align-items-center">' +
                        '<div class="media-body">' +
                        '<p class="small text-muted mb-0">Email</p>' +
                        '<p class="mb-0">' + element.user_email + '</p>' +
                        '</div>' +
                        '<svg class="text-muted hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>' +
                        '</svg>' +
                        '<!-- <img class="injectable text-muted hw-20" src="./../assets/media/heroicons/outline/mail.svg" alt=""> -->' +
                        '</div>' +
                        '</li>' +
                        '</ul>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +

                        '</div>');
                }

            });
        },
        error: function (x, y, z) {
            console.log("there is an error");
        }
    });
}


// main Chatting contents

function chatHeader(phone) {
    // Chat Header
    $("#chatFooter").show();
    $.ajax({
        url: "/chatHeader",
        type: "POST",
        data: {
            phone: phone
        },
        success: function (data) {
            $("#chatProfile").empty();
            clickOnMembers(data);
            //visibility: visible;
            //alert("hello");
            var x = "";
            function myFunction(x) {
                if (x.matches) {
                    //chats-tab-open
                    $(".main-layout .main").css("visibility", "visible");
                    $(".main-layout .main").css("transform", "translateX(0)");
                    //transform: translateX(0);
                }
            }
            x = window.matchMedia("(max-width: 1199.98px)");
            myFunction(x);
            data.chatHeader.forEach(element => {
                if (element.user_photo == null) {
                    var name = element.user_firstname + " " + element.user_lastname;
                    var shortname = showMembersPhotoName(name);
                    $("#chatProfile").append(`<button onclick = "homeBack()" id="backbtn" class="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none"
                    type="button">
                    <!-- Default :: Inline SVG -->
                    <svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>

                    <!-- Alternate :: External File link -->
                    <!-- <img class="injectable hw-20" src="./../assets/media/heroicons/outline/arrow-left.svg" alt=""> -->
                </button>
                <div class="media chat-name align-items-center text-truncate">
                <div class="avatar d-none d-sm-inline-block mr-3 bg-info text-light">
                <span>${shortname}</span>
                </div>
                <div class="media-body align-self-center ">
                <h6 class="text-truncate mb-0">${element.user_firstname.toUpperCase() + " " + element.user_lastname.toUpperCase()}</h6>
                <small id="showactivity" class="text-muted"></small>
                </div>
                </div>`);
                } else {
                    $("#chatProfile").append(`<button id="backbtn" onclick = "homeBack()" class="btn btn-secondary btn-icon btn-minimal btn-sm text-muted d-xl-none"
                    type="button" data-dismiss="modal">
                    <!-- Default :: Inline SVG -->
                    <svg class="hw-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>

                    <!-- Alternate :: External File link -->
                    <!-- <img class="injectable hw-20" src="./../assets/media/heroicons/outline/arrow-left.svg" alt=""> -->
                </button>

                <!-- Chat participant's Name -->
                <div class="media chat-name align-items-center text-truncate">
                    <div class="avatar d-none d-sm-inline-block mr-3">
                        <img src=${element.user_photo} alt="">
                    </div>

                    <div class="media-body align-self-center ">
                        <h6 class="text-truncate mb-0">${element.user_firstname.toUpperCase() + " " + element.user_lastname.toUpperCase()}</h6>
                        <small class="text-muted"></small>
                    </div>
                </div>`);
                }

            })

        }
    });
}
function homeBack(){
    window.location.href = "/";
}

function myfunction() {
    function myfFunction(x) {
        if (x.matches) {
            $(".main-layout .main").removeAttr("style");
            //$(".main-layout .main.main-visible").css("transform","translateX(100%)");
        }
    }
    var x = window.matchMedia("(max-width: 1199.98px)");
    myfFunction(x);
}

// Photo Name
const showMembersPhotoName = (name) => {
    return name.match(/(?<=(\s|^))[a-z]/gi)
        .join('')
        .toUpperCase();
};

$("#settingClose").click(function (e) { 
    e.preventDefault();
    $("#profileSetting").modal('hide');
});

function getAllDetails(){
    $.ajax({
        type: "POST",
        url: "/getAllDetails",
        data: {
            phone : sessionStorage.getItem("phone")
        },
        success: function (response) {
            //alert("hello");
            document.getElementsByName("largefirstname")[0].value = response.r[0].user_firstname;
            document.getElementsByName("largelastname")[0].value = response.r[0].user_lastname;
            document.getElementsByName("largephone")[0].value = response.r[0].user_phone;
            document.getElementsByName("largeemail")[0].value = response.r[0].user_email;
            document.getElementsByName("largecpassword")[0].value = response.r[0].user_password;
            document.getElementsByName("largenpassword")[0].value = response.r[0].user_password;
            document.getElementsByName("largerpassword")[0].value = response.r[0].user_password;
        }
    });
}
function getDetails(){
    $.ajax({
        type: "POST",
        url: "/getAllDetails",
        data: {
            phone : sessionStorage.getItem("phone")
        },
        success: function (response) {
            //alert("hello");
            document.getElementsByName("smallfirstname")[0].value = response.r[0].user_firstname;
            document.getElementsByName("smalllastname")[0].value = response.r[0].user_lastname;
            document.getElementsByName("smallphone")[0].value = response.r[0].user_phone;
            document.getElementsByName("smallemail")[0].value = response.r[0].user_email;
        }
    });
}
function largeUpdateDetails(){
    if($("#lfirstName").val() == "" || $("#llastName").val() == "" || $("#Lemail").val() == "" || $("#lcpassword").val() == "" || $("#lnpassword").val() == "" || $("#lrpassword").val() == ""){
        alert("Fill all the Blanks");
    }else if($("#lrpassword").val() == "" != $("#lnpassword").val() == ""){
        alert("Password is not matching");
    }else{
        $.ajax({
            type : "POST",
            url : "/getAllDetails",
            data : {
                phone : sessionStorage.getItem("phone")            
            },
            success : function(data){
                if($("#lcpassword").val() != data.r[0].user_password){
                    alert("Password is not currect");
                }else if($("#Lemail").val() == data.r[0].user_email){
                    alert("Email already Exist..");
                }else{
                    $.ajax({
                        type : "POST",
                        url : "/updateUserDetails",
                        data : {
                            phone : sessionStorage.getItem("phone"),
                            firstname : $("#lfirstName").val(),
                            lastname : $("#llastName").val(),
                            password : $("#lrpassword").val(),
                            email : $("#Lemail").val()
                        },
                        success : function(data){
                            alert("Details update successfully");
                            socket.close();
                            window.location.href = '/Signin';
                        }
                    });
                }
            }
        });
    }
}   