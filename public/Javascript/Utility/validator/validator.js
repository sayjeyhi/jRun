$.validator.addMethod("time24", function (value, element) {
    if (!/^\d{2}:\d{2}$/.test(value))
        return false;
    var parts = value.split(':');
    if (parts[0] > 23 || parts[1] > 59)
        return false;
    return true;
}, "لطفاً ساعت را از بین 00:00 تا 23:59 انتخاب نمایید.");


jQuery.validator.addMethod("greaterThanDate",
    function (value, element, params) {
        if ($(params).val() != null && $(params).val() != '') {
            if (value != null && value != '') {
                var startDate = ($(params).val());
                var endDate = value;
                return startDate <= endDate
            }
        }
        return true
    });

jQuery.validator.addMethod("greaterOrEqualThanDate",
    function (value, element, params) {
        if ($(params).val() != null && $(params).val() != '') {
            if (value != null && value != '') {
                var startDate = ($(params).val());
                var endDate = value;
                return startDate < endDate
            }
        }
        return true
    });

jQuery.validator.addMethod("greaterThan",
    function (value, element, params) {
        if ($(params).val() != null && $(params).val() != '') {
            if (value != null && value != '') {
                var start = parseInt($(params).val());
                var end = parseInt(value);
                return (start < end)
            }
        }
        return true
    });

jQuery.validator.addMethod("greaterThanPrice",
    function (value, element, params) {
        if ($(params).val() != null && $(params).val() != '') {
            if (value != null && value != '') {
                var Price1 = ($(params).val());
                var startPrice = Price1.replace(/,/g, '');
                var Price2 = value;
                var endPrice = Price2.replace(/,/g, '');
                return parseFloat(startPrice) <= parseFloat(endPrice)
            }
        }
        return true
    });

jQuery.validator.addMethod("pattern", function (value, element) {
    return this.optional(element) || /^(?:[1-9]\d{0,2}(?:,\d{3})*|0)(?:\.\d+)?$/.test(value);
}, "مقدار مبلغ صحیح نمباشد");

jQuery.validator.addMethod("mobile", function (value, element) {
    return this.optional(element) || /^(09\d{9}|0098\d{10}|\+98\d{10})$/.test(value)
}, "لطفاً یک شماره معتبر وارد نمایید.");

jQuery.validator.addMethod("dateISO", function (value, element) {
    return this.optional(element) || /^(13[0-9][0-9]|14[0-9][0-9])[\/\-](0[1-9]|1[012])[\/\-](0[1-9]|[12][0-9]|3[01])$/.test(value)
}, "لطفاً یک تاریخ معتبر وارد نمایید.");
jQuery.validator.addMethod("timeISO", function (value, element) {
        return this.optional(element) || /^(0[1-9]|[1-9]|1[0-9]|2[0-4])[:]([0-5][0-9]|[0-9])$/.test(value)
    }
    , "لطفاً یک زمان معتبر وارد نمایید.");
jQuery.validator.addMethod("timeISO2", function (value, element) {
        return this.optional(element) || /^(0[1-9]|[1-9]|1[0-9]|2[0-4])[:](30|0|00)$/.test(value)
    }
    , "تنها مجاز به وارد کردن دقيقه صفر يا سي مي باشيد.");


