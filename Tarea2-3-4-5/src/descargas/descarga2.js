const express = require('express');
const serverless = require('serverless-http');
var path = require('path');
const app = express();

const router = express.Router();

router.get('/', (req, res) =>{
    res.sendfile('./src/descargas/index.html');
});

router.get('/descarga', (req, res) =>{
   res.download(path.join(process.cwd(), '/dist', 'archive.tar.gz')); //folder en el servidor con archivos
});

app.use('/.netlify/functions/descarga2',router);



module.exports.handler = serverless(app);







/*


var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
const serverless = require('serverless-http');
app.get('/asdfasd',function(req, res){
    res.sendfile('index.html');
    //res.sendFile(path.join(__dirname, '../../dist', 'archive.tar.gz'));
});
app.get('/descargasion', function(req, res){
    res.download(path.join(__dirname, '../../dist', 'archive.tar.gz')); //folder en el servidor con archivos
});
http.listen(3000, function(){
    console.log('escuchando a puerto 3000');
});


*/