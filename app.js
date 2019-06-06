var test = require('./test');
var fs = require('fs');
var express = require('express');
var https = require('https');
var njuesportsql = require('./njuesportsql');
var newsApi = require('./newsApi');
var app = express();


var env = "release";
var config = {};


var args = process.argv;
if(args.length==3&&args[2]=='--staging'){
    env = "staging";
    config = JSON.parse(fs.readFileSync("./config/staging.conf"));
}
else{
    env = "release";
    config = JSON.parse(fs.readFileSync("./config/release.conf"));
}
console.log("env = " + env);

app.all('*', function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.get('/test1', test.test1);
app.get('/test2', test.test2);
app.get('/api/activities',newsApi.getActivities);
app.get('/api/activityCards',newsApi.getActivityCards);
app.get('/api/reviewCards',newsApi.getReviewCards);

var options = {
    key: fs.readFileSync(config.key),
    cert: fs.readFileSync(config.certificate)
}
var httpsServer = https.createServer(options, app);
httpsServer.listen(parseInt(config.port),function(){
    console.log("Https server is running on: https://localhost:"+config.port);
});


//var server = app.listen(8020, function(){
//    var host = server.address().address;
//    var port = server.address().port;
//    console.log("应用实例，访问地址为: https://%s:%s", host, port);
//})
