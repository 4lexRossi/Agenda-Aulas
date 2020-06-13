
const express = require('express');
const path = require('path');

const app = express();


app.use(express.static(__dirname + '/dist/Estudantes'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/Estudantes/index.html'));
});

// Inicia a aplicação pela porta configurada
app.listen(process.env.PORT || 8080);
