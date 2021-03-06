// shhparty-server app

// express magic
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
io.set('log level', 1);
var device  = require('express-device')
var fs = require('fs')

var runningPortNumber = process.env.PORT

app.set('port', (process.env.PORT || 9887))

app.configure(function(){
  // I need to access everything in '/public' directly
  app.use(express.static(__dirname + '/public'))

  // set the view engine
  app.set('view engine', 'ejs')
  app.set('views', __dirname +'/views')

  app.use(device.capture())
  // Open the data file and try to read it, just so we know it exists.
  fs.readFile("tmp/data.json", {flag: 'w+', encoding: 'utf8'}, function(err, data) {
    if (err) {
      console.error(err)
    }
  });
})

// Logs every request
app.use(function(req, res, next) {
  // Output every request in the array
  console.log({method:req.method, url: req.url, device: req.device})

  // Goes onto the next function in line
  next()
})

app.get("/", function(req, res) {
  fs.readFile("tmp/data.json", {encoding: 'utf8'}, function(err, data) {
    if (err) {
      console.error(err)
    }
    var parties = []
    if (data) {
      parties = data.trim().split("\n").map(function (p) {
        return JSON.parse(p)
      })
    }
    res.render('index', {parties: parties})
  })
})

// Get handler for partying with a DJ.
app.get("/party/:partyid", function(req, res) {
  res.render('party', { partyId: req.params.partyid })
})

app.get("/dj/:partyid", function(req, res) {
  res.render('dj', { partyId: req.params.partyid, url: req.get('host') })
})

io.sockets.on('connection', function (socket) {
  socket.on("joinRoom", function(room) {
    socket.join(room)
  })

  socket.on("newParty", function(data) {
    console.log("Recieved new party", data)
    var text = '{"created":' + Date.now() +','
              + '"peerId":"' + data.peerId + '",'
              + '"partyName":"' + data.partyName + '",'
              + '"partyMeta":"' + data.partyMeta + '"'
              + '}\n'
    fs.writeFile("tmp/data.json", text, {encoding: 'utf8', flag: 'a+'}, function(error) {
      if (error) {
        console.error(error)
      }
    })
  })

  socket.on("closedParty", function(partyData) {
    console.log("Closing party", partyData)
    socket.broadcast.to(partyData.peerId).emit("partyClosed", { dj: partyData.peerId })
    fs.readFile("tmp/data.json",  {encoding: 'utf8'}, function(err, data) {
      if (err) {
        console.error(err)
      }
      var parties = ""
      if (data) {
        data.trim().split("\n").map(function (p) {
          var parsed = JSON.parse(p)
          if(parsed.peerId != partyData.peerId) {
            parties = parties + p + "\n"
          }

        })

        fs.writeFile("tmp/data.json", parties, {encoding: 'utf8'}, function(error) {
          if(error) {
            console.error(error)
          }
        })
      }
    })
  })
})

server.listen(app.get('port'), function() {
  console.log('http://127.0.0.1:' + app.get('port'))
})
