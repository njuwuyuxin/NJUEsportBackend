var mysql = require('mysql');
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'wyx199812@',
    database : 'NJUESPORT'
});

module.exports = pool;
