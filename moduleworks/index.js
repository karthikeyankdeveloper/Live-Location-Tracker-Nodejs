var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "karthikeyan",
    database: "MyDB"
});


var query = "SELECT Name,password FROM userdata WHERE EMAIL = ?";
var email = 'karthi4313613@gmail.com';


conn.query(query,email,(err, result) => {
    if (!err) {
        console.log(result)
    } else {
        console.log(err)
    }
});



