/**
 * Main JavaScript file to manage pages js
 *
 * @author   : Joseph [Rezaei]
 * @updated : 2018/02/09
 * @type {{version: string, activeAjaxFlag: boolean, validators: Array, tables: {}, initialize: jRun.initialize, build: jRun.build, buildShortcuts: jRun.buildShortcuts, buildAjax: jRun.buildAjax, buildValidator: jRun.buildValidator, buildCalendars: jRun.buildCalendars, addTableDefaults: jRun.addTableDefaults, buildDataTable: jRun.buildDataTable, destroyValidators: jRun.destroyValidators, handleTheme: jRun.handleTheme, setThemeStyle: jRun.setThemeStyle, getRandom: jRun.getRandom, getTime: jRun.getTime, getPersianDate: jRun.getPersianDate, format_size: jRun.format_size, msago: jRun.msago, showNotification: jRun.showNotification, shake: jRun.shake, transform: jRun.transform, numberFix4: jRun.numberFix4, findMaximum: jRun.findMaximum, isKey: jRun.isKey, setCookie: jRun.setCookie, getCookie: jRun.getCookie, seprateDateTime: jRun.seprateDateTime, copyArray: jRun.copyArray, getAttributes: jRun.getAttributes, setFajaxGlobalReport: jRun.setFajaxGlobalReport, init: jRun.init}}
 */
