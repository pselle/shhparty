var socket = io.connect('/')

// The dj var is written by the server side template.
console.log("You are the dj:", dj)
var peer = new Peer(dj, {key: 'hm094plpm3b1q0k9', debug: 3})
var partiers = []

var stream
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

if (navigator.getUserMedia) {
  navigator.getUserMedia(
      { audio: true },
      function(incoming) {
        stream = incoming
      },
      function(err) {
        console.log("The following error occured: " + err.name)
      })
} else {
  console.error("getUserMedia not supported")
}

// Open connection to recieve data.
peer.on('connection', function(conn) {
  conn.on('data', function(data) {
    console.log(data)

    // Someone is here to party, check to make sure they are at the right
    // party, add them to the list of people partying.
    if (data.type != undefined && data.party != undefined && data.id != undefined) {
      if (data.type == "here" && data.party == dj) {
        var conn = peer.call(data.id, stream)
        partiers.push(conn)
        console.log("New Partier", data.id)
      } else {
        console.log("Person trying to get to wrong party.")
      }

      console.log("Partier Count", partiers.length)
    }
  })
})

// When the DJ closes their window, let the server know they're leaving
window.onbeforeunload = function() {
  socket.emit("closedParty", { peerId: peer.id })
  return null
}

// A function to load a file, doesn't work yet.
function LoadFile() {
  var file = document.querySelector('input[type=file]').files[0]
  var reader = new FileReader()
  var context = new AudioContext();

  // Why do this? I has no idea.
  var gainNode = context.createGain();
  gainNode.connect(context.destination);

  reader.onload = (function(e) {
    // Import callback function that provides PCM audio data decoded as an
    // audio buffer.
    context.decodeAudioData(e.target.result, function(buffer) {
      var destination = context.createMediaStreamDestination()
      // TODO: This doesn't work, because browsers haven't implemented ways to
      // swap out tracks yet.
      // stream.addTrack(destination.stream.getAudioTracks()[0])
    })
  })
  reader.readAsArrayBuffer(file);
}
