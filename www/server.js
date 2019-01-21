var express = require('express');
var bodyParser=require('body-parser')
var app = express();
var fs=require('fs');
var dataPath="./data/";
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
    })    
app.use(bodyParser.json())
app.get('/', function (req, res) {
   res.send('Hello World');
})
app.get('/getIndex',function(req,res){
    fs.readFile("./data/db.json",(err,data)=>{
        if(err){
            res.send("there is an error in getting index");
        }
        else res.send(data);
    })
})
app.get('/getMd',(req,res)=>{
    console.log("a getMd request at "+new Date().toString()+" to find the file "+ req.query.title );
    var mdName=dataPath+req.query.title+".md";
    fs.readFile(mdName,(err,data)=>{
        if(err)res.send("Md not found");
        else {
            res.send(data);
            }
        })
})

app.post('/postIndex',(req,res)=>{
    let noteIndex=req.body;
    fs.writeFile("./data/db.json",JSON.stringify(noteIndex),(err)=>{
        if(err){
            console.log("write failed for: "+err);
        }
        else res.send("writeSuccessfull");
    })

})

app.get('/downloadMd',(req,res)=>{
    console.log("a downloadMd request at "+new Date().toString()+" to find the file "+ req.query.title );
    var mdName=req.query.title+".md";
   res.download(dataPath+mdName,mdName);
})

app.post('/postMd',(req,res)=>{
    let mdName=req.body.mdName+".md";
    let mdContent=req.body.mdContent;
    fs.writeFile("./data/"+mdName,mdContent,(err)=>{
         if(err){
            console.log("write failed for: "+err);
        }
        else res.send("MDwriteSuccessfull");
    })
})



app.post('/deleteMd',(req,res)=>{
    let mdName=req.body.mdName+".md";
    fs.unlink("./data/"+mdName,(err)=>{
        if(err)console.log(err);
        else res.send("detele successful");
    })
})
 
var server = app.listen(5000, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})