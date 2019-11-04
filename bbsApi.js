var sqlPool = require('./njuesportsql')

//获取首页论坛好帖API
exports.getBBSPosts = function(req,res){
    var result = [];
    //var displayNum = req.param('displayNum');
    var queryStr = 'SELECT * FROM BBSPost ORDER BY id desc limit ' + 3;
    //console.log(queryStr);
    sqlPool.query(queryStr,function(err,results,fields){
        res.send(results);
    });
}
