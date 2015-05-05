var socket = io.connect('/')

var app = app || {}

socket.on("blast", function(data){
  console.log('cats', data)
})

var newPartyButton = document.getElementById('newParty')
var peer = new Peer({key: 'fr9d131o9wwmi'})

newPartyButton.addEventListener('click', function(e) {
  socket.emit("newParty", { peerId: peer.id })
  window.location = "/dj/" + peer.id
})
