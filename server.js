var static = require('node-static');
var file = new static.Server;

require('http').createServer(function (req, res) {
  req.addListener('end', function () {
    file.serve(req, res);
  });
}).listen(3000);
console.log('Serving files at http://localhost:' + 3000);
