$(document).ready(function() {
    let form = document.querySelector(".my-form");
    form.addEventListener("submit", function (e) {
        //Получение данных ввода с html
        e.preventDefault() // This prevents the window from reloading
        let formdata = new FormData(this);
        let input_1 = formdata.get("data-text");
        let input_2 = formdata.get("iterations");
        //init
        net = new brain.recurrent.LSTM()
        //main let
        let mydata = JSON.parse(data);
        let length_json = Object.keys(mydata).length;
        let big_data =[];
        let key_input = 'input';
        let key_output = 'output';
        let counter = 0;
        
        //Получение данных из Json файла
        while (counter < length_json) {
            let obj = {};
            obj[key_input] = mydata[counter].input;
            obj[key_output] = mydata[counter].output;
            big_data.push(obj);
            counter++;
            console.log(obj);
        }
        
        //learning
        net.train(big_data, {
            iterations: input_2,
            log: details => console.log(details),
            errorThresh: 0.010
        });
        console.log(big_data);
        //Передача полученного значения
        output = net.run(input_1);

        //Output
        const myOutput = document.querySelector('#myOutput');
        myOutput.innerHTML = ("Ответ: " + output);
        console.log(output)
        console.log(input_2)
    });
});