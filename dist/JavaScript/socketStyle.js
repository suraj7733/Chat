//const ConnectionConfig = require("mysql/lib/ConnectionConfig");

//var mm = 7733877412;
var socket = io.connect("http://Amazone.com:3000");
function setMobileIntoSocket(phone) {
    //alert(mm);
    sessionStorage.clear();
    sessionStorage.setItem("phone", phone);
    var m = JSON.stringify({ phone : sessionStorage.getItem("phone") });
    socket.emit("AddPhoneC#", m);
}

// show request lists

function showRequestlist(phone) {
    var datas = JSON.stringify({ phone: phone, myphone: sessionStorage.getItem("phone") });
    socket.emit("showRequest", datas);
}

socket.on("showRequest", function (data) {
    //alert(data.reqlist[0].receiver_phone);
    $("#ShowRequestNotification").empty();
    data.reqlist.forEach(relement => {
        data.userlist.forEach(uelement => {
            if (relement.receiver_phone == uelement.user_phone) {
                $("#ShowRequestNotification").append('<li  class="list-group-item">' +
                    '<div class="media">' +
                    '<div class="btn btn-primary btn-icon rounded-circle text-light mr-2">' +
                    '<!-- Default :: Inline SVG -->' +
                    '<svg class="hw-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
                    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>' +
                    '</svg>' +

                    '<!-- Alternate :: External File link -->' +
                    '<!-- <img class="injectable hw-24" src="./../assets/media/heroicons/outline/user-add.svg" alt=""> -->' +
                    '</div>' +

                    '<div class="media-body">' +
                    '<h6><a href="#">' + uelement.user_firstname.toUpperCase() + " " + uelement.user_lastname.toUpperCase() + '</a> send you a friend request</h6>' +

                    '<p class="text-muted mb-0">' + relement.rtime + '</p>' +
                    '</div>' +
                    '</div>' +
                    '<div class="d-flex justify-content-center mt-2">' +
                    '<button type="button" onclick="reject(' + uelement.user_phone + ')" class="btn btn-outline-danger mx-1">Reject</button>' +
                    '<button type="button" onclick="accept(' + uelement.user_phone + ')" class="btn btn-primary mx-1">Accept</button>' +
                    '</div>' +

                    '</li>');
            }
        });
    });
});

