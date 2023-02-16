LIVE LOCATION TRACKER

------------ INSTALLATION REQUIREMENTS --------------

node init -y

1.EXPRESS - (npm i express) - used for server.

2.NODEMON - for continous running server while changes - (npm i nodemon)
    package.json = > "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon app.js"}

3.VIEW ENGINE TEMPLATES - (ejs,hbs,pug) --- npm i hbs
    2.1.using render call, folder name must be views
    2.2.

4.set static file path using express - app.use(express.static(__dirname+"/public")); //add this in top after var app = express();

5.for post call - app.use(express.urlencoded({extended:false})); //add this in top after var app = express();


by Karthikeyan K