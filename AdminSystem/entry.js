exports.adminIndex = function(req,res){
    console.log("send index.html");
    res.setHeader('Content-Type', 'text/html');
    res.sendfile('./public/index.html');
}
