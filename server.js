const port = 5000;
const express = require('express');
const app = express();
const path = require("path");
const compression = require('compression');

app.use(compression({filter: shouldCompress}));

app.use('/src', express.static(__dirname + '/src'));
app.use('/dist', express.static(__dirname + '/dist'));
app.get('/',function(req,res){
     res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen( port, () => console.log('server listening on port ' + port ));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) return false;
  else return compression.filter(req, res);
};