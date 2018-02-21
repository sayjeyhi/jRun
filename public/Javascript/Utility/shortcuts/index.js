if(jRun){
    jRun.buildShortcuts = function () {


        $('[data-shortcut]').each(function () {
            $(this).not(".noTitle").attr("rel", "tooltipOff").attr("title", $(this).attr("data-shortcut"));
        });
        $('[data-shortcutSingle]').each(function () {
            $(this).not(".noTitle").attr("rel", "tooltipOff").attr("title", $(this).attr("data-shortcutSingle"));
        });


        // show/hide tooltip
        $('body')

        // shortcut key handler
            .on("keypress", function (e) {

                // if user is typing on input,textarea do not check shortcut
                // if($(e.target).is("input textarea")){
                //     return false;
                // }

                var $subset = $('body');

                // if ajax active do not check shortcut
                if (!jRun.activeAjaxFlag) {
                    var flagMultiShortcutFire = false;
                    $('[data-shortcut]', $subset).each(function () {
                        if (($(this).is(":visible") || $(this).hasClass("godShortcut")) && jRun.isKey($(this).attr("data-shortcut"), e, "multi")) {
                            var mode = $(this).attr("data-shortcutMode") || "click";
                            $(this).trigger(mode);
                            flagMultiShortcutFire = true;
                            return false;
                        }
                    });
                    if (!flagMultiShortcutFire) {
                        $('[data-shortcutSingle]', $subset).each(function () {
                            if (($(this).is(":visible") || $(this).hasClass("godShortcut")) && jRun.isKey($(this).attr("data-shortcutSingle"), e)) {
                                var mode = $(this).attr("data-shortcutMode") || "click";
                                $(this).trigger(mode);
                                return false;
                            }
                        });
                    }
                } else {
                    // do not let regular operation
                    e.preventDefault();
                }
            })

            .off("ifChecked", "#showTooltip").on("ifChecked", "#showTooltip", function () {

            $('[rel="tooltipOff"]').attr("rel", "tooltip").prop("rel", "tooltip").addClass("wasTooltipOff");
            $('body').tooltip({
                selector: '[rel="tooltip"]'
            });
            jRun.setCookie("showTooltipOnHover", 1);
        })

            .off("ifUnchecked", "#showTooltip").on("ifUnchecked", "#showTooltip", function () {
            $('.wasTooltipOff[rel="tooltip"]').attr("rel", "tooltipOff").removeClass("wasTooltipOff");
            jRun.setCookie("showTooltipOnHover", 0);
        });

        if (jRun.getCookie("showTooltipOnHover") == 1) {

            $('#showTooltip').prop("checked", true).val(1).trigger("ifChecked").iCheck("update");
        }
    };

    jRun.isKey = function (key, e, mode) {

        key = key.indexOf("+") > -1 ? key.split("+") : [key];
        var keyLength = key.length;
        var response = "";

        // if single and control keys pressed
        if (mode == "single" && (e.ctrlKey || e.shiftKey || e.altKey)) {
            return false;
        }

        for (var i = 0; i < keyLength; i++) {
            switch (key[i]) {
                case "ctrl":
                    response += (e.ctrlKey) ? "1" : "0";
                    break;
                case "shift":
                    response += (e.shiftKey) ? "1" : "0";
                    break;
                case "alt":
                    response += (e.altKey) ? "1" : "0";
                    break;
                case "enter":
                    response += (e.keyCode == 13) ? "1" : "0";
                    break;
                case "esc":
                    response += (e.keyCode == 27 || e.key == "Escape") ? "1" : "0";
                    break;
                case "space":
                    response += (e.charCode == 32 || e.which == 32) ? "1" : "0";
                    break;
                case "0":
                    response += (e.charCode == 48 || e.key == "0") ? "1" : "0";
                    break;
                case "1":
                    response += (e.charCode == 49 || e.key == "1") ? "1" : "0";
                    break;
                case "2":
                    response += (e.charCode == 50 || e.key == "2") ? "1" : "0";
                    break;
                case "3":
                    response += (e.charCode == 51 || e.key == "3") ? "1" : "0";
                    break;
                case "4":
                    response += (e.charCode == 52 || e.key == "4") ? "1" : "0";
                    break;
                case "5":
                    response += (e.charCode == 53 || e.key == "5") ? "1" : "0";
                    break;
                case "6":
                    response += (e.charCode == 54 || e.key == "6") ? "1" : "0";
                    break;
                case "7":
                    response += (e.charCode == 55 || e.key == "7") ? "1" : "0";
                    break;
                case "8":
                    response += (e.charCode == 56 || e.key == "8") ? "1" : "0";
                    break;
                case "9":
                    response += (e.charCode == 57 || e.key == "9") ? "1" : "0";
                    break;
                case "f1":
                    response += (e.keyCode == 112 || e.key == "F1") ? "1" : "0";
                    break;
                case "f2":
                    response += (e.keyCode == 113 || e.key == "F2") ? "1" : "0";
                    break;
                case "f3":
                    response += (e.keyCode == 114 || e.key == "F3") ? "1" : "0";
                    break;
                case "f4":
                    response += (e.keyCode == 115 || e.key == "F4") ? "1" : "0";
                    break;
                case "f5":
                    response += (e.keyCode == 116 || e.key == "F5") ? "1" : "0";
                    break;
                case "f6":
                    response += (e.keyCode == 117 || e.key == "F6") ? "1" : "0";
                    break;
                case "f7":
                    response += (e.keyCode == 118 || e.key == "F7") ? "1" : "0";
                    break;
                case "f8":
                    response += (e.keyCode == 119 || e.key == "F8") ? "1" : "0";
                    break;
                case "f9":
                    response += (e.keyCode == 120 || e.key == "F9") ? "1" : "0";
                    break;
                case "f10":
                    response += (e.keyCode == 121 || e.key == "F10") ? "1" : "0";
                    break;
                case "f11":
                    response += (e.keyCode == 122 || e.key == "F11") ? "1" : "0";
                    break;
                case "f12":
                    response += (e.keyCode == 123 || e.key == "F12") ? "1" : "0";
                    break;
                case "tab":
                    response += (e.keyCode == 9 || e.key == "Tab") ? "1" : "0";
                    break;
                case "insert":
                    response += (e.keyCode == 45 || e.key == "Insert") ? "1" : "0";
                    break;
                case "delete":
                    response += (e.keyCode == 46 || e.key == "Delete") ? "1" : "0";
                    break;

                // letter big and small
                case "a":
                    response += (e.charCode == 97 || e.charCode == 65) ? "1" : "0";
                    break;
                case "b":
                    response += (e.charCode == 98 || e.charCode == 66) ? "1" : "0";
                    break;
                case "c":
                    response += (e.charCode == 99 || e.charCode == 67) ? "1" : "0";
                    break;
                case "d":
                    response += (e.charCode == 100 || e.charCode == 68) ? "1" : "0";
                    break;
                case "e":
                    response += (e.charCode == 101 || e.charCode == 69) ? "1" : "0";
                    break;
                case "f":
                    response += (e.charCode == 102 || e.charCode == 70) ? "1" : "0";
                    break;
                case "g":
                    response += (e.charCode == 103 || e.charCode == 71) ? "1" : "0";
                    break;
                case "h":
                    response += (e.charCode == 104 || e.charCode == 72) ? "1" : "0";
                    break;
                case "i":
                    response += (e.charCode == 105 || e.charCode == 73) ? "1" : "0";
                    break;
                case "j":
                    response += (e.charCode == 106 || e.charCode == 74) ? "1" : "0";
                    break;
                case "k":
                    response += (e.charCode == 107 || e.charCode == 75) ? "1" : "0";
                    break;
                case "l":
                    response += (e.charCode == 108 || e.charCode == 76) ? "1" : "0";
                    break;
                case "m":
                    response += (e.charCode == 109 || e.charCode == 77) ? "1" : "0";
                    break;
                case "n":
                    response += (e.charCode == 110 || e.charCode == 78) ? "1" : "0";
                    break;
                case "o":
                    response += (e.charCode == 111 || e.charCode == 79) ? "1" : "0";
                    break;
                case "p":
                    response += (e.charCode == 112 || e.charCode == 80) ? "1" : "0";
                    break;
                case "q":
                    response += (e.charCode == 113 || e.charCode == 81) ? "1" : "0";
                    break;
                case "r":
                    response += (e.charCode == 114 || e.charCode == 82) ? "1" : "0";
                    break;
                case "s":
                    response += (e.charCode == 115 || e.charCode == 83) ? "1" : "0";
                    break;
                case "t":
                    response += (e.charCode == 116 || e.charCode == 84) ? "1" : "0";
                    break;
                case "u":
                    response += (e.charCode == 117 || e.charCode == 85) ? "1" : "0";
                    break;
                case "v":
                    response += (e.charCode == 118 || e.charCode == 86) ? "1" : "0";
                    break;
                case "w":
                    response += (e.charCode == 119 || e.charCode == 87) ? "1" : "0";
                    break;
                case "x":
                    response += (e.charCode == 120 || e.charCode == 88) ? "1" : "0";
                    break;
                case "y":
                    response += (e.charCode == 121 || e.charCode == 89) ? "1" : "0";
                    break;
                case "z":
                    response += (e.charCode == 122 || e.charCode == 90) ? "1" : "0";
                    break;


            }
        }


        var responseFlag = response.indexOf("0") === -1;
        if (responseFlag) {
            e.preventDefault();
        }
        return responseFlag;
    };

}