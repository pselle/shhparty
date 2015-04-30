// shhparty-server app

// express magic
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)
var device  = require('express-device')
var fs = require('fs')

var runningPortNumber = process.env.PORT

app.configure(function(){
  // I need to access everything in '/public' directly
  app.use(express.static(__dirname + '/public'))

  // set the view engine
  app.set('view engine', 'ejs')
  app.set('views', __dirname +'/views')

  app.use(device.capture())
})


// Logs every request
app.use(function(req, res, next) {
  // Output every request in the array
  console.log({method:req.method, url: req.url, device: req.device})

  // Goes onto the next function in line
  next()
})

app.get("/", function(req, res){
  res.render('index', {})
})

io.sockets.on('connection', function (socket) {

  io.sockets.emit('blast', {msg:"PamISAWESOME"})

  socket.on('blast', function(data, fn) {
    console.log(data)
    io.sockets.emit('blast', {msg:data.msg})
    fn() // Call the client back to clear out the field
  })

  socket.on("newParty", function(data) {
    console.log(data)
    fs.open("tmp/data.json", 'a', function(error, fd) {
      if (error) {
        console.error(error)
      }
      var text = '{"created":' + Date.now() +',"peerId":"' + data.peerId + '"}\n'
      fs.write(fd, text, null, null, null, function(error) {
        if (error) {
          console.error(error)
        }
        fs.close(fd)
      })
    })
  })
})

server.listen(9887)
