function prototype() {
    net = new brain.recurrent.LSTM()
    /*
    net.train([
        { input: '10 рублей', output: 'Бедный' },
        { input: '100 рублей', output: 'Бедный' },
        { input: '500 рублей', output: 'Бедный' },
        { input: '800 рублей', output: 'Бедный' },
        { input: '750 рублей', output: 'Бедный' },
        { input: '1000 рублей', output: 'Бедный' },
        { input: '1500 рублей', output: 'Богатый' },
        { input: '2000 рублей', output: 'Богатый' },
        { input: '2500 рублей', output: 'Богатый' },
        { input: '3000 рублей', output: 'Богатый' },
        { input: '3500 рублей', output: 'Богатый' },
        { input: '4000 рублей', output: 'Богатый' },
        { input: '4500 рублей', output: 'Богатый' },
        { input: '5000 рублей', output: 'Богатый' },
        { input: '6000 рублей', output: 'Богатый' },
        { input: '7000 рублей', output: 'Богатый' },
        { input: '8000 рублей', output: 'Богатый' },
        { input: '9000 рублей', output: 'Богатый' },
        { input: '10000 рублей', output: 'Богатый' },
    ], {
      iterations: 1500,
      log: details => console.log(details),
      errorThresh: 0.011
    });*/
    
    let mydata = JSON.parse(data);
    let length_json = Object.keys(mydata).length;
    let big_data =[];
    let key_input = 'input';
    let key_output = 'output';
    let counter = 0;

    while (counter < length_json) {
        let obj = {};
        obj[key_input] = mydata[counter].input;
        obj[key_output] = mydata[counter].output;
        big_data.push(obj);
        counter++;
        console.log(obj);
    }

    net.train(big_data, {
        iterations: 500,
        log: details => console.log(details),
        errorThresh: 0.011
    });
    console.log(big_data);

    output = net.run('700 Рублей');
    const myOutput = document.querySelector('#myOutput');
    myOutput.innerHTML = ("Ответ: " + output);
    
    console.log(output)
}
  
prototype();