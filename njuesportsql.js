var mysql = require('mysql');
var fs = require('fs');
var sqlConfig = JSON.parse(fs.readFileSync("./config/mysql.conf"));
var pool = mysql.createPool(sqlConfig);

module.exports = pool;
