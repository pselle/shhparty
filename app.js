var express = require('express')
var sys = require('sys')
var exec = require('child_process').exec

// Sets local IP in a totally non-elegant way
var localIP
(function getLocalIp() {
  var local = exec("ifconfig | grep 'inet ' | grep -v 127.0.0.1",
   function parseIP(error, stdout, stderr) {
      var re = /inet (\d*\S*) netmask/
      var parsedIP = re.exec(stdout)[1]
      localIP = parsedIP
      console.log(localIP)
    }
  );
})()

var app = express();

app.use(express.static('public'));
// view engine setup
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', { title: localIP });
});

var server = app.listen(6799, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

