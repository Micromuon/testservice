var assert = require('assert');
var request = require('superagent');
process.env.npm_config_port = 16000;
require('../testservice.js'); //Boot up the server for tests

var path = "http://localhost:16000";

var postData = {"serviceURL":"http://localhost:16000", "cron":"*/10 * * * * *", "serviceName":"myService", "expectedResStatus":"200"};

describe('test testService: ', function() {

    it('/ works ok', function(done) {
        sendReq('get', path, function(res) {assert.equal("We are the knights who say ni", res.body);  done()});
    });
});

function sendReq(type, path, assertion){
    console.log("***** sendReq()");
    var callback = function(res) {
        console.log("***** sendReq() callback");
        assertion(res);
    };
    if (type == 'put'){
        console.log("***** sendReq() if type == put");
        var req = request.put(path);
        req.send( postData );
        req.end(callback);
    } else if (type == 'del'){
         console.log("***** sendReq() if type == del");
        var req = request.del(path);
        req.end(callback);
    } else if (type == 'get'){
         console.log("***** sendReq() if type == get");
        var req = request.get(path);
        req.end(function(res) {assertion(res)});
    }
}