// for spad
var handleLogin = function () {
    $('.login-form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            company: {
                required: true
            },
            username: {
                required: true
            },
            password: {
                required: true
            },
            // captcha_code: {
            //     required: true,
            //     maxlength: 5,
            //     minlength: 5,
            //     remote: {
            //         url: "check_captcha.php",
            //         type: "post",
            //         data: {
            //             captcha: function () {
            //                 return $("#captcha_code").val();
            //             }
            //         }
            //     }
            // }
        },
        messages: {
            company: {
                required: "شناسه شرکت را وارد نمایید."
            },
            username: {
                required: "نام کاربری را وارد نمایید."
            },
            password: {
                required: "رمز عبور را وارد نمایید."
            },
            // captcha_code: {
            //     required: "کد امنیتی را وارد نمایید.",
            //     minlength: "کد امنیتی نادرست می باشد.",
            //     remote: "کد امنیتی نادرست می باشد.",
            // }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.input-icon'));
        },
        submitHandler: function (form) {
            var username = $('#username'); // Get the username field
            var password = $('#password'); // Get the password field
            // var security = $('#captcha_code');
            var company = $('#company');
            Metronic.startPageLoading({animate: true});
            $.ajax({// Send the credential values to another loginchecker.php using Ajax in POST method
                type: 'POST',
                data: {'company': company.val(), 'userName': username.val(), 'password': password.val()},
                url: '/logIn/loginAjax',
                cache: false,
                async: false,
                success: function (response) {

                    try {
                        var obj = JSON.parse(response);
                        if (obj['error'] != '') {
                            Metronic.alert({
                                container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                                place: 'append', // append or prepent in container
                                type: 'danger', // alert's type
                                message: obj['error'], // alert's message
                                close: '1', // make alert closable
                                reset: '1', // close all previous alerts first
                                focus: '1', // auto scroll to the alert after shown
                                closeInSeconds: '10', // auto close after defined seconds
                                icon: 'warning' // put icon before the message
                            });
                            // document.getElementById('captcha').src = 'securimage_show.php?' + Math.random();
                            company.focus();
                            company.parent('div').parent('div.form-group').addClass('has-error');
                            username.parent('div').parent('div.form-group').addClass('has-error');
                            password.parent('div').parent('div.form-group').addClass('has-error');
                            // security.parent('div').parent('div.form-group').addClass('has-error');
                            // security.val('');
                            return false;
                        }
                        else if (obj['userId'] != '') {
                            checkFinancialPeriodAndRedirect(obj);
                        }
                        else {
                            alert('Problem with web service');
                        }

                    } catch (e) {
                        console.log(response);
                        Metronic.alert({
                            container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: "خطا در تحلیل پاسخ سرور", // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        return false;
                    }
                }
            });
        }
    });

    $('.login-form input').keypress(function (e) {
        if (e.which == 13) {
            if ($('.login-form').validate()) {
                $('.login-form').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
};

var handleLogin_NEW = function () {
    $('#loginForm').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            password: {
                required: true
            }
        },
        messages: {
            password: {
                required: "رمز عبور را وارد نمایید."
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.input-icon'));
        },
        submitHandler: function (form) {
            var password = $('#password'); // Get the password field
            Metronic.startPageLoading({animate: true});


            // console.log('sss');
            // window.location('google.com');
            // break;

            $.ajax({
                type: 'POST',
                data: {
                    'login_NEW': 'true',
                    'password': password.val()
                },
                url: '/login/loginAjax',
                cache: false,
                async: false,
                success: function (response) {
                    window.setTimeout(function () {
                        Metronic.stopPageLoading();
                    }, 500);
                    try {
                        var obj = JSON.parse(response);
                        // Get the result and asign to each cases
                        if (obj['error'] != '') {
                            Metronic.alert({
                                container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                                place: 'append', // append or prepent in container
                                type: 'danger', // alert's type
                                message: obj['error'], // alert's message
                                close: '1', // make alert closable
                                reset: '1', // close all previouse alerts first
                                focus: '1', // auto scroll to the alert after shown
                                closeInSeconds: '10', // auto close after defined seconds
                                icon: 'warning' // put icon before the message
                            });
                            password.parent('div').parent('div.form-group').addClass('has-error');
                            return false;
                        }
                        else if (obj['userId'] != '') {
                            Metronic.stopPageLoading();
                            if (obj['updateVoucher']) {
                                var tempp = ' <div class="row">' +
                                    '<div class="col-md-12" style="text-align: center;">' +
                                    '<i class="fa fa-spinner fa-spin fa-3x"></i>' +
                                    '<h4>در حال صدور اسناد حسابداری ، لطفا شکیبا باشید</h4>' +
                                    '</div>' +
                                    '</div>';
                                $('div.content:first').html(tempp);
                                $.ajax({
                                    type: 'POST',
                                    data: {
                                        'updateVoucherInLogin': 'true'
                                    },
                                    url: '/login/updateVoucherInLoginAjax',
                                    cache: false,
                                    async: false,
                                    success: function (res2) {
                                        var result2 = JSON.parse(res2);
                                        if (result2['status']) {
                                            checkFinancialPeriodAndRedirect(obj);
                                        }
                                        else {
                                            checkFinancialPeriodAndRedirect(obj);
                                        }

                                    }
                                });

                            }
                            else {
                                checkFinancialPeriodAndRedirect(obj);
                            }
                        }
                        else {
                            Metronic.alert({
                                container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                                place: 'append', // append or prepent in container
                                type: 'danger', // alert's type
                                message: "خطا در وب سرویس", // alert's message
                                close: '1', // make alert closable
                                reset: '1', // close all previouse alerts first
                                focus: '1', // auto scroll to the alert after shown
                                closeInSeconds: '10', // auto close after defined seconds
                                icon: 'warning' // put icon before the message
                            });
                            return false;
                        }
                    }
                    catch (e) {
                        console.log(e);
                        Metronic.alert({
                            container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: "خطا", // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        return false;
                    }
                }
            });
        }
    });

    $('#loginForm input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#loginForm').validate()) {
                $('#loginForm').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
};

var handleNewAdminUser = function () {
    $('.login-form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            username: {
                required: true,
                minlength: 4
            },
            password: {
                required: true,
                minlength: 6
            },
            password2: {
                required: true,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            username: {
                required: "نام کاربری را وارد نمایید.",
                minlength: "نام کاربری حداقل باید چهار کارکتر داشته باشد."
            },
            password: {
                required: "رمز عبور را وارد نمایید.",
                minlength: "رمز عبور حداقل باید شش کارکتر داشته باشد."
            },
            password2: {
                required: "تکرار رمز عبور را عیناً وارد نمایید.",
                equalTo: "تکرار رمز عبور را عیناً وارد نمایید."
            },
            email: {
                required: "ایمیل را وارد نمایید.",
                email: "یک ایمیل معتبر وارد نمایید."
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.input-icon'));
        },
        submitHandler: function (form) {
            var username = $('#username'); // Get the username field
            var password = $('#password'); // Get the password field
            var password2 = $('#password2'); // Get the password field
            var email = $('#email'); // Get the password field
            Metronic.startPageLoading({animate: true});
            $.ajax({// Send the credential values to another loginchecker.php using Ajax in POST method
                type: 'POST',
                data: {
                    'new_admin_user': 'true',
                    'username_new': username.val(),
                    'password_new': password.val(),
                    'email_new': email.val()
                },
                url: 'loginchecker.php',
                cache: false,
                async: false,
                success: function (response) {
                    window.setTimeout(function () {
                        Metronic.stopPageLoading();
                    }, 500);
                    var obj = JSON.parse(response);

                    // alert("obj : " + obj);
                    // Get the result and asign to each cases
                    if (obj['error'] != '') {
                        Metronic.alert({
                            container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: obj['error'], // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        username.focus();
                        username.parent('div').parent('div.form-group').addClass('has-error');
                        password.parent('div').parent('div.form-group').addClass('has-error');
                        password2.parent('div').parent('div.form-group').addClass('has-error');
                        email.parent('div').parent('div.form-group').addClass('has-error');
                        return false;
                    }
                    else if (obj['userId'] != '') {
                        checkFinancialPeriodAndRedirect(obj);
                        // alert("ok : " + obj);
                    }
                    else {
                        alert('Problem with web service');
                    }
                }

            });
        }
    });

    $('.login-form input').keypress(function (e) {
        if (e.which == 13) {
            if ($('.login-form').validate()) {
                $('.login-form').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
};

var handleNewAdminUser_NEW = function () {
    $('#loginFormReg').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            sms_password: {
                required: true,
                minlength: 6
            }
        },
        messages: {
            sms_password: {
                required: "رمز عبور را وارد نمایید.",
                minlength: "رمز عبور حداقل باید شش کارکتر داشته باشد."
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.input-icon'));
        },
        submitHandler: function (form) {
            var password = $('#sms_password');
            Metronic.startPageLoading({animate: true});
            $.ajax({// Send the credential values to another loginchecker.php using Ajax in POST method
                type: 'POST',
                data: {
                    'new_admin_user_NEW': 'true',
                    'password': password.val()
                },
                url: '/login/newAdminUserAjax',
                cache: false,
                async: false,
                success: function (response) {
                    window.setTimeout(function () {
                        Metronic.stopPageLoading();
                    }, 500);
                    try {
                        var obj = JSON.parse(response);

                        // alert("obj : " + obj);
                        // Get the result and asign to each cases
                        if (obj['error'] != '') {
                            Metronic.alert({
                                container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                                place: 'append', // append or prepent in container
                                type: 'danger', // alert's type
                                message: obj['error'], // alert's message
                                close: '1', // make alert closable
                                reset: '1', // close all previouse alerts first
                                focus: '1', // auto scroll to the alert after shown
                                closeInSeconds: '10', // auto close after defined seconds
                                icon: 'warning' // put icon before the message
                            });
                            password.focus();
                            password.parent('div').parent('div.form-group').addClass('has-error');
                            return false;
                        }
                        else if (obj['userId'] != '') {
                            var tempp = ' <div class="row">' +
                                '<div class="col-md-12" style="text-align: center;">' +
                                '<i class="fa fa-spinner fa-spin fa-3x"></i>' +
                                '<h4>در حال صدور اسناد حسابداری ، لطفا شکیبا باشید</h4>' +
                                '</div>' +
                                '</div>';
                            $('div.content:first').html(tempp);
                            $.ajax({
                                type: "POST",
                                url: '/login/importAutoVoucherAjax',
                                dataType: 'html',
                                data: {'import_auto_voucher': "true"},
                                success: function (data, textStatus, jQxhr) {
                                    if (data == 'true') {
                                        window.location = '/user';
                                    }
                                }
                            });


                        }
                        else {
                            Metronic.alert({
                                container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                                place: 'append', // append or prepent in container
                                type: 'danger', // alert's type
                                message: "خطا در وب سرویس", // alert's message
                                close: '1', // make alert closable
                                reset: '1', // close all previouse alerts first
                                focus: '1', // auto scroll to the alert after shown
                                closeInSeconds: '10', // auto close after defined seconds
                                icon: 'warning' // put icon before the message
                            });
                            return false;
                        }
                    }
                    catch (e) {
                        Metronic.alert({
                            container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: "خطا", // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        return false;
                    }

                }

            });
        }
    });

    $('#loginFormReg input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#loginFormReg').validate()) {
                $('#loginFormReg').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });

    $('#send_sms_btn').click(function () {

        $('#mTitle').css("display", 'none');
        $('#sTitle').css("display", '');


    });
};

var handleForgetPassword = function () {
    $('.forget-form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",
        rules: {
            email: {
                required: true,
                email: true
            },
            username1: {
                required: true
            }
        },
        messages: {
            email: {
                required: "وارد کردن ایمیل الزامی است.",
                email: "لطفاً یک ایمیل معتبر وراد نمایید."
            },
            username1: {
                required: "نام کاربری را وارد نمایید."
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit

        },
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.input-icon'));
        },
        submitHandler: function (form) {
            var email = $('#email');
            var username1 = $('#username1');
            Metronic.startPageLoading({animate: true});
            $.ajax({// Send the credential values to another loginchecker.php using Ajax in POST method
                type: 'POST',
                data: {'email': email.val(), 'username1': username1.val()},
                url: 'loginchecker.php',
                cache: false,
                async: false,
                success: function (response) {
                    //   console.log(response);


                    window.setTimeout(function () {
                        Metronic.stopPageLoading();
                    }, 500);

                    var obj = JSON.parse(response);
                    // Get the result and asign to each cases
                    if (obj['error'] != '') {
                        Metronic.alert({
                            container: '#ress', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: obj['error'], // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        username1.focus();
                        return false;
                    }
                    else if (obj['message'] != '') {
                        Metronic.alert({
                            container: '#ress', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'success', // alert's type
                            message: 'اطلاعات ورود به سیستم، برای شما ارسال شد، لطفاً ایمیلتان را چک نمایید.', // obj['message']
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'check' // put icon before the message
                        });
                        email.val('');
                        username1.val('');
                        $('body').find('div.has-error').removeClass('has-error');
                    }
                    else {
                        alert('Problem with web service');
                    }

                }
            });
        }
    });
    $('.forget-form input').keypress(function (e) {
        if (e.which == 13) {
            if ($('.forget-form').validate().form()) {
                $('.forget-form').submit();
            }
            return false;
        }
    });

    $('#forget-password').click(function () {
        var company_code = $('#company_code');
        var username = $('#username'); // Get the username field
        var password = $('#password'); // Get the password field
        var security = $('#captcha_code');
        company_code.val('');
        username.val('');
        password.val('');
        security.val('');
        $('body').find('span.help-block').remove();
        $('body').find('div.has-error').removeClass('has-error');
        $('body').find('div.display-hide').addClass('hide');
        $('.login-form').hide();
        $('.forget-form').show();
        $('#company_code1').focus();

    });

    $('#back-btn').click(function () {
        var email = $('#email');
        var company_code1 = $('#company_code1');
        var username1 = $('#username1');
        company_code1.val('');
        username1.val('');
        email.val('');
        $('.login-form').show();
        $('.forget-form').hide();
        $('#company_code').focus();
        document.getElementById('captcha').src = 'securimage_show.php?' + Math.random();
        return false;
    });

}

var handleForgetPassword_NEW = function () {
    $('.forget-form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",
        rules: {
            mobile: {
                required: true,
                mobile: true,
            }
        },
        messages: {
            mobile: {
                required: "وارد کردن تلفن همراه الزامی است.",
                mobile: "لطفاً یک شماره معتبر وارد نمایید.",
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit

        },
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.input-icon'));
        },
        submitHandler: function (form) {
            var mobile = $('#mobile');
            var password = $('#password');
            Metronic.startPageLoading({animate: true});
            $.ajax({// Send the credential values to another loginchecker.php using Ajax in POST method
                type: 'POST',
                data: {'forget_NEW': true, 'mobile': mobile.val()},
                url: '/login/forgetAjax',
                cache: false,
                async: false,
                success: function (response) {
                    //   console.log(response);


                    window.setTimeout(function () {
                        Metronic.stopPageLoading();
                    }, 500);

                    try {
                        var obj = JSON.parse(response);
                        // Get the result and asign to each cases
                        if (!obj.result) {
                            Metronic.alert({
                                container: '#ress', // alerts parent container(by default placed after the page breadcrumbs)
                                place: 'append', // append or prepent in container
                                type: 'danger', // alert's type
                                message: obj.message, // alert's message
                                close: '1', // make alert closable
                                reset: '1', // close all previouse alerts first
                                focus: '1', // auto scroll to the alert after shown
                                closeInSeconds: '10', // auto close after defined seconds
                                icon: 'warning' // put icon before the message
                            });
                            return false;
                        }
                        else if (obj.result) {
                            Metronic.alert({
                                container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                                place: 'append', // append or prepent in container
                                type: 'success', // alert's type
                                message: 'اطلاعات ورود به سیستم، برای شما ارسال شد، لطفاً تلفن همراهتان را چک نمایید.', // obj['message']
                                close: '1', // make alert closable
                                reset: '1', // close all previouse alerts first
                                focus: '1', // auto scroll to the alert after shown
                                closeInSeconds: '10', // auto close after defined seconds
                                icon: 'check' // put icon before the message
                            });
                            password.val('');
                            $('.login-form').show();
                            $('.forget-form').hide();
                            $('#password').focus();
                            $('#mainTitle').css("display", '');
                            $('#forgetTitle').css("display", 'none');
                            mobile.val('');
                            $('body').find('div.has-error').removeClass('has-error');
                            return false;
                        }
                        else {
                            Metronic.alert({
                                container: '#ress', // alerts parent container(by default placed after the page breadcrumbs)
                                place: 'append', // append or prepent in container
                                type: 'danger', // alert's type
                                message: "خطا در وب سرویس", // alert's message
                                close: '1', // make alert closable
                                reset: '1', // close all previouse alerts first
                                focus: '1', // auto scroll to the alert after shown
                                closeInSeconds: '10', // auto close after defined seconds
                                icon: 'warning' // put icon before the message
                            });
                            return false;
                        }
                    }
                    catch (e) {
                        Metronic.alert({
                            container: '#ress', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: "خطا", // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        return false;
                    }

                }
            });
        }
    });
    $('.forget-form input').keypress(function (e) {
        if (e.which == 13) {
            if ($('.forget-form').validate().form()) {
                $('.forget-form').submit();
            }
            return false;
        }
    });

    $('#forget-password').click(function () {

        var mobile = $('#mobile');
        mobile.val('');
        $('body').find('span.help-block').remove();
        $('body').find('div.has-error').removeClass('has-error');
        $('body').find('div.display-hide').addClass('hide');
        $('.login-form').hide();
        $('.forget-form').show();
        $('#mobile').focus();
        $('#mainTitle').css("display", 'none');
        $('#forgetTitle').css("display", '');


    });

    $('#back-btn').click(function () {
        var password = $('#password');
        password.val('');
        $('.login-form').show();
        $('.forget-form').hide();
        $('#password').focus();
        $('#mainTitle').css("display", '');
        $('#forgetTitle').css("display", 'none');
        return false;
    });

}

var handleAddUser = function () {
    $('#user').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block col-lg-offset-3', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            name: {
                required: true
            },
            family: {
                required: true
            },
            username: {
                required: false,
                // minlength: 5,
            },
            password: {
                required: true,
                minlength: 6
            },
            repassword: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            },
            fromhour: {
                required: true,
                time24: true
            },
            tohour: {
                required: true,
                time24: true
            },
            email: {
                required: true,
                email: true,
            },
            job: {
                required: false
            },
            mobile: {
                required: true,
                mobile: true,
            },
            address: {
                required: false
            },
            image: {
                required: false
            }
        },
        messages: {
            name: {
                required: 'نام را وارد نمایید.'
            },
            family: {
                required: 'نام خانوادگی را وارد نمایید.'
            },
            username: {
                required: 'نام کاربری را وارد نمایید.',
                minlength: "لطفاً {0} کاراکتر وارد نمایید.",

            },
            password: {
                required: 'کلمه عبور را وارد نمایید.',
                minlength: "لطفاً {0} کاراکتر وارد نمایید."
            },
            repassword: {
                required: 'تکرار کلمه عبور را وارد نمایید.',
                minlength: "لطفاً {0} کاراکتر وارد نمایید.",
                equalTo: "تکرار کلمه عبور را عیناً وارد نمایید."
            },
            fromhour: {
                required: 'از ساعت را وارد نمایید.',
            },
            tohour: {
                required: 'تا ساعت را وارد نمایید.',
            },
            email: {
                required: 'پست الکترونیک را وارد نمایید.',
                email: "لطفاً یک ایمیل معتبر وراد نمایید.",
            },
            job: {},
            mobile: {
                required: 'شماره همراه را وارد نمایید.',
                mobile: 'لطفاً یک شماره همراه معتبر وراد نمایید.',
            },
            address: {},
            image: {}
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.col-md-9'));
        },
        submitHandler: function (form) {
            var dataform = new FormData(form);
            dataform.append('newuser', 'newuser');
            if (document.getElementById('add_user').checked) {
                dataform.append('adduser', 'true');
            } else {
                dataform.append('adduser', 'false');
            }
            if (document.getElementById('status').checked) {
                dataform.append('userstatus', 'true');
            } else {
                dataform.append('userstatus', 'false');
            }
            if (document.getElementById('change_pass').checked) {
                dataform.append('changepass', 'true');
            } else {
                dataform.append('changepass', 'false');
            }
            /*if (document.getElementById('add_time').checked) {
             dataform.append('addtime', 'true');
             } else {
             dataform.append('addtime', 'false');
             }*/
            if (document.getElementById('is_admin').checked) {
                dataform.append('isadmin', 'true');
            } else {
                dataform.append('isadmin', 'false');
            }
            Metronic.blockUI({
                target: 'body',
                boxed: true,
                message: 'در حال دخیره...'
            });
            $.ajax({
                url: "/user/newUserAjax", // Url to which the request is send
                type: "POST", // Type of request to be send, called as method
                data: dataform, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                contentType: false, // The content type used when sending data to the server.
                cache: false, // To unable request pages to be cached
                processData: false, // To send DOMDocument or non processed data file it is set to false
                success: function (data)   // A function to be called if request succeeds
                {
                    if (data.substr(0, 4) == 'succ') {
                        window.location = '/user?succ=succ';
                    }
                    else if (data.substr(0, 4) == 'logo') {
                        window.location = './logout';
                    } else {
                        Metronic.alert({
                            container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: data.substr(4), // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                    }

                }
            });

        }
    });

    $('#user input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#user').validate()) {
                $('#user').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleEditUser = function () {
    $('#user').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block col-lg-offset-3', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            name: {
                required: true
            },
            family: {
                required: true
            },
            username: {
                required: false,
                minlength: 5,
            },
            password: {
                required: false,
                minlength: 6
            },
            repassword: {
                required: false,
                minlength: 6,
                equalTo: "#password"
            },
            fromhour: {
                required: true,
                time24: true
            },
            tohour: {
                required: true,
                time24: true
            },
            email: {
                required: true,
                email: true,
            },
            job: {
                required: false
            },
            mobile: {
                required: true
            },
            address: {
                required: false
            },
            image: {
                required: false
            }
        },
        messages: {
            name: {
                required: 'نام را وارد نمایید.'
            },
            family: {
                required: 'نام خانوادگی را وارد نمایید.'
            },
            username: {
                required: 'نام کاربری را وارد نمایید.',
                minlength: "لطفاً {0} کاراکتر وارد نمایید.",

            },
            password: {
                required: 'کلمه عبور را وارد نمایید.',
                minlength: "لطفاً {0} کاراکتر وارد نمایید."
            },
            repassword: {
                required: 'تکرار کلمه عبور را وارد نمایید.',
                minlength: "لطفاً {0} کاراکتر وارد نمایید.",
                equalTo: "تکرار کلمه عبور را عیناً وارد نمایید."
            },
            fromhour: {
                required: 'از ساعت را وارد نمایید.',
            },
            tohour: {
                required: 'تا ساعت را وارد نمایید.',
            },
            email: {
                required: 'پست الکترونیک را وارد نمایید.',
                email: "لطفاً یک ایمیل معتبر وراد نمایید.",
            },
            job: {},
            mobile: {
                required: 'شماره همراه را وارد نمایید.',
            },
            address: {},
            image: {}
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.col-md-9'));
        },
        submitHandler: function (form) {
            var dataform = new FormData(form);
            dataform.append('edituser', 'edituser');
            if (document.getElementById('add_user').checked) {
                dataform.append('adduser', 'true');
            } else {
                dataform.append('adduser', 'false');
            }
            if (document.getElementById('status').checked) {
                dataform.append('userstatus', 'true');
            } else {
                dataform.append('userstatus', 'false');
            }
            if (document.getElementById('change_pass').checked) {
                dataform.append('changepass', 'true');
            } else {
                dataform.append('changepass', 'false');
            }
            /*if (document.getElementById('add_time').checked) {
             dataform.append('addtime', 'true');
             } else {
             dataform.append('addtime', 'false');
             }*/
            if (document.getElementById('is_admin').checked) {
                dataform.append('isadmin', 'true');
            } else {
                dataform.append('isadmin', 'false');
            }
            var id = $('#usr-submit').attr('data-id');
            dataform.append('id', id);
            var status = $('#usr-submit').attr('data-status');
            dataform.append('status', status);
            Metronic.blockUI({
                target: 'body',
                boxed: true,
                message: 'در حال ذخیره...'
            });
            $.ajax({
                url: "/user/editUserAjax", // Url to which the request is send
                type: "POST", // Type of request to be send, called as method
                data: dataform, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                contentType: false, // The content type used when sending data to the server.
                cache: false, // To unable request pages to be cached
                processData: false, // To send DOMDocument or non processed data file it is set to false
                success: function (data)   // A function to be called if request succeeds
                {
                    if (data.substr(0, 4) == 'succ') {
                        window.location = '/user?succ=succ';
                    }
                    else if (data.substr(0, 4) == 'logo') {
                        window.location = './logout';
                    } else {
                        Metronic.alert({
                            container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: data.substr(4), // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                    }

                }
            });

        }
    });

    $('#user input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#user').validate()) {
                $('#user').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleTopic = function () {
    $('#topicForm').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.col-md-9'));
        },
        submitHandler: function (form) {
            // alert('sdfsdf');
//            var selectedTopic = new Array();
//            $('input[name="topic[]"]:checked').each(function() {
//                selectedTopic.push(this.value);
//            });
//
//            $.ajax({// Send the credential values to another loginchecker.php using Ajax in POST method
//                type: 'POST',
//                data: {
//                    selectedTopic: selectedTopic
//                },
//                url: 'index.php',
//                cache: false,
//                async: false,
//                success: function(response) {
//                    $('#topic_selection').val(selectedTopic);
//
//                }
//            });
        }
    });

    $('#topicForm input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#topicForm').validate()) {
                $('#topicForm').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleExcel = function () {
    $('#excelForm').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            pages: {
                required: true
            }
        },
        messages: {
            pages: {
                required: "شماره صفحات را وارد نمایید."
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.col-md-9'));
        },
        submitHandler: function (form) {
            alert('TEST');
        }
    });

    $('#excelForm input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#excelForm').validate()) {
                $('#excelForm').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleProfileEdit = function () {
    $('#profile_form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            name: {
                required: true
            },
            family: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            mobile: {
                minlength: 11,
                maxlength: 11,
                required: true,
                digits: true,
                number: true
            },
            address: {
                required: false
            }
        },
        messages: {
            name: {
                required: "نام  را وارد نمایید."
            },
            family: {
                required: "نام خانوادگی را وارد نمایید."
            },
            email: {
                required: "وارد کردن ایمیل الزامی است.",
                email: "لطفاً یک ایمیل معتبر وراد نمایید."
            },
            mobile: {
                required: "شماره همراه را وارد نمایید.",
                number: "لطفاً فقط عدد وارد نمایید.",
                minlength: "لطفاً {0} عدد وارد نمایید."
            },
            address: {}
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('#profile_form')).show();
        },
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
            error.insertAfter(element.closest('.form-control'));
        },
        submitHandler: function (form) {
            var profile = {};
            profile.name = $('#name').val();
            profile.family = $('#family').val();
            profile.email = $('#email').val();
            profile.mobile = $('#mobile').val();
            // profile.job = $('#job').val();
            profile.address = $('#address').val();
            // alert(profile.name);
            $.ajax({
                type: 'POST',
                data: {profile: JSON.stringify(profile)},
                url: '/profile/updateAjax',
                success: function (responseText) {
                    // console.log(responseText);
                    var obj = JSON.parse(responseText);
                    if (obj['error'] != '') {
                        if (obj['ErrorCode'] == 'User.015') {
                            window.location = './logout';
                        }
                        Metronic.alert({
                            container: '.msg_result', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: obj['error'], // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                    } else if (obj['result'] == 'true') {
                        $('.profile-usertitle-name').html(profile.name + ' ' + profile.family).fadeIn(300).slideUp(5).fadeIn(300);
                        Metronic.alert({
                            container: '.msg_result', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'success', // alert's type
                            message: 'اطلاعات پروفایل با موفقیت به روز رسانی شد.', // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previous alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'check' // put icon before the message
                        });
                    }
                }
            });
        }
    });

    $('#profile_form input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#profile_form').validate()) {
                $('#profile_form').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleChangePassword = function () {
    $('#password-form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            pass: {
                required: true,
            },
            newpass: {
                required: true,
                minlength: 6,
            },
            renewpass: {
                required: true,
                minlength: 6,
                equalTo: "#newpass"
            }
        },
        messages: {
            pass: {
                required: "رمز عبور فعلی را وارد نمایید."
            },
            newpass: {
                required: "رمز عبور جدید را وارد نمایید.",
                minlength: "حداقل 6 کاراکتر وارد نمایید.",
            },
            renewpass: {
                required: "رمز عبور جدید را دوباره وارد نمایید.",
                minlength: "حداقل 6 کاراکتر وارد نمایید.",
                equalTo: "رمز عبور جدید را عیناً وارد نمایید."
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit

        },
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
            error.insertAfter(element.closest('.form-control'));
        },
        submitHandler: function (form) {
            var pass = $('#pass');
            var newpass = $('#newpass');
            var renewpass = $('#renewpass');
            $.ajax({// Send the credential values to another formHandler.php using Ajax in POST method
                type: 'POST',
                data: {'action': 'pass', 'pass': pass.val(), 'newpass': newpass.val()},
                url: '/profile/changePasswordAjax',
                success: function (responseText) {
                    var obj = JSON.parse(responseText);
                    // Get the result and asign to each cases
                    if (obj['error'] != '') {
                        if (obj['ErrorCode'] == 'User.015') {
                            window.location = './logout';
                        }
                        Metronic.alert({
                            container: '.pass-result', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: obj['error'], // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        $('#pass').focus();
                        $('#pass').parent('div').removeClass('has-success').addClass('has-error');
                        $('#newpass').parent('div').removeClass('has-success').addClass('has-error');
                        $('#renewpass').parent('div').removeClass('has-success').addClass('has-error');
                    }
                    else if (obj['result'] == 'true') {
                        /* Metronic.blockUI({
                         target: 'body',
                         boxed: true,
                         message: 'در حال خروج از سیســتم، لطفاً با رمز عبور جدید وارد شوید.'
                         });*/
                        pass.val('');
                        newpass.val('');
                        renewpass.val('');
                        pass.focus();
                        $('#pass').parent('div').removeClass('has-success');
                        $('#newpass').parent('div').removeClass('has-success');
                        $('#renewpass').parent('div').removeClass('has-success');
                        Metronic.alert({
                            container: '.pass-result', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'success', // alert's type
                            message: obj['message'], // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '5', // auto close after defined seconds
                            icon: 'check' // put icon before the message
                        });
                        $('#alert_password').addClass('hide');

                        /*
                         window.setTimeout(function () {
                         Metronic.unblockUI('body');
                         }, 3000); // 3 seconds

                         window.setTimeout(function () {
                         window.location = 'logout.php';
                         }, 3000); // 3 seconds*/
                    }
                    else if (responseText == 'logout') {
                        window.location = './logout';
                    }
                    else {
                        alert('Problem with web service');
                    }
                }
            });

        }
    });

    $('#password-form input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#password-form').validate()) {
                $('#password-form').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleCompanyEdit = function () {
    $('#company_form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            code: {
                required: true
            },
            title: {
                required: true
            },
            tel: {
                digits: true,
                number: true
            },
            email: {
                email: true
            },
            managerName: {
                required: true
            },
            titleInReport: {
                required: true
            },
            fax: {
                number: true
            },

            mobile: {
                number: true
            },
            economicNo: {
                number: true
            },
            registerNo: {},
            web: {},
            activityDesc: {},
            description: {},
            addr: {}

        },
        messages: {
            code: {
                required: 'کد شرکت را وارد نمایید.'
            },
            title: {
                required: 'عنوان شرکت را وارد نمایید'
            },
            tel: {
                digits: 'لطفاً عدد وارد نمایید.',
                number: 'مقدار معتبر وارد نمایید.'
            },
            email: {
                email: "لطفاً یک ایمیل معتبر وارد نمایید."
            },
            managerName: {
                required: 'نام مدیرعامل را وارد نمایید.'
            },
            titleInReport: {
                required: 'عنوان در گزارشات را وارد نمایید.'
            },
            fax: {
                number: 'مقدار معتبر وارد نمایید.'
            },
            mobile: {
                number: 'مقدار معتبر وارد نمایید.'
            },
            economicNo: {
                number: 'مقدار معتبر وارد نمایید.'
            },

        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('#profile_form')).show();
        },
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
            error.insertAfter(element.closest('.form-control'));
        },
        submitHandler: function (form) {
            var data_form = new FormData(form);
            data_form.append('company', 'company');
            $.ajax({
                url: "/company/companyAjax", // Url to which the request is send
                type: "POST", // Type of request to be send, called as method
                data: data_form, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                contentType: false, // The content type used when sending data to the server.
                cache: false, // To unable request pages to be cached
                processData: false, // To send DOMDocument or non processed data file it is set to false
                success: function (responseText)   // A function to be called if request succeeds
                {
                    console.log(responseText);
                    var obj = JSON.parse(responseText);
                    if (obj['error'] != '') {
                        if (obj['ErrorCode'] == 'User.015') {
                            window.location = './logout';
                        }
                        Metronic.alert({
                            container: '.msg_result', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: obj['error'], // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                    } else if (obj['result'] == 'true') {
                        Metronic.alert({
                            container: '.msg_result', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'success', // alert's type
                            message: obj['message'], // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'check' // put icon before the message
                        });
                    }
                }
            });
        }
    });

    $('#profile_form input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#profile_form').validate()) {
                $('#profile_form').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleAddVoucher = function () {


    $('.usr-submit').on("click", function () {
        var submited = $(this).val();
        if (submited == "note-submit")
            $('#sanad_date').rules('remove', 'remote');
        else
            $('#sanad_date').rules('add', {
                remote: {
                    url: siteUrl + "financialPeriod/checkDatePeriodOfVoucher",
                    type: "post",
                    data: {
                        submited: function () {
                            return submited;
                        }
                    }
                }
            });
    });

    $('#voucher').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block col-lg-offset-4', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            sanad_date: {
                required: true,
                dateISO: true,
                remote: {
                    url: siteUrl + "financialPeriod/checkDatePeriodOfVoucher",
                    type: "post",
                }
            },
            manual_code: {
                required: false,
                number: true
            },
            sanad_code: {
                required: false
            },
            sanad_type: {
                required: true,
            },
            atf: {
                required: true
            },
            voucher_code: {
                required: function () {
                    if ($('input[name="atf"]:checked').val() === 'sanad') {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            description: {
                required: false,
            }
        },
        messages: {
            sanad_date: {
                required: 'پر کردن فیلد تاریخ سند الزامی است.',
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.',
                remote: 'تاریخ سند باید در بازه دوره مالی انتخاب شده برای سیستم باشد.'
            },
            manual_code: {
                number: 'شماره دستی فقط می تواند عدد باشد.',
            },
            sanad_code: {},
            sanad_type: {
                required: 'پر کردن فیلد نوع سند الزامی است.',
            },
            atf: {},
            voucher_code: {
                required: 'شماره سند را انتخاب نمایید'
            },
            description: {}
        },
        invalidHandler: function (event, validator) { //display error alert on form submit

        },
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
            //table highlight
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error').addClass('has-success');
            label.remove();
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.col-md-9'));
        },
        submitHandler: function (form) {

            // console.log('dorost :'+ $('#sanad_date').val());
            // console.log('eshteba :'+ $('#takmili_1').attr('data-takmiliDate'));
            // return false;
            if ($('#tbody_details').find('tr').data('counter') == undefined) {
                Metronic.alert({
                    container: '#vocher_alert', // alerts parent container(by default placed after the page breadcrumbs)
                    place: 'append', // append or prepent in container
                    type: 'danger', // alert's type
                    message: 'لطفا جهت ثبت سند سطرهاي سند را وارد کنيد', // alert's message
                    close: '1', // make alert closable
                    reset: '1', // close all previouse alerts first
                    focus: '1', // auto scroll to the alert after shown
                    closeInSeconds: '3', // auto close after defined seconds
                    icon: 'warning' // put icon before the message
                });
                return false;
            }

            // voucher
            var dataM = {};
            var status = $("button[clicked=true]").val();
            var id = $('#id_voucher').val();
            // dataM['id'] ='989020';
            if (id != 0) {
                dataM['id'] = id;
            }
            if (status == 'sanad-submit') {
                dataM['statusVoucherId'] = '2';
            }
            else {
                dataM['statusVoucherId'] = '1';
            }

            dataM['voucherDate'] = $('#sanad_date').val();
            dataM['manualCode'] = $('#manual_code').val();
            dataM['voucherTypeId'] = $('#voucherType_selection').attr('data-id-vouchertype');
            dataM['description'] = $('#description').val().replace(/"/g, '\'');


            // voucher line
            var i = 1;
            var dataD = {};

            $('#tbody_details').find('tr').each(function () {
                var id = $(this).data('counter');
                var item = {};
                //console.log(id);
                item['fullCode'] = $('#fullCode_' + id).val();
                item['row'] = i;
                item['accountTopicKolId'] = $('#topic_kol_selection_' + id).attr('data-id-kol');
                item['accountTopicMoeinId'] = $('#topic_moein_selection_' + id).attr('data-id-moein');
                item['accountTopicTafsili1Id'] = $('#tafsiliInput1_' + id).attr('data-id-tafsili');
                item['accountTopicTafsili2Id'] = $('#tafsiliInput2_' + id).attr('data-id-tafsili');
                item['accountTopicTafsili3Id'] = $('#tafsiliInput3_' + id).attr('data-id-tafsili');
                item['accountTopicTafsili4Id'] = $('#tafsiliInput4_' + id).attr('data-id-tafsili');
                item['costCenterID'] = $('#takmili_' + id).attr('data-markaz');
                item['amount'] = $('#takmili_' + id).attr('data-takmilinumber');
                item['lineDate'] = $('#takmili_' + id).attr('data-takmiliDate');
                item['bed'] = $('#bed' + id).val();
                item['bes'] = $('#bes' + id).val();
                item['description'] = $('#description_' + id).val().replace(/"/g, '\'');

                item['bes'] = item['bes'].trim().replace(/,/g, '');
                item['bed'] = item['bed'].trim().replace(/,/g, '');

                dataD[i] = item;
                i++;
            });


            var data = [dataM, dataD];

            //console.log(data);

            Metronic.blockUI({
                target: 'body',
                boxed: true,
                message: 'در حال ثبت...'
            });

            $.ajax({
                type: 'POST',
                data: {addVoucher: 'true', data: JSON.stringify(data)},
                url: '/voucher/saveAjax',
                success: function (responseText) {
                    var data = JSON.parse(responseText);
                    if (data.error == '' && data.result == 'true') {
                        window.location = '/voucher/add?id=' + data.voucherid + '&succ=succ&voucherCode=' + data.vouchercode + '&voucherDate=' + dataM['voucherDate'] + '&manualCode=' + dataM['manualCode'] + '&voucherCode2=' + data.vouchercode2;
                        // if(id == 0){
                        //     window.location = '/voucher/add?id='+data.voucherid+'&succ=succ&voucherCode='+data.vouchercode+'&voucherDate='+dataM['voucherDate']+'&manualCode='+ dataM['manualCode']+ '&voucherCode2='+data.vouchercode2;
                        // }
                        // else{
                        //     window.location = '/voucher/add?id='+data.voucherid+'&succ=succ&voucherCode='+data.vouchercode+'&voucherDate='+dataM['voucherDate']+'&manualCode='+ dataM['manualCode']+ '&voucherCode2='+data.vouchercode2+ '&update=true';
                        // }
                    }

                    else {
                        Metronic.alert({
                            container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: data.error, // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                    }
                    Metronic.unblockUI('body');
                }
            });


            // var table = $('#table_details').DataTable();
            // var data = table.rows().data();
            // if (data.length > 0) {
            //     alert(data[0][2]);
            //     /*
            //      *
            //      *
            //      *  var dataform = new FormData(form);
            //      dataform.append('edituser', 'edituser');
            //      data: $('#profile_form').serialize();
            //      */
            //
            // } else {
            //     Metronic.alert({
            //         container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
            //         place: 'append', // append or prepent in container
            //         type: 'danger', // alert's type
            //         message: "لطفاً جهت ثبت سند، سطرهای سند را وارد نمایید.", // alert's message
            //         close: '1', // make alert closable
            //         reset: '1', // close all previouse alerts first
            //         focus: '1', // auto scroll to the alert after shown
            //         closeInSeconds: '5', // auto close after defined seconds
            //         icon: 'warning' // put icon before the message
            //     });
            // }
        }
    });

    $('#voucher input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#voucher').validate()) {
                $('#voucher').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleReportKol = function () {
    $('#report').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block col-lg-offset-3', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            /*topic_selection: {
             required: true
             },*/
            item_per_page: {
                required: true,
                maxlength: 2,
                min: 1
            },
            fromdate: {
                required: false,
                dateISO: true
            },
            todate: {
                dateISO: true,
                greaterThanDate: '#fromdate'
            },
            fromvoucher: {
                required: false,
                number: true

            },
            tovoucher: {
                required: false,
                min: function () {
                    var y = $('#fromvoucher').val();
                    if (y != null && y != '') {
                        return parseInt($('#fromvoucher').val())
                    }
                    return true
                },
                number: true
            },
            from_voucherId: {
                number: true
            },
            to_voucherId: {
                number: true,
                min: function () {
                    y = $('#from_voucherId').val();
                    if (y != null && y != '') {
                        return parseInt(y)
                    }
                    return true
                }
            }
        },
        messages: {
            topic_selection: {
                required: 'لطفاً سرفصل را انتخاب نمایید.'
            },
            item_per_page: {
                required: 'تعداد سطر در هر صفحه را وارد نمایید.',
                maxlength: 'لطفاً یک عدد دو رقمی وارد نمایید.',
                min: 'لطفا عدد بزرگتر از 1 وارد کنید'
            },
            fromdate: {
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.'
            },
            todate: {
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.',
                greaterThanDate: 'لطفاً تاریخی بزرگتر از فیلد "از تاریخ" وارد نمایید.'
            },
            fromvoucher: {
                number: 'لطفاً عدد وارد نمایید.'
            },
            tovoucher: {
                min: 'لطفاً عددی بزرگتر از عدد "از شماره سند" وارد نمایید.',
                number: 'لطفاً عدد وارد نمایید.'
            },

            from_voucherId: {
                number: 'لطفاً عدد وارد نمایید.'
            },
            to_voucherId: {
                min: 'لطفاً عددی بزرگتر از عدد "از شماره ثابت سند" وارد نمایید.',
                number: 'لطفاً عدد وارد نمایید.'
            }

        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.col-md-9'));
        },
        submitHandler: function (form) {

            // event.preventDefault();
            var query = {};
            if (document.getElementById('merge').checked) {
                query.merge = 'true';
            } else {
                query.merge = 'false';
            }
            if (document.getElementById('status_voucher').checked) {
                query.status_voucher = '3';
            } else {
                query.status_voucher = '3,2';
            }
            if (document.getElementById('zerovalueinfirst').checked) {
                query.zerovalueinfirst = 'true';
            } else {
                query.zerovalueinfirst = 'false';
            }
            if (document.getElementById('voucher_desc').checked) {
                query.voucher_desc = 'true';
            } else {
                query.voucher_desc = 'false';
            }
            if (document.getElementById('voucherline_desc').checked) {
                query.voucherline_desc = 'true';
            } else {
                query.voucherline_desc = 'false';
            }
            if (document.getElementById('batchnumber').checked) {
                query.batchnumber = 'true';
            } else {
                query.batchnumber = 'false';
            }
            if (document.getElementById('manual_code').checked) {
                query.manual_code = 'true';
            } else {
                query.manual_code = 'false';
            }
            if (document.getElementById('noseparate').checked) {
                query.noseparate = 'true';
            } else {
                query.noseparate = 'false';
            }
            if (document.getElementById('orderby_bed_bes').checked) {
                query.orderby_bed_bes = 'true';
            } else {
                query.orderby_bed_bes = 'false';
            }

            if (document.getElementById('show_company_title').checked) {
                query.show_company_title = 'true';
            } else {
                query.show_company_title = 'false';
            }
            if (document.getElementById('show_company_logo').checked) {
                query.show_company_logo = 'true';
            } else {
                query.show_company_logo = 'false';
            }

            var selectedType = new Array();
            $('input[name="type[]"]:checked').each(function () {
                selectedType.push(this.value);
            });
            //alert(selectedType);


            var allTopicId = new Array();
            var allTopicCode = new Array();
            var allTopicTitle = new Array();
            $('input[name="topic[]"]').each(function () {
                allTopicId.push(this.value);
            });
            $('input[name="topic[]"]').each(function () {
                allTopicCode.push($(this).attr('data-code'));
            });
            $('input[name="topic[]"]').each(function () {
                allTopicTitle.push($(this).attr('data-title'));
            });
            $('#allTopicId').attr('data-id', allTopicId);
            $('#allTopicCode').attr('data-code', allTopicCode);
            $('#allTopicTitle').val(allTopicTitle);

            selectedType = new Array();
            $('input[name="vouchertype[]"]:checked').each(function () {
                selectedType.push(this.value);
            });

            query.voucherType = selectedType.toString();

            query.allTopicId = $('#allTopicId').attr('data-id');
            query.allTopicCode = $('#allTopicCode').attr('data-code');
            query.allTopicTitle = $('#allTopicTitle').val();

            query.topic_selection = $('#topic_selection').val();
            query.topic_selection_id = $('#topic_selection').attr('data-id');
            query.topic_selection_code = $('#topic_selection').attr('data-code');
            query.item_per_page = $('#item_per_page').val();
            query.fromdate = $('#fromdate').val();
            query.todate = $('#todate').val();
            query.fromvoucher = $('#fromvoucher').val();
            query.tovoucher = $('#tovoucher').val();
            query.from_voucherId = $('#from_voucherId').val();
            query.to_voucherId = $('#to_voucherId').val();
            Metronic.blockUI({
                target: 'body',
                boxed: true,
                message: 'در حال بارگذاری...'
            });
            $.ajax({
                type: 'POST',
                data: {query: JSON.stringify(query)},
                url: '/kol/queryAjax',
                success: function (responseText) {
                    window.location = '/kol/report';
                }
            });

        }
    });

    $('#report input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#report').validate()) {
                $('#report').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleReportMoien = function () {

    $('#report_moien').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block col-lg-offset-3', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            /*topic_selection: {
             required: true
             },*/
            item_per_page: {
                required: true,
                maxlength: 2,
                min: 1
            },
            fromdate: {
                required: false,
                dateISO: true
            },
            todate: {
                dateISO: true,
                greaterThanDate: '#fromdate'
            },
            fromvoucher: {
                number: true
            },
            tovoucher: {
                min: function () {
                    var y = $('#fromvoucher').val();
                    if (y != null && y != '') {
                        return parseInt($('#fromvoucher').val())
                    }
                    return true
                },
                number: true
            },

            from_voucherId: {
                number: true
            },
            to_voucherId: {
                number: true,
                min: function () {
                    y = $('#from_voucherId').val();
                    if (y != null && y != '') {
                        return parseInt(y)
                    }
                    return true
                }
            }

        },
        messages: {
            topic_selection: {
                required: 'لطفاً سرفصل را انتخاب نمایید.'
            },
            item_per_page: {
                required: 'تعداد سطر در هر صفحه را وارد نمایید.',
                maxlength: 'لطفاً یک عدد دو رقمی وارد نمایید.',
                min: 'لطفا عدد بزرگتر از 1 وارد کنید'
            },
            fromdate: {
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.'
            },
            todate: {
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.',
                greaterThanDate: 'لطفاً تاریخی بزرگتر از فیلد "از تاریخ" وارد نمایید.'
            },
            fromvoucher: {
                number: 'لطفاً عدد وارد نمایید.'

            },
            tovoucher: {
                min: 'لطفاً عددی بزرگتر از عدد "از شماره سند" وارد نمایید.',
                number: 'لطفاً عدد وارد نمایید.'
            },

            from_voucherId: {
                number: 'لطفاً عدد وارد نمایید.'
            },
            to_voucherId: {
                min: 'لطفاً عددی بزرگتر از عدد "از شماره ثابت سند" وارد نمایید.',
                number: 'لطفاً عدد وارد نمایید.'
            }

        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.col-md-9'));
        },
        submitHandler: function (form) {
            // event.preventDefault();

            var query = {};

            if (document.getElementById('zerovalueinfirst').checked) {
                query.zerovalueinfirst = 'true';

            } else {
                query.zerovalueinfirst = 'false';
            }
            if (document.getElementById('voucher_desc').checked) {
                query.voucher_desc = 'true';
            } else {
                query.voucher_desc = 'false';
            }
            if (document.getElementById('voucherline_desc').checked) {
                query.voucherline_desc = 'true';
            } else {
                query.voucherline_desc = 'false';
            }
            if (document.getElementById('batchnumber').checked) {
                query.batchnumber = 'true';
            } else {
                query.batchnumber = 'false';
            }
            if (document.getElementById('ManualCode').checked) {
                query.ManualCode = 'true';
            } else {
                query.ManualCode = 'false';
            }

            if (document.getElementById('orderby_bed_bes').checked) {
                query.orderby_bed_bes = 'true';
            } else {
                query.orderby_bed_bes = 'false';
            }

            if (document.getElementById('show_company_title').checked) {
                query.show_company_title = 'true';
            } else {
                query.show_company_title = 'false';
            }
            if (document.getElementById('show_company_logo').checked) {
                query.show_company_logo = 'true';
            } else {
                query.show_company_logo = 'false';
            }

            if (document.getElementById('status_voucher').checked) {
                query.status_voucher = '3';
            } else {
                query.status_voucher = '3,2';
            }

            var allTopicId = new Array();
            var allTopicCode = new Array();
            var allTopicTitle = new Array();
            $('input[name="topic[]"]').each(function () {
                allTopicId.push(this.value);
            });
            $('input[name="topic[]"]').each(function () {
                allTopicCode.push($(this).attr('data-code'));
            });
            $('input[name="topic[]"]').each(function () {
                allTopicTitle.push($(this).attr('data-title'));
            });
            $('#allTopicId').attr('data-id', allTopicId);
            $('#allTopicCode').attr('data-code', allTopicCode);
            $('#allTopicTitle').val(allTopicTitle);

            var selectedType = new Array();
            $('input[name="vouchertype[]"]:checked').each(function () {
                selectedType.push(this.value);
            });


            query.voucherType = selectedType.toString();

            query.topic_selection = $('#topic_selection').val();
            query.topic_selection_id = $('#topic_selection').attr('data-id');
            query.topic_selection_code = $('#topic_selection').attr('data-code');

            query.allTopicId = $('#allTopicId').attr('data-id');
            query.allTopicCode = $('#allTopicCode').attr('data-code');
            query.allTopicTitle = $('#allTopicTitle').val();

            query.item_per_page = $('#item_per_page').val();
            query.fromdate = $('#fromdate').val();
            query.todate = $('#todate').val();
            query.fromvoucher = $('#fromvoucher').val();
            query.tovoucher = $('#tovoucher').val();

            query.from_voucherId = $('#from_voucherId').val();
            query.to_voucherId = $('#to_voucherId').val();
            // console.log(query);
            // return false;
            Metronic.blockUI({
                target: 'body',
                boxed: true,
                message: 'در حال بارگذاری...'
            });
            $.ajax({
                type: 'POST',
                data: {query_m: JSON.stringify(query)},
                url: '/moein/queryAjax',
                success: function (responseText) {
                    window.location = '/moein/report';
                },
                error: function () {
                }
            });

        }
    });

    $('#report_moien input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#report_moien').validate()) {
                $('#report_moien').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleReportvoucher = function () {
    $('#report1').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block col-lg-offset-3', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            fromdate: {
                dateISO: true,
            },
            todate: {
                dateISO: true,
                greaterThanDate: '#fromdate'
            },
            /*controlFromdate: {
             dateISO: true,
             },
             controlTodate: {
             dateISO: true,
             greaterThanDate: '#controlFromdate'
             },*/
            fromvoucher: {
                number: true
            },
            tovoucher: {
                min: function () {
                    var y = $('#fromvoucher').val();
                    if (y != null && y != '') {
                        return parseInt($('#fromvoucher').val())
                    }
                    return true
                },
                number: true
            },

            from_voucherId: {
                number: true
            },
            to_voucherId: {
                number: true,
                min: function () {
                    y = $('#from_voucherId').val();
                    if (y != null && y != '') {
                        return parseInt(y)
                    }
                    return true
                }
            },
            fromRef: {
                number: true
            },
            toRef: {
                min: function () {
                    y = $('#fromRef').val();
                    if (y != null && y != '') {
                        return parseInt($('#fromRef').val())
                    }
                    return true
                },
                number: true
            },
            /* ctrlAmountFrom: {
             number: true
             },
             ctrlAmountTo: {
             min: function () {
             y = $('#ctrlAmountFrom').val();
             if (y != null && y != '') {
             return parseInt($('#ctrlAmountFrom').val())
             }
             return true
             },
             number: 'لطفاً مقدار معتبر وارد کنید'
             },*/
            fromPrice: {
                pattern: true
            },
            toPrice: {
                greaterThanPrice: '#fromPrice',
                pattern: true
            },
            item_per_page: {
                number: true,
                range: [1, 10]
            },

        },
        messages: {
            fromdate: {
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.',
            },
            todate: {
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.',
                greaterThanDate: 'لطفاً تاریخی بزرگتر از فیلد "از تاریخ" وارد نمایید.'
            },
            /* controlFromdate: {
             dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.',
             },
             controlTodate: {
             dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.',
             greaterThanDate: 'لطفاً تاریخی بزرگتر از فیلد "از تاریخ کنترلی" وارد نمایید.'
             },*/
            fromvoucher: {
                number: 'لطفاً عدد وارد نمایید.'

            },
            tovoucher: {
                min: 'لطفاً عددی بزرگتر از عدد "از شماره سند" وارد نمایید.',
                number: 'لطفاً عدد وارد نمایید.'
            },

            from_voucherId: {
                number: 'لطفاً عدد وارد نمایید.'
            },
            to_voucherId: {
                min: 'لطفاً عددی بزرگتر از عدد "از شماره ثابت سند" وارد نمایید.',
                number: 'لطفاً عدد وارد نمایید.'
            },
            fromRef: {
                number: 'لطفاً عدد وارد نمایید.'
            },
            toRef: {
                min: 'لطفاً عددی بزرگتر از عدد "از شماره عطف" وارد نمایید.',
                number: 'لطفاً عدد وارد نمایید.'
            },
            /*ctrlAmountFrom: {
             number: 'لطفاً عدد وارد نمایید.'
             },
             ctrlAmountTo: {
             min: 'لطفاً عددی بزرگتر از عدد "از مقدار کنترلی" وارد نمایید.',
             number: 'لطفاً عدد وارد نمایید.'
             },*/
            fromPrice: {
                number: 'لطفاً عدد وارد نمایید.'
            },
            toPrice: {
                greaterThanPrice: 'لطفاً عددی بزرگتر از عدد "از مبلغ" وارد نمایید.',
                number: 'لطفاً عدد وارد نمایید.'
            },
            item_per_page: {
                number: 'مقدار معتبر وارد کنید',
                range: 'مقدار عددی بین 1 تا 10 وارد کنید'
            },
        },

        /*submitHandler: function (form) {

         var query = {};
         query.topic_tafsili_code1 = $("#topic_tafsili_event1").attr('data-code');
         query.topic_tafsili_code2 = $("#topic_tafsili_event2").attr('data-code');
         query.topic_tafsili_code3 = $("#topic_tafsili_event3").attr('data-code');
         query.topic_tafsili_code4 = $("#topic_tafsili_event4").attr('data-code');
         $.ajax({
         type: 'POST',
         data: {query_tafsili: JSON.stringify(query)},
         url: 'formHandler.php',
         success: function (responseText) {
         window.location = 'tafsili_report.php';
         }
         });
         },*/

        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        succetestss: function (label) {

            label.closest('.form-group').removeClass('has-error').addClass('has-success');
            label.remove();
        },

        invalidHandler: function (e, validator) {
            if (validator.errorList.length)
                $('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show')
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.error_place'));
        },
        showErrors: function () {
            this.defaultShowErrors();
            $('#small').modal('hide');
        }
    });

    $('#report1 input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#report1').validate()) {
                $('#report1').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleAddTime = function () {
    $('#add_time').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block col-lg-offset-3', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            fromdate: {
                required: true,
                dateISO: true
            },
            todate: {
                required: true,
                dateISO: true,
                greaterThanDate: '#fromdate'
            },
            percentFrom_number: {
                required: true,
                digits: true,
                min: 0,
            },
            percentTo_number: {
                required: true,
                digits: true,
                greaterThan: '#percentFrom_number',
                min: 0,
            },
            time: {
                required: true,
                timeISO: true,
                timeISO2: true
            },
            week_selection: {
                required: true
            },
            company_selection: {
                required: true
            },

        },
        messages: {
            fromdate: {
                required: 'لطفاً یک تاریخ معتبر وارد نمایید.',
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.',
            },
            todate: {
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.',
                required: 'لطفاً یک تاریخ معتبر وارد نمایید.',
                greaterThanDate: 'لطفاً تاریخی بزرگتر از فیلد "از تاریخ" وارد نمایید.',
            },
            percentFrom_number: {
                required: 'لطفا یک عدد وارد نمایید.',
                digits: 'لطفا یک عدد وارد نمایید.',
                min: 'لطفا عددی بزرگ تر یا مساوی 0 وارد نمایید. '
            },
            percentTo_number: {
                required: 'لطفا یک درصد وارد نمایید.',
                digits: 'لطفا یک عدد وارد نمایید.',
                greaterThan: 'لطفاً عددی بزرگتر از فیلد "از تعداد" وارد نمایید.',
                min: 'لطفا عددی بزرگ تر یا مساوی 0 وارد نمایید. '
            },
            time: {
                timeISO2: 'تنها مجاز به وارد کردن دقيقه صفر يا سي مي باشيد',
                timeISO: 'لطفاً یک زمان معتبر وارد نمایید.',
                required: 'لطفاً یک زمان معتبر وارد نمایید.',
            },
            week_selection: {
                required: 'حداقل یک روز را انتخاب نمایید.'
            },
            company_selection: {
                required: 'حداقل یک شرکت را انتخاب نمایید.'
            },
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.col-md-9'));
        },
        submitHandler: function (form) {
            var dataform = new FormData(form);
            dataform.append('workType', $("#type").attr("data-id"));
            dataform.append('week_selection_id', $("#week_selection").attr("data-id"));
            dataform.append('company_selection_id', $("#company_selection").attr("data-id"));
            dataform.append('company_selection_code', $("#company_selection").attr("data-code"));
            dataform.append('addTime', 'addTime');
            //console.log(dataform); return false;
            $.ajax({
                url: "/time/save", // Url to which the request is send
                type: "POST", // Type of request to be send, called as method
                data: dataform, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                contentType: false, // The content type used when sending data to the server.
                cache: false, // To unable request pages to be cached
                processData: false, // To send DOMDocument or non processed data file it is set to false
                success: function (dataJ)   // A function to be called if request succeeds
                {
                    // console.log(dataJ);
                    var data = JSON.parse(dataJ);
                    // console.log(data);
                    if (data.result == 'true') {
                        window.location = '/time?succ=succ';
                        // alert(data.message);
                    }
                    else {
                        Metronic.alert({
                            container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: data.message, // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '10', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                    }

                }
            });

        }
    });

    $('#add_time input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#add_time').validate()) {
                $('#add_time').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleFasli = function () {
    $('.report2').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        ignore: "",
        rules: {
            year: {
                number: true,
                range: [1300, 1800]
            },
            registerNo: {
                required: true,
                number: true
            },
            article_desc: {
                required: true
            },
            todate: {
                greaterThanDate: '#fromdate'
            },
            // todate_ret: {
            //     greaterThanDate: '#fromdate_ret'
            // },
            tovoucher: {
                min: function () {
                    y = $('#fromvoucher').val();
                    if (y != null && y != '') {
                        return parseInt($('#fromvoucher').val())
                    }
                    return true
                },
            },
            // tovoucher_ret: {
            //     min: function () {
            //         x = $('#fromvoucher_ret').val();
            //         if (x != null && x != '') {
            //             return parseInt($('#fromvoucher_ret').val())
            //         }
            //         return true
            //     },
            // },
            limit_price: {
                //   pattern: true
            },
            to_price: {
                //   pattern: true,
                greaterThanPrice: '#from_price',
            },
            from_price: {
                //   pattern: true
            },
            managerName: {
                required: true
            },
            party_select: {
                //       required: true
            },

            activityDesc: {
                required: true
            },
            customer_name: {
                required: true
            },
            ostan: {
                required: true
            },
            fax: {
                required: true,
                number: true
            },
            city: {
                required: true
            },
            country: {
                required: true
            },
            pre_number_phone: {
                required: true,
                number: true
            },
            tel: {
                required: true,
                number: true
            },
            mobile: {
                required: true,
                number: true
            },
            iran_code: {
                required: true,
                number: true
            },
            city_darai: {
                required: true,
            },
            EdareKolCode: {
                required: true,
            },
            zip_code: {
                required: true,
                number: true
            },
            route_access_file: {
                required: true
            },
            addr: {
                required: true
            },
            username: {
                //  required: true
            },
            economicNo: {
                required: true,
                number: true
            },
        },
        messages: {
            year: {
                number: "مقدار سال را درست وارد کنید",
                range: "محدوده سال را درست وارد کنید"
            },
            registerNo: {
                required: "درج مقدار برای شماره ثبت الزامی میباشد",
                number: "مقدار معتبر وارد کنید "
            },
            party_select: {
                //    required: "نام مشتری را انتخاب کنید"
            },
            article_desc: {
                required: " درج مقدار براي شرح نوع کالا الزامي میباشد "
            },
            todate: {
                greaterThanDate: "مقدار فیلد سند از تاریخ نباید از فیلد تا تاریخ بزرگتر باشد"
            },
            todate_ret: {
                greaterThanDate: "مقدار فیلد سند برگشتی از تاریخ نباید از فیلد تا تاریخ بزرگتر باشد"
            },
            tovoucher: {
                min: "مقدار فیلد سند از شماره  نباید از فیلد تا شماره بزرگتر باشد",
            },
            tovoucher_ret: {
                min: "مقدار فیلد سند برگشتی از شماره  نباید از فیلد تا شماره بزرگتر باشد",
            },
            to_price: {
                greaterThanPrice: 'مقدار فیلد از مبلغ نباید از فیلد تا مبلغ بزرگتر باشد.'
            },
            managerName: {
                required: "درج مقدار برای مودی اصلی/مدیر عامل اجباری میباشد"
            },
            activityDesc: {
                required: "درج مقدار برای نوع فعالیت الزامی میباشد"
            },
            customer_name: {
                required: "درج مقدار برای نوع فروشنده/خریدار الزامی میباشد"
            },
            ostan: {
                required: "درج مقدار برای  استان الزامی میباشد"
            },
            fax: {
                required: "درج مقدار برای فکس الزامی میباشد",
                number: "مقدار معتبر وارد کنید "
            },
            city: {
                required: "درج مقدار برای شهر الزامی میباشد"
            },
            country: {
                required: "درج مقدار برای کشور الزامی میباشد"
            },
            pre_number_phone: {
                required: "درج مقدار برای پیش شمار الزامی میباشد",
                number: "مقدار معتبر وارد کنید "
            },
            tel: {
                required: "درج مقدار برای تلفن الزامی میباشد",
                number: "مقدار معتبر وارد کنید "
            },
            mobile: {
                required: "شماره تلفن را وارد نمایید. ",
                number: "مقدار معتبر وارد کنید "
            },
            iran_code: {
                required: "درج مقدار برای تلفن همراه الزامی میباشد",
                number: "مقدار معتبر وارد کنید "
            },
            city_darai: {
                required: 'درج مقدار برای استان/شهر الزامی میباشد',
            },
            EdareKolCode: {
                required: 'درج مقدار برای اداره امور مالیاتی الزامی میباشد',
            },
            zip_code: {
                required: "درج مقدار برای کدپستی الزامی میباشد",
                number: "مقدار معتبر وارد کنید "
            },
            route_access_file: {
                required: "فایل دیسکت دارایی را انتخاب نمایید",
            },
            addr: {
                required: "درج مقدار برای آدرس الزامی میباشد"
            },
            username: {
                // required: "درج مقدار برای  نام کاربری الزامی میباشد"
            },
            economicNo: {
                required: "درج مقدار برای کد اقتصادی الزامی میباشد",
                number: "مقدار معتبر وارد کنید "
            },
        },
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        succetestss: function (label) {
            label.closest('.form-group').removeClass('has-error').addClass('has-success');
            label.remove();
        },

        invalidHandler: function (e, validator) {
            if (validator.errorList.length)
                $('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show')
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.error_place'));
        },
        showErrors: function () {
            this.defaultShowErrors();
            $('#small').modal('hide');
        }
    });
};

