var socket = io.connect('/');

var app = app || {};

socket.on("blast", function(data){
  console.log('cats', data)
});

var newRoomButton = document.getElementById('DJ')
var peer = new Peer({key: 'fr9d131o9wwmi'})

newRoomButton.addEventListener('click', function(e) {
  console.log(peer.id)
})
