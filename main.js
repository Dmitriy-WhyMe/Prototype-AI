let fs = require('fs');
let express = require('express');
let bodyParser = require('body-parser');
const brain = require('brain.js');

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
    let jsonData = fs.readFileSync('AI.json' , 'utf8');
    let all = jsonData.substring(0, jsonData.length-1)+', '+JSON.stringify(req.body)+"]";
    console.log(all);
    fs.writeFileSync('AI.json', all, function(error) {
        if(error) throw error;
        console.log("Асинхронная запись файла завершена.");
    });
    res.render('add');
});

app.use('/test_1', bodyParser.urlencoded({
    extended: true
}));

let length_json = Object.keys(jsObjectAi).length;
app.post('/test_1', urlencodeParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);
    console.log(req.body);
    let inner_text = req.body.data_text;
    let count_iterations = req.body.data_iterations;
    console.log(inner_text);
    console.log(count_iterations);
    net = new brain.recurrent.LSTM()
    let length_json = Object.keys(jsObjectAi).length;
    console.log(length_json);
    let big_data =[];
    let key_input = 'input';
    let key_output = 'output';
    let counter = 0;

    //Получение данных из Json файла
    while (counter < length_json) {
        let obj = {};
        obj[key_input] = jsObjectAi[counter].input;
        obj[key_output] = jsObjectAi[counter].output;
        big_data.push(obj);
        counter++;
        console.log(obj);
    }

    //learning
    net.train(big_data, {
        iterations: count_iterations,
        log: details => console.log(details),
        errorThresh: 0.010
    });
    console.log(big_data);
    
    //Передача полученного значения
    output = net.run(inner_text);

    //Output
    console.log(output)
    res.render('test_1', {length_json: length_json, output: output});
});

let output = " ";

//Server
app.listen(3000);
app.get('/', function (req, res) {
    res.render('test_1', {length_json: length_json, output: output});
});



app.get('/:name', function(req, res) {
    if(req.params.name === 'add') {
        res.render('add');
    } else if(req.params.name === 'view') {
        res.render('view', {data: jsObjectAi});
    } else if(req.params.name === 'test_1') {

        res.render('test_1', {length_json: length_json, output: output});
    } else {
        res.sendFile(__dirname + '/404.html');
    }  
});
