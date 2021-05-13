/*let peerConnection2;
const config2 = {
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
//const socket = require("../JavaScript/socketStyle");

socket.on("answer", (id, description) => {
  //alert("Answer Get");
  peerConnection2.setRemoteDescription(description);
  peerConnection2.setLocalDescription();
  const rvi = document.querySelector("#remoteVideo");
  peerConnection2.ontrack = event => {
    rvi.srcObject = event.streams[0];
  }
});

socket.on("watcher", id => {
   peerConnection2 = new RTCPeerConnection(config2);
  //peerConnections = peerConnection;
    
  const videoElement = document.querySelector("#localVideo");
  let stream = videoElement.srcObject;
  stream.getTracks().forEach(track => peerConnection2.addTrack(track, stream));

  peerConnection2.onicecandidate = event => {
    if (event.candidate) {
      socket.emit("candidate", id, event.candidate);
    }
  };
  peerConnection2
    .createOffer()
    .then(sdp => peerConnection2.setLocalDescription(sdp))
    .then(() => {
      socket.emit("offer", id, peerConnection2.localDescription);
    });
});

socket.on("candidate", (id, candidate) => {
  peerConnection2.addIceCandidate(new RTCIceCandidate(candidate));
});

socket.on("disconnectPeer", id => {
  peerConnection2.close();
  delete peerConnection2;
});

window.onunload = window.onbeforeunload = () => {
  sessionStorage.clear();
  socket.close();
};

// Get camera and microphone

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const constraints = {
    audio: true,
    video: true
  };
  return navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotStream)
    .catch(handleError);
}

function gotStream(stream) {
  const videoElement = document.querySelector("#localVideo");
  videoElement.srcObject = stream;
  socket.emit("broadcaster");
}

function handleError(error) {
  console.error("Error: ", error);
}

function callBtn(){
    getStream();
}

function hangUpBtn(){
  peerConnection2.close();
  delete peerConnection2;
  videoElement.srcObject = null;
  socket.emit("callEnd");
}
*/