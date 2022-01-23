var exec = require('child_process').exec

exec('ruby ./builder/build.rb', function (error, stdout, stderr) {
  stdout != null ? console.log(stdout) : true ;
  stderr != null ? console.error(stderr) : true ;
});