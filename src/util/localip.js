var exec = require('child_process').exec

function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

module.exports.getLocalIp = function(callback){
    execute("ifconfig | grep 'inet ' | grep -v 127.0.0.1", function(foo){
      var re = /inet (\d*\S*) netmask/
      var parsedIP = re.exec(foo)[1]
      callback(parsedIP);
    });
};
