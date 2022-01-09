const fs = require('fs');
let file = fs.readFileSync('AI.json', 'utf8');
let mydata = JSON.parse(file);
let length_json = Object.keys(mydata).length;
const learningCounter = document.querySelector('#learning-counter');
learningCounter.innerHTML = ("В данный момент в базе находится: " + length_json + " фраз");

(function ($) {
	$(document).ready(function () {
        //Materialize
        M.updateTextFields();
        $('input.autocomplete').autocomplete({
            data: {
                "Молодой": null,
                "Старый": null
            }
        });
        
	});
})(jQuery);