var jRun = {

    version: "0.1.08",
    activeAjaxFlag: false,
    validators: [],
    tables: {},

    initialize: function () {


        // convert english digits to persian digits
        String.prototype.toFaDigit = function () {
            return this.replace(/\d+/g, function (digit) {
                var ret = "";
                var i;
                for (i = 0; i < digit.length; i += 1) {
                    ret += String.fromCharCode(digit.charCodeAt(i) + 1728);
                }
                return ret;
            });
        };


        // convert persian digits to english digits
        String.prototype.toEnDigit = function () {
            return this.replace(/[\u06F0-\u06F9]+/g, function (digit) {
                var ret = "";
                var i;
                for (i = 0; i < digit.length; i += 1) {
                    ret += String.fromCharCode(digit.charCodeAt(i) - 1728);
                }
                return ret;
            });
        };


        j(document).ready(function () {

            // set predefined values to data table
            jRun.addTableDefaults();

            // handles style customer tool
            jRun.handleTheme();

            Metronic.init(); // init metronic core componets
            Layout.init(); // init layout


            // handle layout style change
            $('.theme-panel .layout-style-option').change(function () {
                jRun.setThemeStyle($(this).val());
            });

            // set layout style from cookie
            if ($.cookie && $.cookie('layout-style-option') === 'rounded') {
                jRun.setThemeStyle($.cookie('layout-style-option'));
                $('.theme-panel .layout-style-option').val($.cookie('layout-style-option'));
            }

            $('.dashboard-invisible').removeClass('dashboard-invisible');


            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if (msie > 0) { // If Internet Explorer
                jRun.showNotification("کاربر گرامی، لطفاً جهت مشاهدۀ درست سایت، از مرورگرهای مدرن مانند  Firefox و Chrome استفاده نمایید.");
            }

        }).ajaxStart(function () {

            // set ajax flag true
            jRun.activeAjaxFlag = true;

        }).ajaxComplete(function () {

            // set ajax flag false
            jRun.activeAjaxFlag = false;

            // tooltip should added last
            $('body').tooltip({
                selector: '[rel="tooltip"]'
            }).trigger("completed.joseph.pageAjax");
        });

    },

    build: function (firstRun = 0) {

        if (firstRun == 1) {
            jRun.initialize();
        }

        $(document).ready(function () {


            $('[data-timeAgo]').each(function () {
                $(this).html(jRun.msago($(this).attr("data-timeAgo")));
            });
            $('[data-shortcut]').each(function () {
                $(this).not(".noTitle").attr("rel", "tooltipOff").attr("title", $(this).attr("data-shortcut"));
            });
            $('[data-shortcutSingle]').each(function () {
                $(this).not(".noTitle").attr("rel", "tooltipOff").attr("title", $(this).attr("data-shortcutSingle"));
            });


            // some event listener on body
            $('body')
                .on("keydown", "input.isnumber", function (t) {
                    -1 !== $.inArray(t.keyCode, [46, 8, 9, 27, 13, 110, 190]) || 65 == t.keyCode && t.ctrlKey === !0 || 67 == t.keyCode && t.ctrlKey === !0 || 88 == t.keyCode && t.ctrlKey === !0 || t.keyCode >= 35 && t.keyCode <= 39 || (t.shiftKey || t.keyCode < 48 || t.keyCode > 57) && (t.keyCode < 96 || t.keyCode > 105) && t.preventDefault()
                })
                .on("blur", "input.isnumber", function () {
                    $(this).prop("value", $(this).val().toEnDigit());
                })


                .on("blur", "input.hasPx", function () {
                    if ($(this).val().indexOf("px") == -1)
                        $(this).val($(this).val() + "px");
                })

                .on("focus", "input.hasPx", function () {
                    if ($(this).val().indexOf("px") == -1)
                        $(this).val($(this).val());
                    else
                        $(this).val($(this).val().replace(/px/g, ""));

                    // select text in input
                    this.select();
                })
                .on("keypress", "input.ispersian", function (t) {
                    -1 !== $.inArray(t.keyCode, [46, 8, 9, 27, 13]) || (65 == t.charCode || 97 == t.charCode) && t.ctrlKey === !0 || t.keyCode >= 35 && t.keyCode <= 39 || -1 == $.inArray(String.fromCharCode(t.charCode), ["â€Œ", " ", "Ø¢", "Ø§", "Ø¨", "Ù¾", "Øª", "Ø«", "Ø¬", "Ú†", "Ø­", "Ø®", "Ø¯", "Ø°", "Ø±", "Ø²", "Ú˜", "Ø³", "Ø´", "Øµ", "Ø¶", "Ø·", "Ø¸", "Ø¹", "Øº", "Ù", "Ù‚", "Ú©", "Ú¯", "Ù„", "Ù…", "Ù†", "Ùˆ", "Ù‡", "ÛŒ", "ÙŠ", "Ùƒ", "Ø©"]) && t.preventDefault()
                })
                .off('input', '.number').on('input', '.number', function () {
                $(this).val($(this).val().trim().replace(/[^0-9]/g, ''));
            })
                .off('input', '.numberFloat').on('input', '.numberFloat', function () {
                $(this).val(jRun.numberFix4($(this).val().trim().replace(/[^0-9]/g, ''), 4));
            })
                .off('input', '.isDate').on('input', '.isDate', function () {
                $(this).val($(this).val().trim().replace(/[^0-9\/]/g, ''));
            })

            // show another parts when a check box fire
            // to make reverse use data-showOnCheck="true"
                .off('change', ".controllParts").on('change', ".controllParts", function (e) {
                var parts = $(this).attr("data-partkey");           //  class
                var showOnCheck = $(this).attr("data-showOnCheck") ? true : false;
                var $parts = $('.' + parts);
                $parts.prop('disabled', (showOnCheck == false) ? e.target.checked : !e.target.checked);
                if (e.target.checked && !showOnCheck)$parts.attr('value', '');
                if (!e.target.checked && showOnCheck)$parts.attr('value', '');
            })
                .off('ifChecked', ".controllParts").on('ifChecked', ".controllParts", function () {
                var $this = $(this);

                // hide/show parts
                $($this.attr("data-hide")).hide();
                $($this.attr("data-show")).show();

                // disable/enable parts
                $($this.attr("data-disable")).addClass('disabled').prop("disabled", true);
                $($this.attr("data-unDisable")).removeClass('disabled').prop("disabled", false);

            })
                .off('ifUnchecked', ".controllParts").on('ifUnchecked', ".controllParts", function () {
                var $this = $(this);

                // hide/show parts
                $($this.attr("data-hide")).show();
                $($this.attr("data-show")).hide();

                // disable/enable parts
                $($this.attr("data-disable")).removeClass('disabled').prop("disabled", false);
                $($this.attr("data-unDisable")).addClass('disabled').prop("disabled", true);
            })

            // log handle
                .off('hidden.bs.modal', '.addThisToLog').on('hidden.bs.modal', '.addThisToLog', function () {

                var _this = $(this);
                _this.trigger("hidden.joseph.modal");

                var kind = _this.attr('data-kind');
                var message = _this.attr('data-message');
                var code = _this.attr('data-code') || 15;
                $.ajax({
                    type: 'POST',
                    data: {
                        kind: kind,
                        message: message,
                        code: code
                    },
                    url: '/rest/log',
                    success: function (responseText) {
                        // some fn after log
                    }
                });

            }).on('shown.bs.modal', '.addThisToLog', function () {

                var _this = $(this);
                _this.trigger("shown.joseph.modal");

                var kind = _this.attr('data-kind');
                var message = _this.attr('data-message');
                var code = _this.attr('data-code') || 14;
                $.ajax({
                    type: 'POST',
                    data: {
                        kind: kind,
                        message: message,
                        code: code
                    },
                    url: '/rest/log'
                });
            })

            // tooltip fire here too
                .tooltip({
                    selector: '[rel="tooltip"]'
                });

            // add shortcuts
            jRun.buildShortcuts();

            // main ajax form bundle
            jRun.buildAjax();

            // build validators with TrValidator
            jRun.buildValidator();

            // build calendars with class torfe calendar
            jRun.buildCalendars();

            // build our data tables with TrTable
            //jRun.buildDataTables();


            $('.icheck').iCheck({
                checkboxClass: 'icheckbox_square-grey',
                radioClass: 'iradio_square-grey'
            });


        }).load(function () {

            // tooltip should added last
            $('body').tooltip({
                selector: '[rel="tooltip"]'
            });
        });

    },

    buildShortcuts: function () {


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
    },

    buildAjax: function () {

        $("form.TrAjax").each(function () {
            var a = $(this);
            var t = !1;

            // check if validation added
            a.off("submit.ajax").on("submit.ajax", function (e) {
                e.preventDefault();
                if (!t) {
                    var n = a.serialize();
                    var route = a.attr("data-route") || "";
                    var completedFn = a.attr("data-completedFn");
                    var useBlock = a.attr("data-useBlock") || 0;
                    t = !0;
                    $.ajax({
                        type: a.attr("method"),
                        data: n + "&d=" + Math.floor(999999999 * Math.random() + 1),
                        url: a.attr("action"),
                        xhrFields: {
                            withCredentials: true
                        },
                        beforeSend: function () {
                            if (useBlock !== 0) {
                                Metronic.blockUI({
                                    target: useBlock,
                                    boxed: true,
                                    animate: true
                                });
                            } else {
                                $("button.close").click();
                                jRun.showNotification('<i class="fa fa-cog fa-spin ml5" style="font-size:16px;margin-bottom:-2px;"></i>در حال اجرای درخواست ...', 15000, '');
                            }
                        },
                        success: function (e) {
                            t = !1;

                            try {
                                e = JSON.parse(e);
                            } catch (error) {
                                console.log(e);
                                console.log(error);
                            }

                            if (e.message == "ok" || e.result == 'true' || e.error == '') {

                                var message = (e.message && e.message !== "ok" && e.message !== "") ? e.message : "عملیات با موفقیت انجام شد";
                                if (useBlock !== 0) {

                                    Metronic.blockUI({
                                        target: useBlock,
                                        boxed: true,
                                        textOnly: true,
                                        message: message
                                    });
                                    setTimeout(function () {
                                        Metronic.unblockUI(useBlock);
                                        $(".overlowLoading").hide();
                                    }, 500);

                                } else {
                                    $("button.close").click();

                                    // add ... to message to say page is redirecting
                                    jRun.showNotification(message + "...", 1500, "check");
                                }


                                if (route.length > 0) {
                                    window.location = siteUrl + route;
                                }

                                if (completedFn != undefined) {
                                    var func = new Function(completedFn);
                                    if (typeof func === "function") {
                                        func();
                                    }
                                }


                            } else {
                                if (useBlock !== 0) {
                                    Metronic.blockUI({
                                        target: useBlock,
                                        boxed: true,
                                        textOnly: true,
                                        message: 'خطا ، پیام :‌ ' + (e.message || e.error)
                                    });
                                    setTimeout(function () {
                                        Metronic.unblockUI(useBlock);
                                        $(".overlowLoading").hide();
                                    }, 1500);
                                } else {
                                    $("button.close").click();
                                    jRun.showNotification('<i class="fa fa-warn ml5" style="font-size:16px;margin-bottom:-2px;"></i> خطا ، پیام :‌ ' + (e.message || e.error), 1500, 'warning', 'danger');
                                }
                            }
                        },
                        error: function () {

                            if (useBlock !== 0) {
                                Metronic.blockUI({
                                    target: useBlock,
                                    boxed: true,
                                    textOnly: true,
                                    message: ' خطا در اجرا !'
                                });
                                setTimeout(function () {
                                    Metronic.unblockUI(useBlock);
                                    $(".overlowLoading").hide();
                                }, 1500);
                            } else {
                                $("button.close").click();
                                jRun.showNotification('<i class="fa fa-warn ml5" style="font-size:16px;margin-bottom:-2px;"></i> خطا در اجرا !', 1500, 'warning', 'danger');
                            }
                        },
                        complete: function () {
                            a.trigger("completed.joseph.ajax");
                            jRun.buildValidator();
                        },
                        timeout: 25000
                    })
                }
            })
        });
    },


    buildValidator: function () {


        // destroy old validators
        jRun.destroyValidators();

        // validator for jRun
        $("form.TrValidate").each(function () {

            var $form = $(this);
            var rules = {};
            var messages = {};

            // get all validate rules
            $form.find("[class*=tv-]").each(function () {


                var $input = $(this);


                var id = $input.attr("id") || 0;
                if (id == 0) {
                    id = "validator_" + jRun.getRandom(10000);
                    $input.attr("id", id);
                }


                // get class list
                var classList = $input.attr("class");
                classList = classList.split(" ");


                var thisProperty = {};
                var thisMessage = {};
                for (var i = 0; i < classList.length; i++) {
                    // get validator classes
                    if (classList[i].indexOf("tv-") > -1) {

                        var rule = classList[i].substr(3);

                        ruleData = $input.attr("data-" + rule);


                        if (ruleData !== undefined) {
                            if (ruleData.indexOf('return') > -1) {
                                var func = new Function(ruleData);
                                thisProperty[rule] = func();
                            } else {
                                thisProperty[rule] = ruleData;
                            }
                        } else {
                            thisProperty[rule] = true;
                        }

                        // get message
                        var message = $input.attr("data-msg-" + rule) || "";
                        if (message !== "")
                            thisMessage[rule] = message;
                    }
                }
                rules[id] = thisProperty;
                messages[id] = thisMessage;
            });

            var validator = $form.off("submit.ajax").validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: true, // false: do not focus the last invalid input
                rules: rules,
                messages: messages,
                highlight: function (element) { // hightlight error inputs
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
                },
                unhighlight: function (element) {
                    $(element).closest('.form-group').removeClass('has-error');
                },
                success: function (label) {
                    label.closest('.form-group').removeClass('has-error').addClass('has-success');
                    label.remove();
                },

                errorPlacement: function (error, element) {
                    error.insertAfter(element.closest('.form-control:not(.isDate)'));
                    error.insertAfter(element.closest('.isDate').parent());
                },
                submitHandler: function () {
                    $form.off("submit");
                    jRun.buildAjax();
                    $form.trigger("submit.ajax");
                }
            });

            validator.resetForm();
            jRun.validators.push(validator);

        });
    },


    buildCalendars: function () {
        $(".torfeCalendar").each(function () {
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
    },


    addTableDefaults: function(){
        // set predefined values to data table
        $.extend(true, $.fn.dataTable.defaults, {
            "language": {
                "oAria": {
                    "sSortAscending": ": مرتب سازي صعودي",
                    "sSortDescending": ": مرتب سازي نزولي"
                },
                "paginate": {
                    "first": "اولین",
                    "last": "آخرین",
                    "next": "بعدی",
                    "previous": "قبلی"
                },
                "sEmptyTable": "داده ای برای نمایش یافت نشد .",
                "sInfo": "نمایش سطر _START_ تا _END_ از مجموع _TOTAL_ سطر",
                "sInfoEmpty": "سطری برای نمایش وجود ندارد",
                "sInfoFiltered": "[فیلتر شده از  _MAX_ سطر ]",
                "sLoadingRecords": "بارگذاری ...",
                "sProcessing": "پردازش ...",
                "sSearch": "جستجو:",
                "sZeroRecords": "هیچ داده ای با مقادیر فیلتر مطابقت ندارد",
                "sLengthMenu": "نمایش _MENU_ سطر"
            },
            columnDefs: [
                {targets: 'no-sort', orderable: false}
            ]
        });
        $.fn.dataTable.ext.errMode = 'function';
    },


    /**
     * Data table builder [beta version]
     */
    buildDataTable: function (tableObj = null) {

        // set default things about table
        jRun.addTableDefaults();

        var $selector = $("table.TrTable");
        if(tableObj !== null){
            $selector = tableObj;
        }


        // data table with class torfe
        $selector.each(function () {
            var table = $(this);

            var id = table.attr("id") || 0;
            if (id == 0) {
                id = "table_" + jRun.getRandom(10000);
                table.attr("id", id);
            }



            // default options
            var options = {
                "dom": "<'col-md-12 col-sm-12'>t<'row'<'col-md-12 col-sm-12'p>>",
                "bStateSave": false,
                "bDeferRender": false,
                "bAutoWidth": false,
                "paging": true,
                "searching": true,
                "pageLength": 12,
                "ordering": true,
                "bFilter": true,
                "data": $(this).attr("data-data"),
                "createdRow": function (row) {

                },
                "pagingType": "full_numbers",
                "aaSorting": []   // default sort by no column
            };

            // attributes
            var Attributes = jRun.getAttributes(table[0] , "data-tt-");


            // set type of option to DataTable
            for(var attr in Attributes){
                var correctAttr = attr.substr(8,attr.length - 8).split("-");
                correctAttr[0] = correctAttr[0].replace("*" , ".");
                switch (correctAttr[1]){
                    case "fn":
                    case "function":
                        options[correctAttr[0]] = new Function("return " + Attributes[attr])();
                        break;
                    case "arr":
                    case "array":
                        options[correctAttr[0]] = Attributes[attr].split(",");
                        break;
                    case "int":
                    case "integer":
                    case "number":
                    case "num":
                        options[correctAttr[0]] = parseInt(Attributes[attr] == "true");
                        break;
                    case "bool":
                    case "boolean":
                        options[correctAttr[0]] = (Attributes[attr] == "true");
                        break;
                    case "var":
                    case "variable":
                        options[correctAttr[0]] = window[Attributes[attr]];
                        break;
                    case "obj":
                    case "object":
                        options[correctAttr[0]] = new Object(Attributes[attr]);
                        break;
                    default:
                        options[correctAttr[0]] = Attributes[attr];
                        break;
                }
            }

            // remove optional attributes
            jRun.removeAttributes(table[0] , Attributes);


            // save table name
            jRun.tables[id] = table.dataTable(options);


            // add custom search
            table
                .api()
                .search("")
                .draw();

            $(table.attr("data-search"))
                .val('')
                .keyup(function () {
                    table
                        .api()
                        .search($(this).val())
                        .draw();
                });

            log(options);

            return jRun.tables[id];
        });
    },

    destroyDataTable: function (id) {

        // table selected
        var table = $( '#' + id );

        // remove table if it is defined already
        if($.fn.DataTable.isDataTable( '#' + id ) ) {

            // restart attributes
            jRun.removeAttributes(table[0] , null , "data-tt-");

            // destroy table
            jRun.tables[id].api().destroy();
            table.empty();
        }

    },

    destroyValidators: function () {
        for (var i = 0; i < jRun.validators.length; i++) {
            try {

                jRun.validators[i].resetForm();
                jRun.validators[i].destroy();

                // remove from array
                jRun.validators.splice(i, 1);

            } catch (error) {
                log(error);
            }
        }
    },


    // Handle Theme Settings
    handleTheme: function () {

        var panel = $('.theme-panel');

        if ($('body').hasClass('page-boxed') === false) {
            $('.layout-option', panel).val("fluid");
        }

        $('.sidebar-option', panel).val("default");
        $('.page-header-option', panel).val("fixed");
        $('.page-footer-option', panel).val("default");
        if ($('.sidebar-pos-option').attr("disabled") === false) {
            $('.sidebar-pos-option', panel).val(Metronic.isRTL() ? 'right' : 'left');
        }

        //handle theme layout
        var resetLayout = function () {
            $("body").removeClass("page-boxed").removeClass("page-footer-fixed").removeClass("page-sidebar-fixed").removeClass("page-header-fixed").removeClass("page-sidebar-reversed");

            $('.page-header > .page-header-inner').removeClass("container");

            if ($('.page-container').parent(".container").size() === 1) {
                $('.page-container').insertAfter('body > .clearfix');
            }

            if ($('.page-footer > .container').size() === 1) {
                $('.page-footer').html($('.page-footer > .container').html());
            } else if ($('.page-footer').parent(".container").size() === 1) {
                $('.page-footer').insertAfter('.page-container');
                $('.scroll-to-top').insertAfter('.page-footer');
            }

            $(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark");

            $('body > .container').remove();
        };

        var lastSelectedLayout = '';

        var setLayout = function () {

            var layoutOption = $('.layout-option', panel).val();
            var sidebarOption = $('.sidebar-option', panel).val();
            var headerOption = $('.page-header-option', panel).val();
            var footerOption = $('.page-footer-option', panel).val();
            var sidebarPosOption = $('.sidebar-pos-option', panel).val();
            var sidebarStyleOption = $('.sidebar-style-option', panel).val();
            var sidebarMenuOption = $('.sidebar-menu-option', panel).val();
            var headerTopDropdownStyle = $('.page-header-top-dropdown-style-option', panel).val();


            if (sidebarOption == "fixed" && headerOption == "default") {
                alert('Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.');
                $('.page-header-option', panel).val("fixed");
                $('.sidebar-option', panel).val("fixed");
                sidebarOption = 'fixed';
                headerOption = 'fixed';
            }

            resetLayout(); // reset layout to default state

            if (layoutOption === "boxed") {
                $("body").addClass("page-boxed");

                // set header
                $('.page-header > .page-header-inner').addClass("container");
                var cont = $('body > .clearfix').after('<div class="container"></div>');

                // set content
                $('.page-container').appendTo('body > .container');

                // set footer
                if (footerOption === 'fixed') {
                    $('.page-footer').html('<div class="container">' + $('.page-footer').html() + '</div>');
                } else {
                    $('.page-footer').appendTo('body > .container');
                }
            }

            if (lastSelectedLayout != layoutOption) {
                //layout changed, run responsive handler:
                Metronic.runResizeHandlers();
            }
            lastSelectedLayout = layoutOption;

            //header
            if (headerOption === 'fixed') {
                $("body").addClass("page-header-fixed");
                $(".page-header").removeClass("navbar-static-top").addClass("navbar-fixed-top");
            } else {
                $("body").removeClass("page-header-fixed");
                $(".page-header").removeClass("navbar-fixed-top").addClass("navbar-static-top");
            }

            //sidebar
            if ($('body').hasClass('page-full-width') === false) {
                if (sidebarOption === 'fixed') {
                    $("body").addClass("page-sidebar-fixed");
                    $("page-sidebar-menu").addClass("page-sidebar-menu-fixed");
                    $("page-sidebar-menu").removeClass("page-sidebar-menu-default");
                    Layout.initFixedSidebarHoverEffect();
                } else {
                    $("body").removeClass("page-sidebar-fixed");
                    $("page-sidebar-menu").addClass("page-sidebar-menu-default");
                    $("page-sidebar-menu").removeClass("page-sidebar-menu-fixed");
                    $('.page-sidebar-menu').unbind('mouseenter').unbind('mouseleave');
                }
            }

            // top dropdown style
            if (headerTopDropdownStyle === 'dark') {
                $(".top-menu > .navbar-nav > li.dropdown").addClass("dropdown-dark");
            } else {
                $(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark");
            }

            //footer
            if (footerOption === 'fixed') {
                $("body").addClass("page-footer-fixed");
            } else {
                $("body").removeClass("page-footer-fixed");
            }

            //sidebar style
            if (sidebarStyleOption === 'compact') {
                $(".page-sidebar-menu").addClass("page-sidebar-menu-compact");
            } else {
                $(".page-sidebar-menu").removeClass("page-sidebar-menu-compact");
            }

            //sidebar menu
            if (sidebarMenuOption === 'hover') {
                if (sidebarOption == 'fixed') {
                    $('.sidebar-menu-option', panel).val("accordion");
                    alert("Hover Sidebar Menu is not compatible with Fixed Sidebar Mode. Select Default Sidebar Mode Instead.");
                } else {
                    $(".page-sidebar-menu").addClass("page-sidebar-menu-hover-submenu");
                }
            } else {
                $(".page-sidebar-menu").removeClass("page-sidebar-menu-hover-submenu");
            }

            //sidebar position
            if (Metronic.isRTL()) {
                if (sidebarPosOption === 'left') {
                    $("body").addClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'right'
                    });
                } else {
                    $("body").removeClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'left'
                    });
                }
            } else {
                if (sidebarPosOption === 'right') {
                    $("body").addClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'left'
                    });
                } else {
                    $("body").removeClass("page-sidebar-reversed");
                    $('#frontend-link').tooltip('destroy').tooltip({
                        placement: 'right'
                    });
                }
            }

            Layout.fixContentHeight(); // fix content height
            Layout.initFixedSidebar(); // reinitialize fixed sidebar
        };

        // handle theme colors
        var setColor = function (color) {
            var color_ = (Metronic.isRTL() ? color + '-rtl' : color);
            $('#style_color').attr("href", Layout.getLayoutCssPath() + 'themes/' + color_ + ".css");
        };

        $('.toggler', panel).click(function () {
            $('.toggler').hide();
            $('.toggler-close').show();
            $('.theme-panel > .theme-options').show();
        });

        $('.toggler-close', panel).click(function () {
            $('.toggler').show();
            $('.toggler-close').hide();
            $('.theme-panel > .theme-options').hide();
        });

        $('.theme-colors > ul > li', panel).click(function () {
            var color = $(this).attr("data-style");
            setColor(color);
            $('ul > li', panel).removeClass("current");
            $(this).addClass("current");
        });

        // set default theme options:

        if ($("body").hasClass("page-boxed")) {
            $('.layout-option', panel).val("boxed");
        }

        if ($("body").hasClass("page-sidebar-fixed")) {
            $('.sidebar-option', panel).val("fixed");
        }

        if ($("body").hasClass("page-header-fixed")) {
            $('.page-header-option', panel).val("fixed");
        }

        if ($("body").hasClass("page-footer-fixed")) {
            $('.page-footer-option', panel).val("fixed");
        }

        if ($("body").hasClass("page-sidebar-reversed")) {
            $('.sidebar-pos-option', panel).val("right");
        }

        if ($(".page-sidebar-menu").hasClass("page-sidebar-menu-light")) {
            $('.sidebar-style-option', panel).val("light");
        }

        if ($(".page-sidebar-menu").hasClass("page-sidebar-menu-hover-submenu")) {
            $('.sidebar-menu-option', panel).val("hover");
        }

        var sidebarOption = $('.sidebar-option', panel).val();
        var headerOption = $('.page-header-option', panel).val();
        var footerOption = $('.page-footer-option', panel).val();
        var sidebarPosOption = $('.sidebar-pos-option', panel).val();
        var sidebarStyleOption = $('.sidebar-style-option', panel).val();
        var sidebarMenuOption = $('.sidebar-menu-option', panel).val();

        $('.layout-option, .page-header-top-dropdown-style-option, .page-header-option, .sidebar-option, .page-footer-option, .sidebar-pos-option, .sidebar-style-option, .sidebar-menu-option', panel).change(setLayout);
    },

    // handle theme style
    setThemeStyle: function (style) {
        var file = (style === 'rounded' ? 'components-rounded' : 'components');
        file = (Metronic.isRTL() ? file + '-rtl' : file);

        $('#style_components').attr("href", Metronic.getGlobalCssPath() + file + ".css");

        if ($.cookie) {
            $.cookie('layout-style-option', style);
        }
    },


    // random genarator
    getRandom: function (until) {
        return Math.floor((Math.random() * until) + 1);
    },

    getTime: function () {

        d = new Date;
        nhour = d.getHours();
        nmin = d.getMinutes();
        function pad(n) {
            return ("0" + n).slice(-2);
        }

        return pad(nmin) + "<blink> : </blink>" + pad(nhour);

    },

    getPersianDate: function () {
        week = new Array("يكشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنج شنبه", "جمعه", "شنبه")
        months = new Array("فروردين", "ارديبهشت", "خرداد", "تير", "مرداد", "شهريور", "مهر", "آبان", "آذر", "دي", "بهمن", "اسفند");
        var a = new Date();
        var d = a.getDay();
        var day = a.getDate();
        var month = a.getMonth() + 1;
        var year = a.getYear();
        year = (year == 0) ? 2000 : year;
        (year < 1000) ? (year += 1900) : true;
        year -= ((month < 3) || ((month == 3) && (day < 21))) ? 622 : 621;
        switch (month) {
            case 1:
                (day < 21) ? (month = 10, day += 10) : (month = 11, day -= 20);
                break;
            case 2:
                (day < 20) ? (month = 11, day += 11) : (month = 12, day -= 19);
                break;
            case 3:
                (day < 21) ? (month = 12, day += 9) : (month = 1, day -= 20);
                break;
            case 4:
                (day < 21) ? (month = 1, day += 11) : (month = 2, day -= 20);
                break;
            case 5:
            case 6:
                (day < 22) ? (month -= 3, day += 10) : (month -= 2, day -= 21);
                break;
            case 7:
            case 8:
            case 9:
                (day < 23) ? (month -= 3, day += 9) : (month -= 2, day -= 22);
                break;
            case 10:
                (day < 23) ? (month = 7, day += 8) : (month = 8, day -= 22);
                break;
            case 11:
            case 12:
                (day < 22) ? (month -= 3, day += 9) : (month -= 2, day -= 21);
                break;
            default:
                break;
        }
        return week[d] + " " + day + " " + months[month - 1] + " " + year;
    },


    format_size: function (size) {
        var units = ("B KB MB GB TB PB").split(" ");
        var mod = 1024;
        var i = 0;
        for (i = 0; size > mod; i++) {
            size /= mod;
        }
        size = size.toString();
        var endIndex = size.indexOf(".") + 3;
        return size.substr(0, endIndex) + " " + units[i];
    },

    msago: function (ms) {
        function suffix(number) {
            return ((number > 1) ? ' ' : '') + ' پیش';
        }

        data = new Date().getTime();
        var temp = Math.ceil(data / 1000) - ms;

        var years = Math.floor(temp / 31536000);
        if (years)
            return years + ' سال' + suffix(years);

        var month = Math.floor((temp %= 31536000) / 2592000);
        if (month)
            return month + ' ماه' + suffix(month);

        var weeks = Math.floor((temp %= 2592000) / 604800);
        if (weeks)
            return weeks + ' ماه' + suffix(weeks);

        var days = Math.floor((temp %= 604800) / 86400);
        if (days)
            return days + ' روز' + suffix(days);

        var hours = Math.floor((temp %= 86400) / 3600);
        if (hours)
            return hours + ' ساعت' + suffix(hours);

        var minutes = Math.floor((temp %= 3600) / 60);
        if (minutes)
            return minutes + ' دقیقه' + suffix(minutes);

        var seconds = Math.floor(temp % 60);
        if (seconds)
            return seconds + ' ثانیه' + suffix(seconds);

        return 'همین حالا';
    },


    showNotification: function (message, timer = 1500, icon = "check", type = 'success', container = '#alert') {
        Metronic.alert({
            container: container,      // alerts parent container(by default placed after the page breadcrumbs)
            place: 'append',            // append or prepent in container
            type: type,                // alert's type
            message: message,          // alert's message
            close: '1',                 // make alert closable
            reset: '1',                 // close all previous alerts first
            focus: '1',                 // auto scroll to the alert after shown
            closeInSeconds: timer,     // auto close after defined seconds
            icon: icon                  // put icon before the message
        });
    },

    shake: function (thing, interval = 100, distance = 10, times = 6) {
        for (var i = 0; i < (times + 1); i++) {
            $(thing).animate({
                left: (i % 2 == 0 ? distance : distance * -1)
            }, interval);
        }
        $(thing).animate({
            left: 0,
            top: 0
        }, interval);
    },

    transform: function (thing, rotate = 45, speed = "slow", delay = 0, times = 1) {
        for (var i = 0; i < times; i++) {
            $(thing).delay(delay).animate({textIndent: rotate}, {
                step: function (now) {
                    $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
                },
                duration: speed
            }, 'linear').animate({textIndent: rotate * -1}, {
                step: function (now) {
                    $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
                },
                duration: speed
            }, 'linear').animate({textIndent: rotate}, {
                step: function (now) {
                    $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
                },
                duration: speed
            }, 'linear').animate({textIndent: 0}, {
                step: function (now) {
                    $(this).css('-webkit-transform', 'rotate(' + now + 'deg)');
                },
                duration: speed
            }, 'linear');
        }
    },

    numberFix4: function (number, mode) {
        if (number != 0 && number != '') {
            number = String(number);
            var negation = false;
            if (number.indexOf('-') >= 0) {
                negation = true;
            }

            number = number.trim().replace(/[^0-9]\./g, '');


            if (number[0] == '0') {
                number = number.substr(1, 1);
            }
            if (number == '.') {
                number = '0';
            }

            var ashar = '';
            if (number.match(/\./g)) {
                var numbers = number.trim().split('.');
                ashar = numbers[1];
                ashar = ashar.replace(/[^0-9]/g, '');
                if (ashar.length > 5) {
                    ashar = ashar.substr(0, 5);
                }
                number = numbers[0];
//                        console.log("ashar : "+ashar);
//                        console.log("number : "+number);
                ashar = '.' + ashar;
            }
            number = number.replace(/[^0-9]/g, '').split('').reverse();
            var txt = '';
            var numLen = number.length;
            for (var i = numLen - 1; i >= 0; i--) {
                txt += number[i];
                if (((i % 3) == 0) && i != 0) {
                    txt += ',';
                }
            }

            //if (ashar != '.00' && ashar != '.0')
            txt = txt + ashar;

            if (mode == 1) {
                if (negation)
                    txt = txt + '-';
            }
            else if (mode == 2) {
                if (negation)
                    txt = txt + ' (بس) ';
                else
                    txt = txt + ' (بد) ';
            }
        }
        else {
            if (mode == 4) {
                txt = '';
            } else {
                txt = 0;
            }
        }
        return txt;
    },

    findMaximum: function (numbers) {
        var max = numbers[0];

        for (var i = 0; i < numbers.length; i++) {
            if (max < numbers[i]) {
                max = numbers[i];
            }
        }

        return parseInt(max);
    },

    // we use this to check if key pressed like : isKey("ctrl+0" , event , "multi")
    isKey: function (key, e, mode = 'single') {

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
    },


    setCookie: function (cname, cvalue) {
        var exdays = 365;
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },


    seprateDateTime: function (element, flag = false) {
        $(element).on('keyup input', function (e) {
            var str = "";
            var inputLength = e.target.value.length;
            if (!flag) {
                if (inputLength === 4 || inputLength === 7) {
                    str = e.target.value + '/';
                    $(e.target).val(str);
                }
            } else {
                if (inputLength === 2 || inputLength === 5) {
                    str = e.target.value + ':';
                    $(e.target).val(str);
                }
            }

        });
    },


    /**
     * Copy|Clone an array
     *
     * @param from
     * @returns {Array}
     */
    copyArray: function (from) {
        var i = from.length;
        var to = [];
        while (i--) to[i] = from[i];
        return to;
    },


    /**
     * Get attributes
     *
     * @param node
     * @param startWith
     * @returns {*}
     */
    getAttributes: function (node , startWith = "") {
        var attributeNodeArray = Array.prototype.slice.call(node.attributes);

        return attributeNodeArray.reduce(function (attrs, attribute) {
            if(startWith !== ""){
                if(attribute.name.indexOf(startWith) > -1) {
                    attrs[attribute.name] = attribute.value;
                }
            }else{
                attrs[attribute.name] = attribute.value;
            }
            return attrs;
        }, {});
    },


    /**
     * Remove attributes
     *
     * @param node
     * @param attrs
     * @param startWith
     */
    removeAttributes: function (node , attrs = null , startWith = "" ) {
        attrs = attrs == null ? jRun.getAttributes(node , startWith) : attrs ;
        for(var attr in attrs){
            node.removeAttribute(attr);
        }
    },


    /**
     * Show fake ajax mode on submit form
     *
     * @param $form
     */
    setFajaxGlobalReport: function ($form) {

        $form.on("submit" , function () {
            var $holder = "#alert";
            $('html,body')
                .animate(
                    {scrollTop: 0},
                    'slow'
                ).find(".page-content")
                .find($holder).css({"top" : "140px" , "position":"relative"})
                .append("")
                .parent()
                .find(".row:eq(0)")
                .prepend('<div class="overlyPage" style="display: block"></div>');

            // say hello to animation
            Metronic.blockUI({
                target: $holder,
                boxed: true,
                animate:true
            });
        });

    },



    // @note : please add your new methods before this method

    init: function (page) {
        var script = document.createElement('script');
        script.onload = function () {
            //do stuff with the script
        };
        script.src = siteUrl + "js/pages/" + page + ".js?Ver=" + jRun.version;

        document.head.appendChild(script);
    }


};

// alias log instead of console.log in dev mode
var log = function (message) {
    var e = new Error();
    if (!e.stack)
        try {
            throw e;
        } catch (e) {
            if (!e.stack) {
                //return 0; // IE < 10, likely
            }
        }
    var stack = e.stack.toString().split(/\r\n|\n/);
    if (message === '') {
        message = '""';
    }
    console.log(message, '          [' + stack[1] + ']');
};


// input 1 mean : hey , it is my first build
jRun.build(1);