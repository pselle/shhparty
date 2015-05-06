var socket = io.connect('/')

var app = app || {}

var newPartyButton = document.getElementById('newParty')
var peer = new Peer({key: 'hm094plpm3b1q0k9', debug: 3})

newPartyButton.addEventListener('click', function(e) {
  var partyData = {
    peerId: peer.id,
    name: document.getElementById('partyName').value,
    descriptiion: document.getElementById('partyMeta').value
  }
  socket.emit("newParty", partyData)
  window.location = "/dj/" + peer.id
})
