var socket = io.connect('/')
var peer = new Peer({key: 'fr9d131o9wwmi'})

peer.on('connection', function(conn) {
  conn.on('data', function(data){
    console.log(data);
  });
});

var conn = peer.connect(dj)
conn.on('open', function() {
  conn.send({ id: peer.id })
})
