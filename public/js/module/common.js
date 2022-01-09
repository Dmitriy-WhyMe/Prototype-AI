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