// show  accepted member on other browser
function showFSMembers(phone){
    var data = JSON.stringify({otherphone : phone , myphone: sessionStorage.getItem("phone") });
    socket.emit("showMemberOnOtherBrowser", data);
}
// get response
socket.on("showMemberOnOtherBrowserFS", function (data) {
    //console.log(data);
    //$("#chatContactTab").empty();
    var i = 0, j = 0;
        data.aldata.forEach(element => {
        if(j == 0){
            j  = j + 1;
            data.udata.forEach(uelement => {
                if (element.others_phone == uelement.user_phone) {
                    if (i == 0) {
                        i = i + 1;
                        if (uelement.user_photo == null) {
                            var name = uelement.user_firstname + " " + uelement.user_lastname;
                            var shortname = showMembersPhotoName(name);
                            $("#chatContactTab").append('<li onclick="chatHeader(' + uelement.user_phone + ')" class="contacts-item friends active">' +
                                '<a class="contacts-link" href="#chatsShow">' +
                                '<div class="avatar avatar-offline bg-info text-light">' +
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
                                '<div class="avatar avatar-online">' +
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
                                '<div class="avatar avatar-offline bg-info text-light">' +
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
                                '<div class="avatar avatar-online">' +
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
        }
        });
});
//

// Send message To the user

function clickOnMembers(data) {
    showFullMessages(data.chatHeader[0].user_phone, data.chatHeader[0].user_firstname, data.chatHeader[0].user_lastname, data.chatHeader[0].user_photo);
    //alert(data.chatHeader[0].user_firstname+"Helooooo");
    document.getElementById("writeMessage").removeAttribute("placeholder");
    document.getElementById("writeMessage").setAttribute("placeholder",`Write your Message for ${data.chatHeader[0].user_firstname}`);
    
    // typing event
    $("#writeMessage").keyup(function(){
        socket.emit("typing", { otherphone : data.chatHeader[0].user_phone, myphone : sessionStorage.getItem("phone") });
    });
    $("#writeMessage").blur(function(){
        socket.emit("blurPos", { otherphone : data.chatHeader[0].user_phone, myphone : sessionStorage.getItem("phone") });
    });
    $("#sendMessage").click(function () {
        var message = $("#writeMessage").val();
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
        if (message != "") {
            //$("#todayMessage").empty();
            $("#todayMessage").show();
            $("#todayMessage").append(`<div class="message self">
        <div class="message-wrapper">
            <div class="message-content"><span>${message}</span></div>
        </div>
        <div class="message-options">
            <div class="avatar avatar-sm d-none d-sm-inline-block mr-3 bg-info text-light"><span>YOU</span></div>
    
            <span class="message-date">${rtime}</span>
    
            <div class="dropdown">
                <a class="text-muted" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <!-- Default :: Inline SVG -->
                    <svg class="hw-18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                    </svg>
    
                    <!-- Alternate :: External File link -->
                    <!-- <img class="injectable hw-18" src="./../assets/media/heroicons/outline/dots-horizontal.svg" alt="message options"> -->
                </a>
    
                <div class="dropdown-menu">
                    <a class="dropdown-item d-flex align-items-center" href="#">
                        <!-- Default :: Inline SVG -->
                        <svg class="hw-18 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                          
                        <!-- Alternate :: External File link -->
                        <!-- <img class="injectable hw-18 mr-2" src="./../assets/media/heroicons/outline/duplicate.svg" alt="message options"> -->
                        <span>Copy</span>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                        <!-- Default :: Inline SVG -->
                        <svg class="hw-18 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                        </svg>
    
                        <!-- Alternate :: External File link -->
                        <!-- <img class="injectable hw-18 mr-2" src="./../assets/media/heroicons/outline/pencil.svg" alt="message edit"> -->
                        <span>Edit</span>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                        <!-- Default :: Inline SVG -->
                        <svg class="hw-18 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                        </svg>
    
                        <!-- Alternate :: External File link -->
                        <!-- <img class="injectable hw-18 mr-2" src="./../assets/media/heroicons/outline/reply.svg" alt="message replay"> -->
                        <span>Replay</span>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                        <!-- Default :: Inline SVG -->
                        <svg class="hw-18 rotate-y mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
                        </svg>
    
                        <!-- Alternate :: External File link -->
                        <!-- <img class="injectable rotate-y hw-18 mr-2" src="./../assets/media/heroicons/outline/reply.svg" alt="message forward"> -->
                        <span>Forward</span>
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="#">
                        <!-- Default :: Inline SVG -->
                        <svg class="hw-18 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                        </svg>
                          
                        <!-- Alternate :: External File link -->
                        <!-- <img class="injectable hw-18 mr-2" src="./../assets/media/heroicons/outline/star.svg" alt="message favourite"> -->
                        <span>Favourite</span>
                    </a>
                    <a class="dropdown-item d-flex align-items-center text-danger" href="#">
                        <!-- Default :: Inline SVG -->
                        <svg class="hw-18 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                          
                        <!-- Alternate :: External File link -->
                        <!-- <img class="injectable hw-18 mr-2" src="./../assets/media/heroicons/outline/trash.svg" alt="message delete"> -->
                        <span>Delete</span>
                    </a>
                </div>
            </div>
        </div>
    </div>`);
            $(".chat-content").animate({
                scrollTop: $(".chat-content").get(0).scrollHeight
            }, 2000);
            $("#writeMessage").val('');

            // Sending Message to the server
            var g = JSON.stringify({phone : data.chatHeader[0].user_phone, message : message, myphone : sessionStorage.getItem("phone"), uname : data.chatHeader[0].user_firstname + " " + data.chatHeader[0].user_lastname, photo : data.chatHeader[0].user_photo });
            //var sendData = "{'phone' : '"+data.chatHeader[0].user_phone+"', 'message' : '"+message+"', 'myphone' : '"+sessionStorage.getItem("phone")+"', 'uname' : '"+data.chatHeader[0].user_firstname+"'}";
            socket.emit("MessageHere", g);

        } else {
            //$("#sendMessage").attr({ disabled : true });
        }
    });
}
// response typing
/*socket.on("typingReponse", function(data){
    //id="showactivity"
    $("#showactivity").empty();
    document.getElementById("showactivity").innerHTML = data.msg;
});*/

// response bluring
/*socket.on("blurReponse", function(data){
    //id="showactivity"
    $("#showactivity").empty();
    document.getElementById("showactivity").innerHTML = data.msg;
});*/

// show message on the user screen
socket.on("MessageThere", function (data) {
    //alert(data.message);
    //var data = JSON.parse(data);
    //var date = data.date;
    //date = new Intl.DateTimeFormat('en-US', {year : "2-digits"}).format(date);
    //alert(date);
    if(data.photo == null){
        var shortname = showMembersPhotoName(data.name);
        $("#todayMessage").show();
    //var objmy = document.getElementsByClassName("chat-content");
    //objmy.scrollTop = objmy.scrollHeight;
    $("#todayMessage").append(`<div class="message">
    <div class="message-wrapper">
        <div class="message-content">
            <span>${data.message}</span>
        </div>
    </div>
    <div class="message-options">
        <div class="avatar avatar-sm d-none d-sm-inline-block mr-3 bg-info text-light"><span>${shortname}</span></div>
        <span class="message-date">${data.date}</span>
    </div>
</div>
`);
    }else{
        var shortname = data.photo;
        $("#todayMessage").show();
    //var objmy = document.getElementsByClassName("chat-content");
    //objmy.scrollTop = objmy.scrollHeight;
    $("#todayMessage").append(`<div class="message">
    <div class="message-wrapper">
        <div class="message-content">
            <span>${data.message}</span>
        </div>
    </div>
    <div class="message-options">
    <div class="avatar avatar-sm"><img alt="" src="${shortname}">
    </div>
        <span class="message-date">${data.date}</span>
    </div>
</div>
`);
    }
    
    $(".chat-content").animate({
        scrollTop: $(".chat-content").get(0).scrollHeight
    }, 200);
    $("#writeMessage").val('');
});

function showFullMessages(phone, fname, lname, photo) {
    $.ajax({
        url: "/showFullMessage",
        type: "POST",
        data: { phone: phone },
        success: function (data) {
            $("#todayMessage").show();
            $("#todayMessage").empty();
            data.resData.forEach(Element => {
                //alert(Element.others_phone)
                if(photo == null){
                    var fullname = fname + " " + lname;
                    var shortname = showMembersPhotoName(fullname);
                    if (Element.own_phone == phone && Element.others_phone == data.myPhone) {
                        //var date = Element.date;
                        //date = new Intl.DateTimeFormat("en-US", {year : "2-digits"}).format(date);
                        $("#todayMessage").append(`<div class="message">
                <div class="message-wrapper">
                    <div class="message-content">
                        <span>${Element.message}</span>
                    </div>
                </div>
                <div class="message-options">
                    <div class="avatar avatar-sm d-none d-sm-inline-block mr-3 bg-info text-light"><span>${shortname}</span></div>
                    <span class="message-date">${Element.date}</span>
                </div>
            </div>`);
                    }
                    else if (Element.own_phone == data.myPhone && Element.others_phone == phone) {
                        $("#todayMessage").append(`<div class="message self">
                <div class="message-wrapper">
                    <div class="message-content"><span>${Element.message}</span></div>
                </div>
                <div class="message-options">
                    <div class="avatar avatar-sm d-none d-sm-inline-block mr-3 bg-info text-light"><span>YOU</span></div>
                    <span class="message-date">${Element.date}</span>
                </div>
            </div>
            `);
                    }
                }else{
                    var shortname = photo;
                    if (Element.own_phone == phone && Element.others_phone == data.myPhone) {
                        $("#todayMessage").append(`<div class="message">
                <div class="message-wrapper">
                    <div class="message-content">
                        <span>${Element.message}</span>
                    </div>
                </div>
                <div class="message-options">
                <div class="avatar avatar-sm"><img alt="" src="${shortname}">
                </div>
                    <span class="message-date">${Element.date}</span>
                </div>
            </div>`);
                    }
                    else if (Element.own_phone == data.myPhone && Element.others_phone == phone) {
                        $("#todayMessage").append(`<div class="message self">
                <div class="message-wrapper">
                    <div class="message-content"><span>${Element.message}</span></div>
                </div>
                <div class="message-options">
                    <div class="avatar avatar-sm d-none d-sm-inline-block mr-3 bg-info text-light"><span>YOU</span></div>
                    <span class="message-date">${Element.date}</span>
                </div>
            </div>
            `);
                    }
                }
                
            });
            $(".chat-content").animate({
                scrollTop: $(".chat-content").get(0).scrollHeight
            }, 2000);
            $("#writeMessage").val('');
        },
        error: function (x, y, z) {

        }
    });
}


//Video Calling
/*
let peerConnection;
const config = {
  iceServers: [
      { 
        "urls": "stun:stun.l.google.com:19302",
      },
      // { 
      //   "urls": "turn:TURN_IP?transport=tcp",
      //   "username": "TURN_USERNAME",
      //   "credential": "TURN_CREDENTIALS"
      // }
  ]
};

//const socket = io.connect(window.location.origin);
//const enableAudioButton = document.querySelector("#enable-audio");

//enableAudioButton.addEventListener("click", enableAudio)

socket.on("offer", (id, description) => {
  const lvideo = document.querySelector("#localVideo");
  navigator.mediaDevices.getUserMedia({ video : true })
  .then(function(s){
      lvideo.srcObject = s;
  });
  const video = document.querySelector("#remoteVideo");
  peerConnection = new RTCPeerConnection(config);
  peerConnection
    .setRemoteDescription(description)
    .then(() => peerConnection.createAnswer())
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
      socket.emit("answer", id, peerConnection.localDescription);
    });
  peerConnection.ontrack = event => {
    video.srcObject = event.streams[0];
  };
  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      socket.emit("candidate", id, event.candidate);
    }
};
});


socket.on("candidate", (id, candidate) => {
  peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
});

socket.on("connect", () => {
  socket.emit("watcher");
});


socket.on("broadcaster", () => {
  socket.emit("watcher");
});

*/
window.onunload = window.onbeforeunload = () => {
  socket.close();
  //peerConnection.close();
};


//module.exports = socket;*/
