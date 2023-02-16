const express =  require('express');
var app = express();
var hbs = require('hbs');


// --------view engine,static,form post---------
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname+"/static"));
app.set('view engine','hbs');


// -----------Node Mailer-------
var nodemailer = require('nodemailer');
var sender = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'privateplatinum2020@gmail.com',
        pass:'amuvttxzwnrzqrruatr'
    }
});


// -----------Mysql------------
var mysql = require('mysql');
var conn  = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"karthikeyan",
    database:"mydb"
});

conn.getConnection((err,data)=>{
    if(err){
        console.log("DB Connect error"+err);
    }else{
        console.log("Connected Success !");
    }
});


global.session = {
    user:false,
    admin:false,
    u_email:"",
    a_email:""
};





// --------------Index Page---------------
app.get("/",(req,res)=>{
    return res.render("index",{session:session});        
});


// ---------------Login Page---------------
app.get("/login",(req,res)=>{
    return res.render("login",{session:session});
});


app.post("/addlogin",(req,res)=>{
    var login_email = req.body.login_email;
    var login_password = req.body.login_pass;

    var query = 'SELECT PASSWORD,ROLE FROM USERDATA WHERE EMAIL = ?';

    conn.query(query,login_email,(err,data)=>{
        if(data.length==0){
            res.render("signup",{session:session,msg:"No Email Found! Please Register"});
        }
        else{
            if(login_password == decryption(data[0].PASSWORD)){
                if(data[0].ROLE=="user"){
                    session.user = true;
                    session.admin = false;
                    session.u_email = login_email;
                }else if(data[0].ROLE=="admin"){
                    session.user = false;
                    session.admin = true;
                    session.a_email = login_email;
                }
                res.setTimeout(2000,()=>{
                    res.redirect("/");
                });
            }
            else{
                res.render("login",{session:session,msg:"Email or Password Incorrect"});
            }
        }
    });

});




//----------------Signup page--------------
app.get("/signup",(req,res)=>{
    return res.render("signup",{session:session});
});

app.post("/otp",(req,res)=>{
    global.username = req.body.signup_name;
    global.useremail = req.body.signup_email;
    global.usernumber = req.body.signup_number;
    global.userpassword = req.body.signup_pass;
    global.userrole = "user";
    global.otp = 100000+Math.floor( Math.random()*89999);

    var compose = {
        from: 'LIVE LOCATION TRACKER <privateplatinum2020@gmail.com>',
        to:useremail,
        subject:"VERIFICATION",
        text:'Hi '+username+'!,\n\nYour Verification Code :['+otp+']\n\nEnter the code to verify your account. \n\nThis mail is for Verification purpose Only....\n\nThank You.'
    };

    var query = 'SELECT * FROM USERDATA WHERE EMAIL = ?';

    conn.query(query,useremail,(err,data)=>{
        if(data.length==0){
            sender.sendMail(compose,function(err,data){
                if(err){ throw err;}
                else{
                    return res.render("otp",{email:useremail});
                }
            });
        }
        else{
            return res.render("login",{session:session,msg:"Email already Exists !"});
        }
    });
});


app.post("/otpverify",(req,res)=>{
    var userotp = req.body.user_entered_otp;
    if(userotp==otp){
        const query = 'INSERT INTO USERDATA VALUES(?,?,?,?,?)';
        var insertdata = [username,useremail,usernumber,encryption(userpassword),userrole];
        conn.query(query,insertdata,(err,result)=>{
            if(err){
                return res.render("signup",{session:session,msg:"Query Insertion Error,Try later..."});
            }
            else{
                return res.render("login",{session:session,msg:"Register Success"});
            }
        });
    }else{
        return res.render("otp",{msg:"Wrong Otp",email:useremail});
    }
});





//---------------------LOGOUT-------
app.get("/logout",(req,res)=>{
    res.render("logout",{session:session});
});

app.get("/addlogout",(req,res)=>{
    session.user = false;
    session.admin = false;
    session.u_email = "";
    session.a_email = "";
    res.setTimeout(2000,()=>{
        res.redirect("/");
    });
});



app.get("*",(req,res)=>{
    res.send("No Page Found");
});


app.listen(6383,function(){
    console.log("Port running http://localhost:6383");
})







function encryption(pt){
    var ct = "";
    for(var i=0;i<pt.length;i++){
        let code = pt.charCodeAt(i)+3;
        ct += String.fromCharCode(code);
    }
    
    return ct;
}

function decryption(ct){
    var pt = "";
    for(var i=0;i<ct.length;i++){
        let code = ct.charCodeAt(i)-3;
        pt += String.fromCharCode(code);
    }
    
    return pt;
}