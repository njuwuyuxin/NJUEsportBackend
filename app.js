var test = require('./test');
var fs = require('fs');
//var newsApi = require('./newsApi');
var express = require('express');
var https = require('https');
var njuesportsql = require('./njuesportsql');
var newsApi = require('./newsApi');
var app = express();

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

var options = {
    key: fs.readFileSync('/root/lnmp1.3-full/certificate/Nginx/2_njuesport.club.key'),
    cert: fs.readFileSync('/root/lnmp1.3-full/certificate/Nginx/1_njuesport.club_bundle.crt')
}
var httpsServer = https.createServer(options, app);
httpsServer.listen(8030,function(){
    console.log("Https server is running on: https://localhost:8030");
});

//var server = app.listen(8020, function(){
//    var host = server.address().address;
//    var port = server.address().port;
//    console.log("应用实例，访问地址为: https://%s:%s", host, port);
//})