var handleFasliTransfer = function () {
    $('#submittransfer').click(function () {
        $('.report2').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: true, // false: do not focus the last invalid input
            ignore: "",
            rules: {
                year: {
                    number: true,
                    range: [1300, 1800]
                },
                registerNo: {
                    required: true,
                    number: true
                },
                article_desc: {
                    required: true
                },
                todate: {
                    greaterThanDate: '#fromdate'
                },
                todate_ret: {
                    greaterThanDate: '#fromdate_ret'
                },
                tovoucher: {
                    min: function () {
                        y = $('#fromvoucher').val();
                        if (y != null && y != '') {
                            return parseInt($('#fromvoucher').val())
                        }
                        return true
                    },
                },
                tovoucher_ret: {
                    min: function () {
                        x = $('#fromvoucher_ret').val();
                        if (x != null && x != '') {
                            return parseInt($('#fromvoucher_ret').val())
                        }
                        return true
                    },
                },
                limit_price: {
                    //   pattern: true
                },
                to_price: {
                    pattern: true,
                    min: function () {
                        x = $('#from_price').val();
                        if (x != null && x != '') {
                            var test = x.replace(/,/g, '');
                            return parseInt(test);
                        }
                        return true
                    },
                },
                from_price: {
                    pattern: true
                },
                managerName: {
                    required: true
                },
                'party_name[]': {
                    //   required: true
                },
                activityDesc: {
                    required: true
                },
                customer_name: {
                    required: true
                },
                ostan: {
                    required: true
                },
                fax: {
                    required: true,
                    number: true
                },
                city: {
                    required: true
                },
                country: {
                    required: true
                },
                pre_number_phone: {
                    required: true,
                    number: true
                },
                tel: {
                    required: true,
                    number: true
                },
                mobile: {
                    required: true,
                    number: true
                },
                iran_code: {
                    required: true,
                    number: true
                },
                zip_code: {
                    required: true,
                    number: true
                },
                addr: {
                    required: true,
                },
                username: {
                    //  required: true
                },
                economic_code: {
                    required: true,
                    number: true
                },
            },
            messages: {
                year: {
                    number: "مقدار سال را درست وارد کنید",
                    range: "محدوده سال را درست وارد کنید"
                },
                registerNo: {
                    required: "درج مقدار برای شماره ثبت الزامی میباشد",
                    number: "مقدار معتبر وارد کنید "
                },
                'party_name[]': {
                    //  required: "حداقل یک مشتری انتخاب شود. "
                },
                article_desc: {
                    required: " درج مقدار براي شرح نوع کالا الزامي میباشد "
                },
                todate: {
                    greaterThanDate: "مقدار فیلد سند از تاریخ نباید از فیلد تا تاریخ بزرگتر باشد"
                },
                todate_ret: {
                    greaterThanDate: "مقدار فیلد سند برگشتی از تاریخ نباید از فیلد تا تاریخ بزرگتر باشد"
                },
                tovoucher: {
                    min: "مقدار فیلد سند از شماره  نباید از فیلد تا شماره بزرگتر باشد",
                },
                tovoucher_ret: {
                    min: "مقدار فیلد سند برگشتی از شماره  نباید از فیلد تا شماره بزرگتر باشد",
                },
                to_price: {
                    min: 'مقدار فیلد از مبلغ نباید از فیلد تا مبلغ بزرگتر باشد.'
                },
                managerName: {
                    required: "درج مقدار برای مودی اصلی/مدیر عامل اجباری میباشد"
                },
                activityDesc: {
                    required: "درج مقدار برای نوع فعالیت الزامی میباشد"
                },
                customer_name: {
                    required: "درج مقدار برای نوع فروشنده/خریدار الزامی میباشد"
                },
                ostan: {
                    required: "درج مقدار برای  استان الزامی میباشد"
                },
                fax: {
                    required: "درج مقدار برای فکس الزامی میباشد",
                    number: "مقدار معتبر وارد کنید "
                },
                city: {
                    required: "درج مقدار برای شهر الزامی میباشد"
                },
                country: {
                    required: "درج مقدار برای کشور الزامی میباشد"
                },
                pre_number_phone: {
                    required: "درج مقدار برای پیش شمار الزامی میباشد",
                    number: "مقدار معتبر وارد کنید "
                },
                tel: {
                    required: "درج مقدار برای تلفن الزامی میباشد",
                    number: "مقدار معتبر وارد کنید "
                },
                mobile: {
                    required: "شماره تلفن را وارد نمایید. ",
                    number: "مقدار معتبر وارد کنید "
                },
                iran_code: {
                    required: "درج مقدار برای تلفن همراه الزامی میباشد",
                    number: "مقدار معتبر وارد کنید "
                },
                zip_code: {
                    required: "درج مقدار برای کدپستی الزامی میباشد",
                    number: "مقدار معتبر وارد کنید "
                },
                addr: {
                    required: "درج مقدار برای آدرس الزامی میباشد"
                },
                username: {
                    // required: "درج مقدار برای  نام کاربری الزامی میباشد"
                },
                economicNo: {
                    required: "درج مقدار برای کد اقتصادی الزامی میباشد",
                    number: "مقدار معتبر وارد کنید "
                },
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            succetestss: function (label) {
                label.closest('.form-group').removeClass('has-error').addClass('has-success');
                label.remove();
            },

            invalidHandler: function (e, validator) {
                if (validator.errorList.length)
                    $('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show')
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.error_place'));
            },
            showErrors: function () {
                this.defaultShowErrors();
                $('#small').modal('hide');
            }
        });

    });
};

