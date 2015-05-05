var socket = io.connect('/')

var app = app || {}

socket.on("blast", function(data){
  console.log('cats', data)
})

var newPartyButton = document.getElementById('newParty')
var peer = new Peer({key: 'hm094plpm3b1q0k9', debug: 3})

newPartyButton.addEventListener('click', function(e) {
  socket.emit("newParty", { peerId: peer.id })
  window.location = "/dj/" + peer.id
})
