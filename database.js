const mysql=require('mysql2');
const pool=mysql.createPool({
    host: 'localhost',
    user:'root',
    database:'node',
    password:'T23jb4rk'

})
module.exports=pool.promise();