var handleFasliSearch = function () {
    $('#submitsearch').click(function () {
        $('div').closest('.form-group').removeClass('has-error');
        /* $('.form-control').closest('.form-group').removeClass('has-error');*/

        $('.report2').validate({

            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: true, // false: do not focus the last invalid input
            ignore: "",
            rules: {
                year: {
                    number: true,
                    range: [1300, 1800]
                },

                todate: {
                    greaterThanDate: '#fromdate'
                },
                todate_ret: {
                    greaterThanDate: '#fromdate_ret'
                },
                tovoucher: {
                    min: function () {
                        y = $('#fromvoucher').val();
                        if (y != null && y != '') {
                            return parseInt($('#fromvoucher').val())
                        }
                        return true
                    },
                },
                tovoucher_ret: {
                    min: function () {
                        x = $('#fromvoucher_ret').val();
                        if (x != null && x != '') {
                            return parseInt($('#fromvoucher_ret').val())
                        }
                        return true
                    },
                },
                limit_price: {
                    pattern: true
                },
                to_price: {
                    pattern: true,
                    min: function () {
                        x = $('#from_price').val();
                        if (x != null && x != '') {
                            var test = x.replace(/,/g, '');
                            return parseInt(test);
                        }
                        return true
                    },
                },
                from_price: {
                    pattern: true
                },
                'party_name[]': {
                    //    required: true
                },
                fax: {
                    number: true
                },

                pre_number_phone: {
                    number: true
                },
                customer_phone: {
                    number: true
                },
                mobile: {
                    number: true
                },
                iran_code: {
                    number: true
                },
                zip_code: {
                    number: true
                },
                economicNO: {
                    number: true
                },
            },
            messages: {
                year: {
                    number: "مقدار سال را درست وارد کنید",
                    range: "محدوده سال را درست وارد کنید"
                },
                register_number: {
                    number: "مقدار معتبر وارد کنید "
                },
                'party_name[]': {
                    //   required: "حداقل یک مشتری انتخاب شود. "
                },

                todate: {
                    greaterThanDate: "مقدار فیلد سند از تاریخ نباید از فیلد تا تاریخ بزرگتر باشد"
                },
                todate_ret: {
                    greaterThanDate: "مقدار فیلد سند برگشتی از تاریخ نباید از فیلد تا تاریخ بزرگتر باشد"
                },
                tovoucher: {
                    min: "مقدار فیلد سند از شماره  نباید از فیلد تا شماره بزرگتر باشد",
                },
                tovoucher_ret: {
                    min: "مقدار فیلد سند برگشتی از شماره  نباید از فیلد تا شماره بزرگتر باشد",
                },
                to_price: {
                    min: 'مقدار فیلد از مبلغ نباید از فیلد تا مبلغ بزرگتر باشد.'
                },

                fax: {
                    number: "مقدار معتبر وارد کنید "
                },

                pre_number_phone: {
                    number: "مقدار معتبر وارد کنید "
                },
                customer_phone: {
                    number: "مقدار معتبر وارد کنید "
                },
                mobile: {
                    number: "مقدار معتبر وارد کنید "
                },
                iran_code: {
                    number: "مقدار معتبر وارد کنید "
                },
                zip_code: {
                    number: "مقدار معتبر وارد کنید "
                },
                economicNo: {
                    number: "مقدار معتبر وارد کنید "
                },
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            succetestss: function (label) {

                label.closest('.form-group').removeClass('has-error').addClass('has-success');
                label.remove();
            },

            invalidHandler: function (e, validator) {
                if (validator.errorList.length)
                    $('#tabs a[href="#' + jQuery(validator.errorList[0].element).closest(".tab-pane").attr('id') + '"]').tab('show')
            },
            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.error_place'));
            },
            showErrors: function () {
                this.defaultShowErrors();
                $('#small').modal('hide');
            }

        });
    });
}

