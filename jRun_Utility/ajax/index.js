if(jRun && window.jQuery){

    jRun.activeAjaxFlag = false;

    jRun.buildAjax = function () {

        $("form.jAjax").each(function () {
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
                            a.trigger("completed.jRun.ajax");
                            jRun.buildValidator();
                        },
                        timeout: 25000
                    })
                }
            })
        });
    };

}