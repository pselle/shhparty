var socket = io.connect('/')
var peer = new Peer({key: 'hm094plpm3b1q0k9'})
var peer = new Peer({key: 'hm094plpm3b1q0k9', debug: 3})

// Ok, you're not the DJ. So, you first need to tell the DJ that you are here,
// and you are ready to party.
var conn = peer.connect(dj)
conn.on('open', function() {
  conn.send({ type: "here", party: dj, id: peer.id })
  console.log("Said I'm here.")
})

peer.on('call', function(mediaConn) {
  console.log("received call, now answering")
  mediaConn.answer()
  // Close our connection to the DJ, as they're calling us
  if(conn) {
    conn.close()
  }
  mediaConn.on('stream', function(stream) {
    var audioEl = document.querySelector('audio')
    audioEl.src = window.URL.createObjectURL(stream)
  })
  mediaConn.on('error', function(err) { console.log(err) })
})