var handleReportTafsili = function () {
    $('#report').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block col-lg-offset-3', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            topic_selection: {
                required: true
            },
            item_per_page: {
                required: true,
                maxlength: 2
            },
            fromdate: {
                required: false,
                dateISO: true
            },
            todate: {
                required: false,
                dateISO: true
            },
            fromvoucher: {
                required: false,
                number: true

            },
            tovoucher: {
                required: false,
                min: function () {
                    y = $('#fromvoucher').val();
                    if (y != null && y != '') {
                        return parseInt($('#fromvoucher').val())
                    }
                    return true
                },
                number: true
            },

            fromVoucherId: {
                number: true
            },
            toVoucherId: {
                number: true,
                min: function () {
                    var y = $('#fromVoucherId').val();
                    if (y != null && y != '') {
                        return parseInt(y)
                    }
                    return true
                }
            }
        },
        messages: {
            topic_selection: {
                required: 'لطفاً سرفصل را انتخاب نمایید.'
            },
            item_per_page: {
                required: 'تعداد سطر در هر صفحه را وارد نمایید.',
                maxlength: 'لطفاً یک عدد دو رقمی وارد نمایید.'
            },
            fromdate: {
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.'
            },
            todate: {
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.'
            },
            fromvoucher: {
                number: 'لطفاً عدد وارد نمایید.'
            },
            tovoucher: {
                min: 'لطفاً عددی بزرگتر از عدد "از شماره سند" وارد نمایید.',
                number: 'لطفاً عدد وارد نمایید.'
            },

            fromVoucherId: {
                number: 'لطفاً عدد وارد نمایید.'
            },
            toVoucherId: {
                min: 'لطفاً عددی بزرگتر از عدد "از شماره ثابت سند" وارد نمایید.',
                number: 'لطفاً عدد وارد نمایید.'
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.col-md-8'));
        },
        submitHandler: function (form) {
            // event.preventDefault();

            var query = {};

            if (document.getElementById('descriptionAllDoc').checked) {
                query.descriptionAllDoc = 'true'

            } else {
                query.descriptionAllDoc = 'false';
            }
            if (document.getElementById('descriptionOneDoc').checked) {
                query.descriptionOneDoc = 'true';
            } else {
                query.descriptionOneDoc = 'false';
            }
            if (document.getElementById('descriptionEachDoc').checked) {
                query.descriptionEachDoc = 'true';
            } else {
                query.descriptionEachDoc = 'false';
            }
            if (document.getElementById('showValueDate').checked) {
                query.showValueDate = 'true';
            } else {
                query.showValueDate = 'false';
            }
            if (document.getElementById('showVocherId').checked) {
                query.showVocherId = '1';
            } else {
                query.showVocherId = '0';
            }
            if (document.getElementById('StatusVoucherID').checked) {
                query.StatusVoucherID = '1';
            } else {
                query.StatusVoucherID = '0';
            }
            // new fild
            if (document.getElementById('showMoeinAcount').checked) {
                query.showMoeinAcount = '1';
            } else {
                query.showMoeinAcount = '0';
            }
            var event1 = '';
            if (document.getElementById('sateh1_event').checked) {
                event1 = '1';
                query.sateh1_event = 'true';
            } else {
                event1 = '0';
                query.sateh1_event = 'false';
            }
            var event2 = '';
            if (document.getElementById('sateh2_event').checked) {
                event2 = '1';
                query.sateh2_event = 'true';
            } else {
                event2 = '0';
                query.sateh2_event = 'false';
            }
            var event3 = '';
            if (document.getElementById('sateh3_event').checked) {
                event3 = '1';
                query.sateh3_event = 'true';
            } else {
                event3 = '0';
                query.sateh3_event = 'false';
            }
            var event4 = '';
            if (document.getElementById('sateh4_event').checked) {
                event4 = '1';
                query.sateh4_event = 'true';
            } else {
                event4 = '0';
                query.sateh4_event = 'false';
            }

            var sarfasl_event_1 = $("#sarfasl_event_1").val();
            switch (sarfasl_event_1) {
                case '1' :
                    query.azaz_event_1 = '1';
                    break;
                case '2' :
                    query.shenavar_event_1 = '2';
                    break;
                case '3' :
                    query.yekta_event_1 = '3';
                    break;
            }
            var sarfasl_event_2 = $("#sarfasl_event_2").val();
            switch (sarfasl_event_2) {
                case '1' :
                    query.azaz_event_2 = '1';
                    break;
                case '2' :
                    query.shenavar_event_2 = '2';
                    break;
                case '3' :
                    query.yekta_event_2 = '3';
                    break;
            }
            var sarfasl_event_3 = $("#sarfasl_event_3").val();
            switch (sarfasl_event_3) {
                case '1' :
                    query.azaz_event_3 = '1';
                    break;
                case '2' :
                    query.shenavar_event_3 = '2';
                    break;
                case '3' :
                    query.yekta_event_3 = '3';
                    break;
            }
            var sarfasl_event_4 = $("#sarfasl_event_4").val();
            switch (sarfasl_event_4) {
                case '1' :
                    query.azaz_event_4 = '1';
                    break;
                case '2' :
                    query.shenavar_event_4 = '2';
                    break;
                case '3' :
                    query.yekta_event_4 = '3';
                    break;
            }

            var choose_tafsili_number_array = new Array(event1, event2, event3, event4);
            query.choose_tafsili_number = choose_tafsili_number_array.toString();

            var typeTafsiliOne = $("#typeTafsiliOne").val();
            switch (typeTafsiliOne) {
                case '1' :
                    query.azaz_one = '1';
                    break;
                case '2' :
                    query.shenavar_one = '2';
                    break;
                case '3' :
                    query.yekta_one = '3';
                    break;
            }
            var sateh1_one = '';
            if (document.getElementById('sateh1_one').checked) {
                sateh1_one = '1';
                query.sateh1_one = 'true'
            } else {
                sateh1_one = '0';
                query.sateh1_one = 'false'
            }
            var sateh2_one = '';
            if (document.getElementById('sateh2_one').checked) {
                sateh2_one = '1';
                query.sateh2_one = 'true'
            } else {
                sateh2_one = '0';
                query.sateh2_one = 'false'
            }
            var sateh3_one = '';
            if (document.getElementById('sateh3_one').checked) {
                sateh3_one = '1';
                query.sateh3_one = 'true'
            } else {
                sateh3_one = '0';
                query.sateh3_one = 'false'
            }
            var sateh4_one = '';
            if (document.getElementById('sateh4_one').checked) {
                sateh4_one = '1';
                query.sateh4_one = 'true'
            } else {
                sateh4_one = '0';
                query.sateh4_one = 'false'
            }

            var way_choose_tafsili_array = new Array(sateh1_one, sateh2_one, sateh3_one, sateh4_one);
            query.way_choose_tafsili = way_choose_tafsili_array.toString();

            query.fromdate = $("#fromdate").val();
            query.todate = $("#todate").val();
            query.fromDocumentNumber = $("#fromDocumentNumber").val();
            query.toDocumentNumber = $("#toDocumentNumber").val();

            query.fromVoucherId = $("#fromVoucherId").val();
            query.toVoucherId = $("#toVoucherId").val();


            var entitys = $("input[name=entity]:checked").val();
            if (entitys == '0') {
                if (!$('#sateh1_one').is(":checked") && !$('#sateh2_one').is(":checked") && !$('#sateh3_one').is(":checked") && !$('#sateh4_one').is(":checked")) {
                    Metronic.alert({
                        container: '#amel_alert',
                        type: 'danger',
                        message: "لطفا یکی از سطوح تفصیلی را انتخاب نمایید",
                        icon: 'error',
                        focus: true,
                        reset: true,
                        closeInSeconds: 4
                    });
                    return false;
                }
                query.topic_selection_hide = $("#topic_selection_hide").val();
                query.topic_selection_code = $("#topic_selection").attr('data-code');
                query.topic_show_selection_hide = $("#topic_show_selection_hide").val();
                query.topic_selection = $("#topic_selection").val();
                query.topic_show_selection = $("#topic_show_selection").val();
                query.entity = entitys;
            } else if (entitys == '1') {
                if (!$('#sateh1_event').is(":checked") && !$('#sateh2_event').is(":checked") && !$('#sateh3_event').is(":checked") && !$('#sateh4_event').is(":checked")) {
                    Metronic.alert({
                        container: '#amel_alert',
                        type: 'danger',
                        message: "لطفا یکی از سطوح تفصیلی را انتخاب نمایید",
                        icon: 'error',
                        focus: true,
                        reset: true,
                        closeInSeconds: 4
                    });
                    return false;
                }
                if ($("#topic_tafsili_event1_hide").val() == "" && $("#topic_tafsili_event2_hide").val() == "" && $("#topic_tafsili_event3_hide").val() == "" && $("#topic_tafsili_event4_hide").val() == "") {
                    Metronic.alert({
                        container: '#amel_alert',
                        type: 'danger',
                        message: 'لطفا سرفصل های تفصیلی را انتخاب نمایید ',
                        icon: 'error',
                        focus: true,
                        reset: true,
                        closeInSeconds: 4
                    });
                    return false;
                }
                if ($('#sateh1_event').is(":checked")) {
                    if ($("#topic_tafsili_event1_hide").val() == "") {
                        Metronic.alert({
                            container: '#amel_alert',
                            type: 'danger',
                            message: 'لطفا سرفصل های تفصیلی سطح1 را انتخاب نمایید ',
                            icon: 'error',
                            focus: true,
                            reset: true,
                            closeInSeconds: 4
                        });
                        return false;
                    }
                }
                if ($('#sateh2_event').is(":checked")) {
                    if ($("#topic_tafsili_event2_hide").val() == "") {
                        Metronic.alert({
                            container: '#amel_alert',
                            type: 'danger',
                            message: 'لطفا سرفصل های تفصیلی سطح2 را انتخاب نمایید ',
                            icon: 'error',
                            focus: true,
                            reset: true,
                            closeInSeconds: 4
                        });
                        return false;
                    }
                }
                if ($('#sateh3_event').is(":checked")) {
                    if ($("#topic_tafsili_event3_hide").val() == "") {
                        Metronic.alert({
                            container: '#amel_alert',
                            type: 'danger',
                            message: 'لطفا سرفصل های تفصیلی سطح3 را انتخاب نمایید ',
                            icon: 'error',
                            focus: true,
                            reset: true,
                            closeInSeconds: 4
                        });
                        return false;
                    }
                }
                if ($('#sateh4_event').is(":checked")) {
                    if ($("#topic_tafsili_event4_hide").val() == "") {
                        Metronic.alert({
                            container: '#amel_alert',
                            type: 'danger',
                            message: 'لطفا سرفصل های تفصیلی سطح4 را انتخاب نمایید ',
                            icon: 'error',
                            focus: true,
                            reset: true,
                            closeInSeconds: 3
                        });
                        return false;
                    }
                }
                query.topic_tafsili_event1 = $("#topic_tafsili_event1").val();
                query.topic_tafsili_event2 = $("#topic_tafsili_event2").val();
                query.topic_tafsili_event3 = $("#topic_tafsili_event3").val();
                query.topic_tafsili_event4 = $("#topic_tafsili_event4").val();

                query.topic_tafsili_code1 = $("#topic_tafsili_event1").attr('data-code');
                query.topic_tafsili_code2 = $("#topic_tafsili_event2").attr('data-code');
                query.topic_tafsili_code3 = $("#topic_tafsili_event3").attr('data-code');
                query.topic_tafsili_code4 = $("#topic_tafsili_event4").attr('data-code');

                query.topic_tafsili_event1_hide = $("#topic_tafsili_event1_hide").val();
                query.topic_tafsili_event2_hide = $("#topic_tafsili_event2_hide").val();
                query.topic_tafsili_event3_hide = $("#topic_tafsili_event3_hide").val();
                query.topic_tafsili_event4_hide = $("#topic_tafsili_event4_hide").val();

                query.topic_show_tafsili_event1 = $("#topic_show_tafsili_event1").val();
                query.topic_show_tafsili_event2 = $("#topic_show_tafsili_event2").val();
                query.topic_show_tafsili_event3 = $("#topic_show_tafsili_event3").val();
                query.topic_show_tafsili_event4 = $("#topic_show_tafsili_event4").val();

                query.topic_show_tafsili_event1_hide = $("#topic_show_tafsili_event1_hide").val();
                query.topic_show_tafsili_event2_hide = $("#topic_show_tafsili_event2_hide").val();
                query.topic_show_tafsili_event3_hide = $("#topic_show_tafsili_event3_hide").val();
                query.topic_show_tafsili_event4_hide = $("#topic_show_tafsili_event4_hide").val();
                query.entity = entitys;
            }
            if (document.getElementById('show_company_title').checked) {
                query.show_company_title = 'true'
            } else {
                query.show_company_title = 'false'
            }
            if (document.getElementById('show_company_logo').checked) {
                query.show_company_logo = 'true'
            } else {
                query.show_company_logo = 'false'
            }
            query.item_per_page = $("#item_per_page").val();
            Metronic.blockUI({
                target: 'body',
                boxed: true,
                message: 'در حال بارگذاری...'
            });
            $.ajax({
                type: 'POST',
                data: {query_tafsili: JSON.stringify(query)},
                url: '/tafsili/queryAjax',
                success: function (responseText) {
                    window.location = '/tafsili/report';
                }
            });

        }
    });

    $('#report input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#report').validate()) {
                $('#report').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
};

