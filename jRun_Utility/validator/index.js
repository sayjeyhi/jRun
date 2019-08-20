if(jRun){
    jRun.validators =  [];

    jRun.buildValidator = function () {


        // destroy old validators
        jRun.destroyValidators();

        // validator for jRun
        $("form.jValidate").each(function () {

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
    };

    jRun.destroyValidators = function () {
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
    };
}