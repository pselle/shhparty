var socket = io.connect('/')
var peer = new Peer({key: 'fr9d131o9wwmi'})

// Open a connection
peer.on('connection', function(conn) {
  // On recieve data, do stuff.
  conn.on('data', function(data){
    console.log(data);
  });
});

// Ok, you're not the DJ. So, you first need to tell the DJ that you are here,
// and you are ready to party.
var conn = peer.connect(dj)
conn.on('open', function() {
  conn.send({ type: "here", party: dj, id: peer.id })
  console.log("Said I'm here.")
})
