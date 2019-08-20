if(jRun){

    /**
     * Convert english digits to persian digits
     * @returns {string}
     */
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


    /**
     * Convert persian digits to english digits
     * @returns {string}
     */
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


    /**
     * Get random number
     * @param until
     * @returns {number}
     */
    jRun.getRandom = function (until) {
        return Math.floor((Math.random() * until) + 1);
    };


    /**
     * Get random string
     * @returns {string}
     */
    jRun.getRandomString = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };


    /**
     * Get current time
     * @returns {string}
     */
    jRun.getTime = function () {

        d = new Date;
        nhour = d.getHours();
        nmin = d.getMinutes();
        function pad(n) {
            return ("0" + n).slice(-2);
        }

        return pad(nmin) + "<blink> : </blink>" + pad(nhour);
    };


    /**
     * Get persian date
     * @returns {string}
     */
    jRun.getPersianDate = function () {
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
    };


    /**
     * Format size to bigger date picks
     * @param size
     * @returns {string}
     */
    jRun.format_size = function (size) {
        var units = ("B KB MB GB TB PB").split(" ");
        var mod = 1024;
        var i = 0;
        for (i = 0; size > mod; i++) {
            size /= mod;
        }
        size = size.toString();
        var endIndex = size.indexOf(".") + 3;
        return size.substr(0, endIndex) + " " + units[i];
    };


    /**
     * Get time ago based on milli-seconds
     * @param ms
     * @returns {string}
     */
    jRun.timeAgo = function (ms) {

        $('[data-timeAgo]').each(function () {
            $(this).html(jRun.msago($(this).attr("data-timeAgo")));
        });

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
    };


    /**
     * Fix numbers for float
     * @param number
     * @param mode
     * @returns {string}
     */
    jRun.numberFix = function (number, mode) {
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
    };


    /**
     * Get attributes
     *
     * @param node
     * @param startWith
     * @returns {*}
     */
    jRun.getAttributes = function (node , startWith ) {
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
    };


    /**
     * Remove attributes
     *
     * @param node
     * @param attrs
     * @param startWith
     */
    jRun.removeAttributes = function (node , attrs , startWith ) {
        startWith = startWith === undefined ? "" : startWith;
        attrs = attrs === undefined ? jRun.getAttributes(node , startWith) : attrs ;
        for(var attr in attrs){
            node.removeAttribute(attr);
        }
    };

}