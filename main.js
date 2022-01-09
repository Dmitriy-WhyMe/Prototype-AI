let fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
let urlencodeParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

//Readin is file
let file = fs.readFileSync('AI.json', 'utf8');
let jsObjectAi = JSON.parse(file);


//Form
app.post('/add', urlencodeParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    let jsonData = fs.readFileSync('AI.json' , 'utf8');
    let all = jsonData.substring(0, jsonData.length-1)+', '+JSON.stringify(req.body)+"]";
    console.log(all);
    fs.writeFileSync('AI.json', all, function(error) {
        if(error) throw error;
        console.log("Асинхронная запись файла завершена.");
    });
    res.render('add');
});


//Server
app.listen(3000);
var myVar = 1;
app.get('/', function (req, res) {
    res.render('test_1', {data: jsObjectAi});
});

app.get('/:name', function(req, res) {
    if(req.params.name === 'add') {
        res.render('add');
    } else if(req.params.name === 'view') {
        res.render('view', {data: jsObjectAi});
    } else if(req.params.name === 'test_1') {
        res.render('test_1', {data: jsObjectAi});
    } else {
        res.sendFile(__dirname + '/404.html');
    }  
});