var handleBank = function () {
    $('#bank_form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            bankId: {
                required: true,
                min: 1
            },
            BranchTitle: {
                required: true
            },
            BranchCode: {
                required: true
            },
            accountNo: {
                required: true
            },
            cardNo: {
                required: false,
                // card: true
                minlength : 16

            },
            // unique: {
            //     required: true
            // },
            isDefault2: {
                required: true
            }
        },
        messages: {
            bankId: {
                required: "یک بانک را انتخاب نمایید.",
                min: "یک بانک را انتخاب نمایید."
            },
            BranchTitle: {
                required: "شعبه بانک را وارد نمایید."
            },
            BranchCode: {
                required: "کد شعبه بانک را وارد نمایید."
            },
            accountNo: {
                required: "شماره حساب خود را وارد نمایید."
            },
            cardNo: {
                minlength : 'لطفاً یک شماره کارت معتبر وراد نمایید'
                // card: "لطفاً یک شماره کارت معتبر وراد نمایید."
            },
            // unique: {
            //     required: 'به ازای هر شعبه بانک فقط یک شماره حساب میتوان تعریف کرد.'
            // },
            isDefault2: {
                required: "حتما یکی از حساب های شما باید برای مراودات پیشخوان انتخاب شود."
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('#profile_form')).show();
        },
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
            if (element.id.substr(0, 9) == 'isDefault') {
                $('#alert_bank_checkbox').removeClass('has-success').addClass('has-error');
            }
            // if(element.id == 'unique'){
            //     //$('#alert_bank_unique').removeClass('has-success').addClass('has-error');
            // }
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
            if (element.id.substr(0, 9) == 'isDefault') {
                $('#alert_bank_checkbox').removeClass('has-error');
            }
            // if(element.id == 'unique'){
            //    // $('#alert_bank_unique').removeClass('has-error');
            // }
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error').addClass('has-success');
            label.remove();
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.form-control')); //console.log(element);
            if (element[0].id.substr(0, 9) == 'isDefault') {
                error.insertAfter($('#alert_bank_checkbox'));
            }
        },
        submitHandler: function (form) {
            var d = {};
            var num = $("#cardNo").val().length;
            if (num != '' && num < 16) {
                return false;
            }
            d.id = $('#id').val();
            d.nikName = $('#bankNick').val();
            d.bankId = $('#bankId').val();
            d.BranchTitle = $('#BranchTitle').val();
            d.BranchCode = $('#BranchCode').val();
            d.trsBankBranchId = $('#trsBankBranchId').val();
            // if($('#isDefault1').length)
            //     d.isDefault = ($('#isDefault1').is(':checked')) ? 'true' : 'false';
            // else
            //     d.isDefault = ($('#isDefault2').is(':checked')) ? 'true' : 'false';
            d.accountKind = $('#accountKind').val();
            d.accountNo = $('#accountNo').val();
            d.cardNo = $('#cardNo').val();
            d.amount = $("#amount").val();
            var old_id = $('#old_id').val();

            var allAccount = JSON.parse($('#unique').val());
            // console.log(allAccount);
            var account = d.bankId + '-' + d.BranchTitle + '-' + d.BranchCode + '-' + d.accountNo;
            // console.log(account);
            // console.log($.inArray(account,allAccount)); //return false;
            if ($.inArray(account, allAccount) >= 0) {
                Metronic.alert({
                    container: '#bank_alert', // alerts parent container(by default placed after the page breadcrumbs)
                    place: 'append', // append or prepent in container
                    type: 'danger', // alert's type
                    message: 'به ازای هر شعبه بانک فقط یک شماره حساب میتوان تعریف کرد.', // alert's message
                    close: '1', // make alert closable
                    reset: '1', // close all previouse alerts first
                    focus: '1', // auto scroll to the alert after shown
                    closeInSeconds: '5', // auto close after defined seconds
                    icon: 'warning' // put icon before the message
                });
                return false;
            }
            // console.log(JSON.stringify(d)); return false;

            // if(($('#isDefault1').length)&&($('#isDefault1').is(':checked'))){
            if (false) {
                bootbox.confirm("با انتخاب اين شماره حساب بانکي به عنوان بانک مراودات پيشخوان، گزينه مراودات پيشخوان براي شماره حساب " + $('#old_hesab').val() + " بانک " + $('#old_name').val() + " غيرفعال مي شود. آيا مايل به ادامه عمليات مي باشيد؟", function (result) {
                    if (result) {
                        $.ajax({
                            type: 'POST',
                            data: {bank: JSON.stringify(d), old_id: old_id},
                            url: '/bank/saveAjax',
                            success: function (responseText) {
                                //   console.log(responseText);
                                var obj = JSON.parse(responseText);
                                if (obj['error'] != '') {
                                    if (obj['ErrorCode'] == 'User.015') {
                                        window.location = './logout';
                                    }
                                    Metronic.alert({
                                        container: '#bank_alert', // alerts parent container(by default placed after the page breadcrumbs)
                                        place: 'append', // append or prepent in container
                                        type: 'danger', // alert's type
                                        message: obj['error'], // alert's message
                                        close: '1', // make alert closable
                                        reset: '1', // close all previouse alerts first
                                        focus: '1', // auto scroll to the alert after shown
                                        closeInSeconds: '10', // auto close after defined seconds
                                        icon: 'warning' // put icon before the message
                                    });
                                } else {
                                    var msg = '';
                                    if (d.id == "0") {
                                        msg = 'شماره حساب جدید ثبت گردید.';
                                    }
                                    else {
                                        msg = 'شماره حساب اصلاح گردید.';
                                    }
                                    window.location = '/bank?status=success&msg=' + msg + '&icon=check';
                                    //window.location = 'bank.php?status=danger&msg=error&icon=warning';
                                }
                            }
                        });
                    }
                });
            }
            else {
                $.ajax({
                    type: 'POST',
                    data: {bank: JSON.stringify(d), old_id: old_id},
                    url: '/bank/saveAjax',
                    success: function (responseText) {
                        console.log(responseText);
                        var obj = JSON.parse(responseText);
                        if (obj['error'] != '') {
                            if (obj['ErrorCode'] == 'User.015') {
                                window.location = './logout';
                            }
                            Metronic.alert({
                                container: '#bank_alert', // alerts parent container(by default placed after the page breadcrumbs)
                                place: 'append', // append or prepent in container
                                type: 'danger', // alert's type
                                message: obj['error'], // alert's message
                                close: '1', // make alert closable
                                reset: '1', // close all previouse alerts first
                                focus: '1', // auto scroll to the alert after shown
                                closeInSeconds: '10', // auto close after defined seconds
                                icon: 'warning' // put icon before the message
                            });
                        } else {
                            var msg = '';
                            if (d.id == "0") {
                                msg = 'شماره حساب جدید ثبت گردید.';
                            }
                            else {
                                msg = 'شماره حساب اصلاح گردید.';
                            }
                            window.location = '/bank?status=success&msg=' + msg + '&icon=check';
                            //window.location = 'bank.php?status=danger&msg=error&icon=warning';
                        }
                    }
                });
                Metronic.blockUI({
                    target: 'body',
                    boxed: true,
                    message: 'در حال بارگذاری...'
                });
                $('#loader-icon').bind('ajaxStart', function(){
                    $(this).show();
                }).bind('ajaxStop', function(){
                    $(this).hide();
                });
            }

        }
    });

    $('#bank_form input').keypress(function (e) {
        if (e.which == 13) {
            //alert($('#unique').val());

            if ($('#bank_form').validate()) {
                $('#bank_form').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
};

var handleFilterLog = function () {
    $('#eventForm').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block col-lg-offset-6', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            fromdate: {
                required: false,
                dateISO: true
            },
            todate: {
                dateISO: true,
                greaterThanDate: '#fromdate'
            }
        },
        messages: {
            fromdate: {
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.'
            },
            todate: {
                dateISO: 'لطفاً یک تاریخ معتبر وارد نمایید.',
                greaterThanDate: 'لطفاً تاریخی بزرگتر از فیلد "از تاریخ" وارد نمایید.'
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.col-md-6'));
        },
        submitHandler: function (form) {
            var log_query = {};
            log_query.fromdate = $('#fromdate').val();
            log_query.todate = $('#todate').val();

            var selectedFilterCode = new Array();
            $('input[name="filter[]"]:checked').each(function () {
                selectedFilterCode.push(this.value);
            });
            if (selectedFilterCode.length > 0) {
                log_query.filter_codes = selectedFilterCode.toString();
            } else {
                log_query.filter_codes = '';
            }
            var selectedUsersFilterCode = new Array();
            $('input[name="user_filter[]"]:checked').each(function () {
                selectedUsersFilterCode.push(this.value);
            });
            if (selectedUsersFilterCode.length > 0) {
                log_query.user_filter_codes = selectedUsersFilterCode.toString();
            } else {
                log_query.user_filter_codes = '';
            }
            $("#filter_modal").modal("hide");
            Metronic.blockUI({
                target: 'body',
                boxed: true,
                message: 'در حال بارگذاری...'
            });
            $.ajax({
                type: 'POST',
                data: {
                    log_query: JSON.stringify(log_query)
                },
                url: '/log/logQueryAjax',
                success: function (responseText) {
                    var table = $('#log');
                    table.dataTable();
                    table.api().ajax.reload();
                }
            });
            Metronic.unblockUI('body');
        }
    });

    $('#eventForm input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#report').validate()) {
                $('#report').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleSetting = function () {
    $('#setting-form').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block col-lg-offset-3', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            tax_percent: {
                required: true,
                min: 1,
                max: 99,
            },

        },
        messages: {
            tax_percent: {
                required: 'پر کردن این فیلد الزامیست',
                min: 'عددی بین 1 تا 100 انتخاب نمایید',
                max: 'عددی بین 1 تا 100 انتخاب نمایید',
            },
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            // error.insertAfter(element.closest('.form-group'));
        },
        submitHandler: function (form) {
            var dataform = new FormData(form);
            dataform.append('setting', 'setting');
            $.ajax({
                url: "/setting/save", // Url to which the request is send
                type: "POST", // Type of request to be send, called as method
                data: dataform, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
                contentType: false, // The content type used when sending data to the server.
                cache: false, // To unable request pages to be cached
                processData: false, // To send DOMDocument or non processed data file it is set to false
                success: function (data)   // A function to be called if request succeeds
                {
                    if (data == 'true') {
                        Metronic.alert({
                            container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'success', // alert's type
                            message: 'با موفقیت ذخیره گردید', // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '3', // auto close after defined seconds
                            icon: 'checked' // put icon before the message
                        });
                    }
                    else {
                        Metronic.alert({
                            container: '#res', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: 'خطا در ذخیره اطلاعات ', // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previouse alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '3', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                    }

                }
            });

        }
    });

    $('#setting-form input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#setting-form').validate()) {
                $('#setting-form').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handlePersons = function () {
    $('#form1').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            code: {
                required: true
            },
            name: {
                required: true
            },
            family: {
                required: true
            },
            name2: {
                required: true
            },
            companyName: {
                required: true
            },
            mobile: {
                minlength: 11,
                number: true
            },
            tel: {
                minlength: 3,
                number: true
            },
            birthdate: {
                dateISO: true
            },
            marriageDate: {
                dateISO: true
            },
            email: {
                email: true
            },
            meliCode: {
                number: true
            },
            economicCode: {
                number: true
            },
            shenase: {
                number: true
            }
        },
        messages: {
            code: {
                required: 'لطفا این فیلد را پر نمایید'
            },
            name: {
                required: 'لطفا این فیلد را پر نمایید'
            },
            family: {
                required: 'لطفا این فیلد را پر نمایید'
            },
            name2: {
                required: 'لطفا این فیلد را پر نمایید'
            },
            companyName: {
                required: 'لطفا این فیلد را پر نمایید'
            },
            mobile: {
                minlength: 'لطفا شماره تلفن صحیح وارد نمایید',
                number: 'لطفا شماره تلفن صحیح وارد نمایید'
            },
            tel: {
                minlength: 'لطفا شماره تلفن صحیح وارد نمایید',
                number: 'لطفا شماره تلفن صحیح وارد نمایید'
            },
            birthdate: {
                dateISO: 'لطفا تاریخ صحیح وارد نمایید'
            },
            marriageDate: {
                dateISO: 'لطفا تاریخ صحیح وارد نمایید'
            },
            email: {
                email: 'لطفا ایمیل صحیح وارد نمایید'
            },
            meliCode: {
                number: 'لطفا عدد صحیح وارد نمایید'
            },
            economicCode: {
                number: 'لطفا عدد صحیح وارد نمایید'
            },
            shenase: {
                number: 'لطفا عدد صحیح وارد نمایید'
            }
        },
        invalidHandler: function (event, validator) { //display error alert on form submit

        },
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
        submitHandler: function (form) {
            if (!$('input[name=checkbox]:checked').val() && !$('input[name=checkbox2]:checked').val() && !$('input[name=checkbox3]:checked').val()) {
                Metronic.alert({
                    container: '#alert', // alerts parent container(by default placed after the page breadcrumbs)
                    place: 'append', // append or prepent in container
                    type: 'danger', // alert's type
                    message: 'انتخاب حداقل يکی از گزينه های نوع رابطه الزامی است.', // alert's message
                    close: '1', // make alert closable
                    reset: '1', // close all previous alerts first
                    focus: '1', // auto scroll to the alert after shown
                    closeInSeconds: '5', // auto close after defined seconds
                    icon: 'warning' // put icon before the message
                });
                return false;
            }

            var data = new FormData(form);
            //  console.log(data.entries()); //return false;
            Metronic.blockUI({
                target: 'body',
                boxed: true,
                message: 'در حال ثبت...'
            });
            $.ajax({// Send the credential values to another formHandler.php using Ajax in POST method
                type: 'POST',
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                url: '/persons/saveAjax',
                success: function (responseText) {
                    if (responseText == 'noCode') {
                        Metronic.alert({
                            container: '#alert', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: 'کد اشخاص نباید تکراری باشد', // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previous alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '5', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        Metronic.unblockUI('body');
                        return false;
                    } else if (responseText == 'noName') {
                        Metronic.alert({
                            container: '#alert', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: 'مقادير وارد شده براي نام و نام خانوادگي تکراري است', // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previous alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '5', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        Metronic.unblockUI('body');
                    }
                    var obj = JSON.parse(responseText);
                    // Get the result and asign to each cases


                    if (obj['error'] != '') {
                        if (obj['ErrorCode'] == 'User.015') {
                            window.location = './logout';
                        }
                        Metronic.alert({
                            container: '#alert', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: obj['error'], // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previous alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '5', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        return false;

                    }
                    else if (obj['error'] == '') {
                        window.location = '/persons?success';
                    }
                    else if (responseText == 'logout') {
                        window.location = './logout';
                    }
                    else {

                        Metronic.alert({
                            container: '#alert', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: 'مشکل در اتصال به وب سرویس', // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previous alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '5', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        return false;
                    }
                    Metronic.unblockUI('body');
                }
            });
        }
    });
    $('#form1 input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#form1').validate()) {
                $('#form1').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
}

var handleAddFactor = function () {
    $('#factor').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            number: {
                required: true,

            },
            issuanceDate: {
                required: true,
                dateISO: true
            },
            accountParty: {
                required: true
            },
        },
        messages: {
            number: {
                required: 'فیلد شماره الزامی میباشد',
            },
            issuanceDate: {
                required: 'فیلد تاریخ الزامی میباشد',
                dateISO: 'لطفا تاریخ معتبر وارد نمایید'
            },
            accountParty: {
                required: 'فیلد طرف حساب الزامی میباشد'
            },

        },
        invalidHandler: function (event, validator) { //display error alert on form submit

        },
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
            error.insertAfter(element.closest('.form-control'));
        },
        submitHandler: function (form) {

            var dataM = {};
            var status = $('#submitValueHidden').val();
            var factorType = $('#factorType').val();
            if (factorType == 'return') {
                dataM['fcRelationTypeId'] = $('#fcRelationTypeId').val();
                dataM['fcHRelatedIds'] = $('#fcHRelatedIds').val();
            }
            if (status == 'submit') {
                dataM['fcFinalState'] = '1';
            } else {
                dataM['fcFinalState'] = '0';
            }

            dataM['fcFactConfigId'] = $('#fcFactConfigId').val();
            dataM['fcMainCode'] = $('#number').val();
            dataM['fcSecondCode'] = $('#number2').val();
            dataM['fcIssuanceDate'] = $('#issuanceDate').val();
            dataM['fcPartyId'] = $('#accountParty').attr('data-id');

            dataM['discount'] = $('#discount').val().trim().replace(/,/g, '');
            dataM['fcIncsPrice'] = $('#total_deduction').val().trim().replace(/,/g, '');
            dataM['fcDecsPrice'] = $('#total_addition').val().trim().replace(/,/g, '');
            var negation = false;
            var number = $('#total_price').val();
            if (number.indexOf('-') >= 0) {
                negation = true;
            }

            number = number.trim().replace(/[^0-9]\./g, '').replace(/-/g, '');
            if (negation)
                number = '-' + number;

            dataM['fcFinalPrice'] = number.trim().replace(/,/g, '');
            dataM['description'] = $('#description').val();
            dataM['id'] = $('#factorId').val();

            // voucher line
            var i = 1;
            var dataD = {};

            $('#tbody_details').find('tr').each(function () {
                var id = $(this).data('counter');
                var item = {};
                if ($('#code_' + id).val() != '') {
                    item['fcRowId'] = i;
                    item['code'] = $('#code_' + id).val();
                    item['fcInvArticleCategoryId'] = $('#stuffName_' + id).attr('data-groupId');
                    item['fcInvArticleId'] = $('#stuffName_' + id).attr('data-id');
                    item['fcMUnitsId'] = $('#unit_' + id).attr('data-id');
                    item['fcAmount'] = $('#count_' + id).val();
                    item['fcUnitPrice'] = $('#fee_' + id).val();
                    item['fcTotalPrice'] = $('#price_' + id).val();
                    item['tax'] = $('#tax_' + id).val();
                    item['duty'] = $('#duty_' + id).val();
                    item['discount'] = $('#discountRow_' + id).val();
                    item['description'] = $('#desc_' + id).val();

                    item['fcAmount'] = item['fcAmount'].trim().replace(/,/g, '');
                    item['fcUnitPrice'] = item['fcUnitPrice'].trim().replace(/,/g, '');
                    item['fcTotalPrice'] = item['fcTotalPrice'].trim().replace(/,/g, '');
                    item['tax'] = item['tax'].trim().replace(/,/g, '');
                    item['duty'] = item['duty'].trim().replace(/,/g, '');
                    item['discount'] = item['discount'].trim().replace(/,/g, '');

                    dataD[i] = item;
                    i++;
                }
            });

            var back = $('#backToReport').val();
            var data = [dataM, dataD];
            Metronic.blockUI({
                target: 'body',
                boxed: true,
                message: 'در حال ثبت...'
            });
            $.ajax({// Send the credential values to another formHandler.php using Ajax in POST method
                type: 'POST',
                data: {data: JSON.stringify(data)},
                url: '/factor/saveAjax',
                success: function (responseText) {
                    var obj = JSON.parse(responseText);
                    if (obj['error'] != '') {
                        if (obj['ErrorCode'] == 'User.015') {
                            window.location = './logout';
                        } else {
                            Metronic.alert({
                                container: '#alert', // alerts parent container(by default placed after the page breadcrumbs)
                                place: 'append', // append or prepent in container
                                type: 'danger', // alert's type
                                message: obj['error'], // alert's message
                                close: '1', // make alert closable
                                reset: '1', // close all previouse alerts first
                                focus: '1', // auto scroll to the alert after shown
                                closeInSeconds: '10', // auto close after defined seconds
                                icon: 'warning' // put icon before the message
                            });
                        }
                    }
                    else if (obj['result'] == 'true') {
                        data['id'] = obj['id'];
                        data['factorCode'] = obj['code'];
                        data['secondcode'] = obj['secondcode'];
                        data['title'] = obj['title'];
                        window.location = '/factor/add?factorId=' + data['id'] + '&succ=succ' + '&factorCode=' + data['factorCode'] + '&secondcode=' + data['secondcode'] + '&title=' + data['title'] + '&back=' + back;
                    }
                    else if (responseText == 'logout') {
                        window.location = './logout';
                    }
                    else {
                        alert('Problem with web service');
                    }
                    Metronic.unblockUI('body');
                }
            });


        }
    });
    $('#factor input').keypress(function (e) {
        if (e.which == 13) {
            // if ($('#factor').validate()) {
            //     $('#factor').submit(); //form validation success, call ajax form submit
            // }
            return false;
        }
    });
}

var handleArticls = function () {
    $('#articleForm').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            code: {
                required: true
            },
            title: {
                required: true
            },
            vahed: {
                required: true
            },
            nameKhadamat: {
                required: true
            },
        },
        messages: {
            code: {
                required: 'لطفا این فیلد را پر نمایید'
            },
            title: {
                required: 'لطفا این فیلد را پر نمایید'
            },
            vahed: {
                required: 'لطفا این فیلد را پر نمایید'
            },
            nameKhadamat: {
                required: 'لطفا این فیلد را پر نمایید'
            },
        },
        invalidHandler: function (event, validator) { //display error alert on form submit

        },
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
            error.insertAfter(element.closest('.form-control'));
            error.insertAfter(element.closest('.kala').parent());

        },
        submitHandler: function (form) {
            var data = new FormData(form);
            //  console.log(data.entries()); //return false;
            $.ajax({// Send the credential values to another formHandler.php using Ajax in POST method
                type: 'POST',
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                url: '/article/saveAjax',
                success: function (responseText) {
                    var result = JSON.parse(responseText);
                    if (result.codeCheck == 'codeError') {
                        var alertMessage =   result.type == 'true' ? 'کد کالا نباید تکراری باشد' : 'کد خدمات نباید تکراری باشد';
                        Metronic.alert({
                            container: '#alert', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: alertMessage, // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previous alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '5', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        return false;
                    } else if (result.titleCheck == 'titleError') {
                        var confirmMessage =   result.type == 'true' ? 'کالا تکراری می باشد،آیا مایل به ادامه عملیات هستید؟' : 'خدمات تکراری می باشد،آیا مایل به ادامه عملیات هستید؟';
                        bootbox.confirm(confirmMessage, function (result) {
                            if (result) {
                                $.ajax({// Send the credential values to another formHandler.php using Ajax in POST method
                                    type: 'POST',
                                    data: data,
                                    processData: false,
                                    contentType: false,
                                    cache: false,
                                    url: '/article/saveAjax?repeat=true',
                                    success: function () {
                                        window.location = '/article?success=true';
                                    }
                                });
                            }
                        });
                    }

                    var obj = JSON.parse(responseText);
                    // Get the result and asign to each cases

                    if (obj['error'] != '') {
                        if (obj['ErrorCode'] == 'User.015') {
                            window.location = './logout';
                        }
                        if(result.option == true){
                            return false;
                        }else{
                            Metronic.alert({
                                container: '#alert', // alerts parent container(by default placed after the page breadcrumbs)
                                place: 'append', // append or prepent in container
                                type: 'danger', // alert's type
                                message: obj['error'], // alert's message
                                close: '1', // make alert closable
                                reset: '1', // close all previous alerts first
                                focus: '1', // auto scroll to the alert after shown
                                closeInSeconds: '5', // auto close after defined seconds
                                icon: 'warning' // put icon before the message
                            });
                            return false;
                        }
                    }
                    else if (obj['error'] == '') {
                        window.location = '/article?success=true';
                    }
                    else if (responseText == 'logout') {
                        window.location = './logout';
                    }
                    else {

                        Metronic.alert({
                            container: '#alert', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: 'مشکل در اتصال به وب سرویس', // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previous alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '5', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        return false;
                    }
                }
            });
        }
    });
    $('#form1 input').keypress(function (e) {
        if (e.which == 13) {
            if ($('#form1').validate()) {
                $('#form1').submit(); //form validation success, call ajax form submit
            }
            return false;
        }
    });
};

var checkFinancialPeriodAndRedirect = function (result) {


    if (result['financialPeriodCheckPerm']) {
        window.location = './financialPeriod/choose';
    } else {
        if (isSpod == 1) {
            window.location = './dashBoard';
        } else {
            window.location = './dashboard';
        }
    }
};

var handleRecivingPayment = function () {
    $('#recivingPaymentForm').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            joinNumber: {
                required: true,
            },
            joinDate: {
                dateISO: true,
                required: true,
            },
            hous: {
                required: true,
            },
            cashMonyDate: {
                dateISO: true,
                required: true,
            },
            cashMonyAmount: {
                required: true,
            },
            cardreaderMonyAmount: {
                required: true,
            },
            cardreaderRejesterNumber: {
                required: true,
            },
            cardreaderDate: {
                dateISO: true,
                required: true,
            },
            cardreaderTransactionserial: {
                required: true,
            },
            InternetOperationDate: {
                dateISO: true,
                required: true,
            },
            InternetOperationPursueNumber: {
                required: true,
            },
            InternetOperationMonyAmount: {
                required: true,
            },
            BankiFicheAcountNumber: {
                required: true,
            },
            BankiFicheNumber: {
                required: true,
            },
            BankiFicheMonyAmount: {
                required: true,
            },
            ATMbankStart: {
                required: true,
            },
            ATMstartAcountNumber: {
                required: true,
            },
            ATMbankEnd: {
                required: true,
            },
            ATMdate: {
                dateISO: true,
                required: true,
            },
            ATMretrievalNumber: {
                required: true,
            },
            BankiFicheDate: {
                dateISO: true,
                required: true,
            },
        },
        messages: {
            joinNumber: {
                required: "لطفا این فیلد را پر نمایید",
            },
            joinDate: {
                dateISO: "لطفا یک تاریخ معتبر را وارد نمایید",
                required: "لطفا این فیلد را پر نمایید",
            },
            hous: {
                required: "لطفا این فیلد را پر نمایید",
            },
            cashMonyDate: {
                dateISO: "لطفا یک تاریخ معتبر را وارد نمایید",
                required: "لطفا این فیلد را پر نمایید",
            },
            cashMonyAmount: {
                required: "لطفا این فیلد را پر نمایید",
            },
            cardreaderMonyAmount: {
                required: "لطفا این فیلد را پر نمایید",
            },
            cardreaderRejesterNumber: {
                required: "لطفا این فیلد را پر نمایید",
            },
            cardreaderDate: {
                dateISO: "لطفا یک تاریخ معتبر را وارد نمایید",
                required: "لطفا این فیلد را پر نمایید",
            },
            cardreaderTransactionserial: {
                required: "لطفا این فیلد را پر نمایید",
            },
            InternetOperationDate: {
                dateISO: "لطفا یک تاریخ معتبر را وارد نمایید",
                required: "لطفا این فیلد را پر نمایید",
            },
            InternetOperationPursueNumber: {
                required: "لطفا این فیلد را پر نمایید",
            },
            InternetOperationMonyAmount: {
                required: "لطفا این فیلد را پر نمایید",
            },
            BankiFicheAcountNumber: {
                required: "لطفا این فیلد را پر نمایید",
            },
            BankiFicheNumber: {
                required: "لطفا این فیلد را پر نمایید",
            },
            BankiFicheMonyAmount: {
                required: "لطفا این فیلد را پر نمایید",
            },
            ATMbankStart: {
                required: "لطفا این فیلد را پر نمایید",
            },
            ATMstartAcountNumber: {
                required: "لطفا این فیلد را پر نمایید",
            },
            ATMbankEnd: {
                required: "لطفا این فیلد را پر نمایید",
            },
            ATMdate: {
                dateISO: "لطفا یک تاریخ معتبر را وارد نمایید",
                required: "لطفا این فیلد را پر نمایید",
            },
            ATMretrievalNumber: {
                required: "لطفا این فیلد را پر نمایید",
            },
            BankiFicheDate: {
                dateISO: "لطفا یک تاریخ معتبر را وارد نمایید",
                required: "لطفا این فیلد را پر نمایید",
            },
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.form-control').css('border-color', '#ebccd1'));
            error.insertAfter(element.closest('.dateInputs').parent());
            error.insertAfter(element.closest('.bankInput').parent());

        },
        submitHandler: function (form, e) {
            e.preventDefault();
            var cardreaderBankId = $("#cardreaderBank").data('id') != undefined ? $("#cardreaderBank").data('id') : '';
            var InternetOperationBankId = $("#InternetOperationBank").data('id') != undefined ? $("#InternetOperationBank").data('id') : '';
            var BankiFicheBankResiveGetId = $("#BankiFicheBankResiveGet").data('id') != undefined ? $("#BankiFicheBankResiveGet").data('id') : '';
            var ATMbankStartId = $("#ATMbankStart").data('id') != undefined ? $("#ATMbankStart").data('id') : '';
            var ATMbankEndId = $("#ATMbankEnd").data('id') != undefined ? $("#ATMbankEnd").data('id') : '';
            var dataInput = new FormData(form);
            dataInput.append('cardreaderBankId', cardreaderBankId);
            dataInput.append('InternetOperationBankId', InternetOperationBankId);
            dataInput.append('BankiFicheBankResiveGetId', BankiFicheBankResiveGetId);
            dataInput.append('ATMbankStartId', ATMbankStartId);
            dataInput.append('ATMbankEndId', ATMbankEndId);

            $.ajax({
                type: 'POST',
                data: dataInput,
                url: '/recivingPayment/saveAjax',
                processData: false,
                contentType: false,
                success: function (responseText) {
                    //window.location.assign('/recivingPayment/index');
                }
            });

        }
    });

}

