var socket = io.connect('/')

var app = app || {}

var newPartyButton = document.getElementById('newParty')
var peer = new Peer({key: 'hm094plpm3b1q0k9', debug: 3})

newPartyButton.addEventListener('click', function(e) {
  var partyData = {
    peerId: peer.id,
    partyName: document.getElementById('partyName').value || "An unnamed party",
    partyMeta: document.getElementById('partyMeta').value
  }
  socket.emit("newParty", partyData)
  window.location = "/dj/" + peer.id
})
