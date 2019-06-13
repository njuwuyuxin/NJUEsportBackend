var sqlPool = require('../njuesportsql');
var fs = require('fs');

exports.getActivitiesList = function(req,res){
    var user = JSON.parse(fs.readFileSync("./config/admin.conf"));
    console.log(user);
    if(req.body.password == user.password){
        var queryStr = 'SELECT * FROM Activities'
        sqlPool.query(queryStr,function(err,results,fields){
	    res.send(results);
	});
    }
    else{
	res.send(403);
    }
}

exports.editActivities = function(req,res){
    //console.log(req.body);
    var id = req.body.id;
    var queryStr = 'UPDATE Activities SET title = ?, tag = ?, href = ?, coverPic = ?, content = ? WHERE id = ?';
    var data = [req.body.title, req.body.tag, req.body.href, req.body.coverPic, req.body.content, req.body.id];
    sqlPool.query(queryStr,data,function(err,results,fields){
	if(err){
	    console.error(error.message);
	    res.sendStatus(500);
	}
	else{
	    console.log("edit success");
	    res.sendStatus(200);
	}
    });
}
