var static = require('node-static')
  , port = 3000
  , file = new static.Server;

require('http').createServer(function (req, res) {
  req.addListener('end', function () {
    file.serve(req, res);
  });
}).listen(port);
console.log('Serving files at http://localhost:' + port);
