
var socket = io.connect('/')

// The dj var is written by the server side template.
console.log("You are the dj:", dj)
var peer = new Peer(dj, {key: 'fr9d131o9wwmi'})
var partiers = []

// Open connection to recieve data.
peer.on('connection', function(conn) {
  conn.on('data', function(data) {
    console.log(data);

    // Someone is here to party, check to make sure they are at the right
    // party, add them to the list of people partying.
    if (data.type != undefined && data.party != undefined && data.id != undefined) {
      if (data.type == "here" && data.party == dj) {
        partiers.push(data.id)
        console.log("New Partier", data.id)
      } else {
        console.log("Person trying to get to wrong party.")
      }

      console.log("Partier Count", partiers.length)
    }
  });
});
