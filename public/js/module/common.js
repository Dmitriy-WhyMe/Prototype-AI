(function ($) {
	$(document).ready(function () {
        M.updateTextFields();
        $('input.autocomplete').autocomplete({
            data: {
                "Молодой": null,
                "Старый": null
            },
        });
	});
})(jQuery);