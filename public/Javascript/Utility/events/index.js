// some event listener on body
$('body')
    .on("keydown", "input.isnumber", function (t) {
        -1 !== $.inArray(t.keyCode, [46, 8, 9, 27, 13, 110, 190]) || 65 === t.keyCode && t.ctrlKey === !0 || 67 === t.keyCode && t.ctrlKey === !0 || 88 === t.keyCode && t.ctrlKey === !0 || t.keyCode >= 35 && t.keyCode <= 39 || (t.shiftKey || t.keyCode < 48 || t.keyCode > 57) && (t.keyCode < 96 || t.keyCode > 105) && t.preventDefault()
    })
    .on("blur", "input.isnumber", function () {
        $(this).prop("value", $(this).val().toEnDigit());
    })


    .on("blur", "input.hasPx", function () {
        if ($(this).val().indexOf("px") === -1)
            $(this).val($(this).val() + "px");
    })

    .on("focus", "input.hasPx", function () {
        if ($(this).val().indexOf("px") === -1)
            $(this).val($(this).val());
        else
            $(this).val($(this).val().replace(/px/g, ""));

        // select text in input
        this.select();
    })
    .on("keypress", "input.ispersian", function (t) {
        -1 !== $.inArray(t.keyCode, [46, 8, 9, 27, 13]) || (65 === t.charCode || 97 === t.charCode) && t.ctrlKey === !0 || t.keyCode >= 35 && t.keyCode <= 39 || -1 === $.inArray(String.fromCharCode(t.charCode), ["â€Œ", " ", "Ø¢", "Ø§", "Ø¨", "Ù¾", "Øª", "Ø«", "Ø¬", "Ú†", "Ø­", "Ø®", "Ø¯", "Ø°", "Ø±", "Ø²", "Ú˜", "Ø³", "Ø´", "Øµ", "Ø¶", "Ø·", "Ø¸", "Ø¹", "Øº", "Ù", "Ù‚", "Ú©", "Ú¯", "Ù„", "Ù…", "Ù†", "Ùˆ", "Ù‡", "ÛŒ", "ÙŠ", "Ùƒ", "Ø©"]) && t.preventDefault()
    })
    .off('input', '.number').on('input', '.number', function () {
        $(this).val($(this).val().trim().replace(/[^0-9]/g, ''));
    })
    .off('input', '.numberFloat').on('input', '.numberFloat', function () {
        $(this).val(jRun.numberFix4($(this).val().trim().replace(/[^0-9]/g, ''), 4));
    })
    .off('input', '.isDate').on('input', '.isDate', function () {
        $(this).val($(this).val().trim().replace(/[^0-9\/]/g, ''));
    });
