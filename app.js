var sys = require('sys')
var exec = require('child_process').exec;

function getLocalIp() {
  exec("ifconfig | grep 'inet ' | grep -v 127.0.0.1",
   function parseIP(error, stdout, stderr) {
      var re = /inet (\d*\S*) netmask/
      var localIP = re.exec(stdout)[1]
      console.log(localIP)
    }
  );
}

getLocalIp()
