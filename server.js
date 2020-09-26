var http = require("http");
var mc = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectId;
http.createServer(function (req, res) {

    res.writeHead(200, {
        "Content-type":"application/JSON",
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT"
    });

    if(req.method.toLowerCase()=="post"){
    req.on('data',function(chunk){
     
         mc.connect("mongodb://localhost:27017",function(err,dbs){
                var dbo=dbs.db('raj');
                var co=dbo.collection('tasktodo');

                    co.insertOne(JSON.parse(chunk.toString()),function(err,res){
                    console.log(JSON.parse(chunk.toString()));
                })
                
             
               
         })
         res.write(chunk.toString());
         res.end();
        

        });
    }
     else if (req.method.toLowerCase()=="put") {
        req.on('data',function(chunk){
     
         mc.connect("mongodb://localhost:27017",function(err,dbs){
                var dbo=dbs.db('raj');
                var co=dbo.collection('tasktodo');

                var ss=JSON.parse(chunk.toString());
                    co.updateOne({_id:ObjectId(ss.id)},{$set:ss.set},function(err,res){
                    console.log(res.matchedCount)
                })
                
             
               
         })
    
         res.end(chunk.toString());
        

    });

     }
     else{
         mc.connect("mongodb://localhost:27017",function(err,dbs){
                    var dbo=dbs.db('raj');
                    var co=dbo.collection('tasktodo');

                        co.find().toArray(function(err,docx){
                        res.end(JSON.stringify(docx))
                    });
       
                 
                   
             })

       
       
     }

}).listen(8000); 
