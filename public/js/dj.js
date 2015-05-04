
var socket = io.connect('/')

// The dj var is written by the server side template.
console.log("You are the dj:", dj)
var peer = new Peer(dj, {key: 'fr9d131o9wwmi'})
var partiers = []

var stream;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
  navigator.getUserMedia(
      { audio: true },
      function(incoming) {
        stream = incoming
      },
      function(err) {
        console.log("The following error occured: " + err.name);
      });
} else {
  console.error("getUserMedia not supported");
}

// Open connection to recieve data.
peer.on('connection', function(conn) {
  conn.on('data', function(data) {
    console.log(data);

    // Someone is here to party, check to make sure they are at the right
    // party, add them to the list of people partying.
    if (data.type != undefined && data.party != undefined && data.id != undefined) {
      if (data.type == "here" && data.party == dj) {
        var conn = peer.call(data.id, stream)
        conn.on('open', function() {
          conn.send({ type: "registration_complete", party: dj })
          partiers.push(conn)
          console.log("New Partier", data.id)
        })
      } else {
        console.log("Person trying to get to wrong party.")
      }

      console.log("Partier Count", partiers.length)
    }
  });
});

/*
window.setInterval(function() {
  for (i in partiers) {
    if (partiers[i].open) {
      console.log("ping", i)
      partiers[i].send(i)
    } else {
      partiers[i].close()
    }
  }
}, 500);
*/
