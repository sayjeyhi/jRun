if(jRun){
    jRun.buildCalendars = function () {
        $(".jRCalendar").each(function () {
            var thisId = $(this).attr("id");
            var button = "date_" + thisId;
            Calendar.setup({
                inputField: thisId, // id of the input field
                button: button, // trigger for the calendar (button ID)
                ifFormat: "%Y/%m/%d", // format of the input field
                dateType: 'jalali',
                weekNumbers: false,
                langNumbers: false
            });
            $(this).not('.notClick').off('click').on("click", function () {
                $("#" + button).trigger("click");
            });
        });
    };
}