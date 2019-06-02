var test = require('./test');

var express = require('express');
var app = express();
app.get('/test1', test.test1);
app.get('/test2', test.test2);

var server = app.listen(8020, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为: https://%s:%s", host, port);
})
