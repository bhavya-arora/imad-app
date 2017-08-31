var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user:'gobhavyaarora15',
    database:'gobhavyaarora15',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();

var pool=new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
            
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

var article={
    'article-one':{
        title:'Article One',
        heading:'Article One',
        content:` <p>
                This is my article one.This is my article one.This is my article one.This is my article one.This is my article one.
                This is my article one.This is my article one.This is my article one.This is my article one.This is my article one.
                This is my article one.This is my article one.This is my article one.This is my article one.This is my article one.
            </p>
            <p>
                This is my article one.This is my article one.This is my article one.This is my article one.This is my article one.
                This is my article one.This is my article one.This is my article one.This is my article one.This is my article one.
                This is my article one.This is my article one.This is my article one.This is my article one.This is my article one.
            </p>
            <p>
                This is my article one.This is my article one.This is my article one.This is my article one.This is my article one.
                This is my article one.This is my article one.This is my article one.This is my article one.This is my article one.
                This is my article one.This is my article one.This is my article one.This is my article one.This is my article one.
            </p>`
    },
    'article-two':{
        title:'Article Two',
        heading:'Article Two',
        content:`<p>
                This is my article two.This is my article two.This is my article two.This is my article two.This is my article two.
                This is my article two.This is my article two.This is my article two.This is my article two.This is my article two.
                This is my article two.This is my article two.This is my article two.This is my article two.This is my article two.
            </p>
             <p>
                This is my article two.This is my article two.This is my article two.This is my article two.This is my article two.
                This is my article two.This is my article two.This is my article two.This is my article two.This is my article two.
                This is my article two.This is my article two.This is my article two.This is my article two.This is my article two.
            </p>
             <p>
                This is my article two.This is my article two.This is my article two.This is my article two.This is my article two.
                This is my article two.This is my article two.This is my article two.This is my article two.This is my article two.
                This is my article two.This is my article two.This is my article two.This is my article two.This is my article two.
            </p>`
        
    },
    'article-three':{
        title:'Article Three',
        heading:'Article Three',
        content:`<p>
                This is my third article.This is my third article.This is my third article.This is my third article.This is my third article.
                This is my third article.This is my third article.This is my third article.This is my third article.This is my third article.
                This is my third article.This is my third article.This is my third article.This is my third article.This is my third article.
            </p>
            <p>
                This is my third article.This is my third article.This is my third article.This is my third article.This is my third article.
                This is my third article.This is my third article.This is my third article.This is my third article.This is my third article.
                This is my third article.This is my third article.This is my third article.This is my third article.This is my third article.
            </p>
            <p>
                This is my third article.This is my third article.This is my third article.This is my third article.This is my third article.
                This is my third article.This is my third article.This is my third article.This is my third article.This is my third article.
                This is my third article.This is my third article.This is my third article.This is my third article.This is my third article.
            </p>`
    }
};

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

app.get('/articles/ui/style.css', function (req, res) {
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

app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(htmlTemplate(article[articleName]));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
