var mysql = require('mysql');
var conn  = mysql.createConnection({
    host:"sql.freedb.tech",
    user:"freedb_user_dev_tool",
    password:"V!zAUZh%C!sQ5Z?",
    database:"freedb_my_server",
    connectTimeout:50000,
    port:3306
});

conn.connect((err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Connected Success !")
    }
});

// var query = "CREATE TABLE USER(NAME VARCHAR(255),EMAIL VARCHAR(255));"
// var query = "show tables;"
// var query = "DESC USER"
var query = "INSERT INTO USER VALUES('KARTHIK','KARTHI@GMAIL.COM');"


conn.query(query,(err,res)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(res);
    }
})