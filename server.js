const port = 5000;
const express = require('express');
const app = express();
const path = require("path");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/src', express.static(__dirname + '/src'));
// app.use('/js', express.static(__dirname + '/js'));

app.get('/',function(req,res){
     res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen( port, () => console.log('server listening on port ' + port ));