var socket = io.connect('/')

var app = app || {}

var newPartyForm = document.getElementById('createParty')
var peer = new Peer({key: 'hm094plpm3b1q0k9', debug: 3})

newPartyForm.addEventListener('submit', function(e) {
  e.preventDefault()
  var partyData = {
    peerId: peer.id,
    partyName: document.getElementById('partyName').value || "An unnamed party",
    partyMeta: document.getElementById('partyMeta').value
  }
  socket.emit("newParty", partyData)
  window.location = "/dj/" + peer.id
})
