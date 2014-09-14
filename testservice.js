console.log("trying to run on " + process.env.npm_config_port)
var port = process.env.npm_config_port;

http = require('http');
var restify = require('restify');
var server = restify.createServer();
var url = require('url');
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(port, function() {
    console.log('testService listening at %s', server.url);
});

server.get('/', function(req, res) {
    console.log("testService GET /");
    res.send("We are the knights who say ni" || 404);
});
