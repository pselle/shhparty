var socket = io.connect('/')
var peer = new Peer({key: 'fr9d131o9wwmi'})

// Open a connection
peer.on('connection', function(conn) {
  // On receive data, do stuff.
  conn.on('data', function(data){
    console.log(data)

    // DJ has recognized your attendance and registered you,
    // close your connection to the DJ
    if (data.type != undefined && data.party != undefined) {
      console.log(peer.id)
      if(data.type == "registration_complete" && data.party == dj) {
        console.log("closing")
        closeConnection()
      }
    }
  })
})

peer.on('call', function(mediaConn) {
  mediaConn.answer()

  mediaConn.on('stream', function(stream) {
    var audioEl = document.querySelector('audio')
    audioEl.src = window.URL.createObjectURL(stream)
  })
  mediaConn.on('error', function(err) { console.log(err) })
})

// Ok, you're not the DJ. So, you first need to tell the DJ that you are here,
// and you are ready to party.
var conn = peer.connect(dj)
conn.on('open', function() {
  conn.send({ type: "here", party: dj, id: peer.id })
  console.log("Said I'm here.")
})

// Close the connection to the DJ after the callback has executed
function closeConnection() {
  window.setTimeout(function() {
    conn.close()
  }, 1)
}
