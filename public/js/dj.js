var socket = io.connect('/')
// Get DJ id from browser
var peer = new Peer(window.location.pathname.split('/')[2], {key: 'fr9d131o9wwmi'})

peer.on('connection', function(conn) {
  conn.on('data', function(data){
    console.log(data);
  });
});