var handleFundDifination = function () {
    $('#fundDifinationForm').validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: true, // false: do not focus the last invalid input
        rules: {
            title: {
                required: true
            },
            inaugurateDate: {
                dateISO: true
            },
        },
        messages: {
            title: {
                required: "لطفا این فیلد را پر نمایید"
            },
            inaugurateDate: {
                dateISO: "لطفاً یک تاریخ معتبر وارد نمایید."
            },
        },
        invalidHandler: function (event, validator) { //display error alert on form submit
            // $('.alert-danger', $('.login-form')).show();
        },
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
            error.insertAfter(element.closest('.form-control'));
        },
        submitHandler: function (form, e) {
            e.preventDefault();
            var CenterNameId = $("#centerName").attr('data-id') != undefined ? $("#centerName").attr('data-id') : '';
            var dataInput = new FormData(form);
            dataInput.append('CenterNameId', CenterNameId);

            $.ajax({
                type: 'POST',
                data: dataInput,
                url: '/fundDifination/saveAjax',
                processData: false,
                contentType: false,
                success: function (response) {
                    if(response =='true'){
                        window.location.assign('/fundDifination/index?success=true');
                    }else{
                        Metronic.alert({
                            container: '#alert', // alerts parent container(by default placed after the page breadcrumbs)
                            place: 'append', // append or prepent in container
                            type: 'danger', // alert's type
                            message: 'خطایی رخ داده است', // alert's message
                            close: '1', // make alert closable
                            reset: '1', // close all previous alerts first
                            focus: '1', // auto scroll to the alert after shown
                            closeInSeconds: '5', // auto close after defined seconds
                            icon: 'warning' // put icon before the message
                        });
                        return false;
                    }
                }
            });

        }
    });

}