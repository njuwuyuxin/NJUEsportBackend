var express = require('express');
var https = require('https');

var test = require('./test');
var fs = require('fs');
var njuesportsql = require('./njuesportsql');
var newsApi = require('./newsApi');

var adminEntry = require('./AdminSystem/entry');
var activitiesTable = require('./AdminSystem/ActivitiesTable');

var app = express();

app.use(express.urlencoded());
app.use(express.json());

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
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
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

app.get('/admin',adminEntry.adminIndex);
app.post('/admin/getActivitiesList',activitiesTable.getActivitiesList);
app.post('/admin/editActivities',activitiesTable.editActivities);


var options = {
    key: fs.readFileSync(config.key),
    cert: fs.readFileSync(config.certificate)
}
var serviceServer = https.createServer(options, app);
serviceServer.listen(parseInt(config.service_port),function(){
    console.log("Service server is running on: https://localhost:"+config.service_port);
});

var adminSystemServer = https.createServer(options, app);
adminSystemServer.listen(parseInt(config.adminsystem_port),function(){
    console.log("Admin System server is running on: https://localhost:"+config.adminsystem_port);
});
