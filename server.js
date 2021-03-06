var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser=require('body-parser');
var session=require('express-session');

var config = {
    user:'gobhavyaarora15',
    database:'gobhavyaarora15',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(session({
    secret:'someRandomSecretValue',
    cookie:{maxAge:1000*60*60*24*30}
}));
app.use(bodyParser.json());

var pool=new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
            
        }else{
            res.send(result.rows);
        }
    });
});

function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
    
}

///Sample example of hash function
app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input,'this-is-random-string');
    res.send(hashedString).toString();
});


app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "users" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
        if(err){
            res.status(403).send(JSON.stringify({"error":"User Exist"}));
        }else{
            if(err){
                res.status(403).send(JSON.stringify({"error":"User Exist"}));
            }
            else{
               res.status(200).send(JSON.stringify({"message":"User Created"})); 
            }
            
        }
    });
});



app.post('/login', function (req, res) {
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "users" WHERE username = $1', [username], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if (result.rows.length === 0) {
              res.status(403).send('username/password is invalid');
          } else {
              // Match the password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); // Creating a hash based on the password submitted and the original salt
              if (hashedPassword === dbString) {
                
                // Set the session
                // set cookie with a session id
                // internally, on the server side, it maps the session id to an object
                // { auth: {userId }}
                req.session.auth = {userId: result.rows[0].id};
                res.status(200).send(JSON.stringify({"message":"Credentials Correct"}));
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send('You are logged out');
});

app.get('/check-login', function (req, res) {
   if (req.session && req.session.auth && req.session.auth.userId) {
       // Load the user object
       pool.query('SELECT * FROM "users" WHERE id = $1', [req.session.auth.userId], function (err, result) {
           if (err) {
              res.status(500).send(err.toString());
           } else {
              res.send(result.rows[0].username);    
           }
       });
   } else {
       res.status(400).send('You are not logged in');
   }
});


function htmlTemplate (object){
    var title=object.title;
    var heading=object.heading;
    var content=object.content;
    var template=`<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width , initial-scale=1">
        <link href="ui/style.css" rel="stylesheet"/>
    </head>
    <body>
        <div class=container>
            <div>
                <a href="/">HOME</a>
            </div>
            <hr/>
            <h2>${heading}</h2>
            ${content}
        </div>
    </body>
</html>
`;
return template;
}

app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
  
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname,'ui','main.js'));
});

app.get('/ui/madi.png',function(req,res){
    res.sendFile(path.join(__dirname,'ui','madi.png'));
});

app.get('/server.js',function(req,res){
    res.sendFile(path.join(__dirname,'server.js'));
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){
    var name=req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName',function(req,res){
    pool.query('SELECT * FROM articles WHERE title = $1',[req.params.articleName],function(err,result){
        if(err){
            res.status(500).send(err.toString());        
            
        }else{
            if(result.rows.length===0){
                res.status(404).send('Article not found');
            }else{
                var articleData=result.rows[0];
                res.send(htmlTemplate(articleData));
            }
        }
    });
});

app.get('/get-articles', function (req, res) {
   // make a select request
   // return a response with the results
   pool.query('SELECT * FROM article ORDER BY id DESC', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
});




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
