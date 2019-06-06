var sqlPool = require('./njuesportsql')

exports.getActivities = function(req, res){
    var result = [];
    var index = req.param('index');
    var queryStr = 'SELECT * FROM Activities ORDER BY id desc limit ' + index.toString() + ',10';
    //console.log(queryStr);
    sqlPool.query(queryStr,function(err,results,fields){
	res.send(results);
    });
}

exports.getActivityCards = function(req, res){
    var result = [];
    var displayNum = req.param('displayNum');
    var queryStr = 'SELECT * FROM ActivityCards ORDER BY id desc limit ' + displayNum;
    //console.log(queryStr);
    sqlPool.query(queryStr,function(err,results,fields){
        res.send(results);
    });
}

exports.getReviewCards = function(req, res){
    var result = [];
    var displayNum = req.param('displayNum');
    var queryStr = 'SELECT * FROM ReviewCards ORDER BY id desc limit ' + displayNum;
    //console.log(queryStr);
    sqlPool.query(queryStr,function(err,results,fields){
        res.send(results);
    });
}


exports.getTest = getTest;

function getTest(index){
    var res = [];
    sqlPool.query('SELECT * FROM Activities', function(err, results, fields){
	console.log("index="+index);
	for(var i=index; i<index+5 ;i++){
	    res.push(results[i]);
	    console.log("i="+i);
	}
    });
    console.log("res = " + res[0]);
    return res;
}
    
