var jRLoader = {
    choosedColor: '',
    filesLoading: false,
    animationLoading: false,
    isLoaded: false,
    timingProps : {
        type: 'delayed',
        duration: 150,
        start: 'autostart'
    },
    htmlData : '' +
    '<div class="content">' +
    '    <section class="sectionOne"' +
    '         data-2800="opacity:1;"' +
    '         data-3200="opacity:0">' +
    '        <div class="intro"' +
    '             data-0="transform:translateY(575px);opacity:0.3;font-size:100px;"' +
    '             data-250="transform:translateY(240px);opacity:0.3;font-size:80px"' +
    '             data-500="transform:translateY(0px);opacity:1;font-size:40px;">من کی هستم؟' +
    '        </div>' +
    '' +
    '        <p class="text"' +
    '           data-500="opacity:0;"' +
    '           data-1000="opacity:1;">من جعفر رضائی هستم' +
    '            <i class="linearicon linearicon-game green"></i> ، یه برنامه نویس' +
    '            <i style="color:#ff9884;text-decoration:line-through;font-weight: normal;">جلاد</i> خلاق' +
    '            <i class="linearicon linearicon-rocket green"></i> وب ، حدود ۱۰ سـال هست که با' +
    '            <i class="linearicon linearicon-heart red"></i> و' +
    '            <i class="linearicon linearicon-keyboard green"' +
    '               style="font-size: 26px;position: relative;bottom: -5px;margin-left: 4px;"></i> کدنویسی انجام میدم یه آدم' +
    '            <i class="linearicon linearicon-height green"></i> بلند هستم ، یه مدت بود میخاستم روی سـایتم' +
    '            <i class="linearicon linearicon-network-lock green"></i> کار کنم ولی وقت نمیشد' +
    '            <i class="linearicon linearicon-battery-low1 green"></i> و بلاخره پس از دو سال اینو ساختم' +
    '            <i class="linearicon linearicon-magic-wand green"></i>خب برای یه کم بازی' +
    '            <i class="linearicon linearicon-gamepad green"></i> با سایت من اسکرول' +
    '            <i class="linearicon linearicon-fingers-scroll-vertical green"></i> کنید .' +
    '        </p>' +
    '        <div style="text-align: center;">' +
    '            <img data-1000="opacity:0;"' +
    '                 data-1500="opacity:1;" class="myAvatar" src="public/Image/me.jpg" alt="JafarRezaei"' +
    '                 title="جعفر رضایی"/>' +
    '        </div>' +
    '    </section>' +
    '' +
    '    <section class="section sectionTwo"' +
    '         data-3200="opacity:0;transform:translateY(0px);"' +
    '         data-3500="opacity:1;transform:translateY(-320px);"' +
    '         data-4500="opacity:1;transform:translateY(-320px);"' +
    '         data-4700="opacity:0;transform:translateY(-950px);"' +
    '    >' +
    '        <i class="linearicon linearicon-archery partIcon"></i>' +
    '        <h4>ابزارهای تولید شده توسط من</h4>' +
    '        <div class="smalltext">بعضی از کدها که در اوقات باحوصلگی انجامشون میدم</div>' +
    '        <hr class="separator"/>' +
    '        <ul class="left">' +
    '            <li>' +
    '                Jamework' +
    '                <span class="colored sdf">فریم ورک شی گرا، ، ساده وسریع برای php</span>' +
    '            </li>' +
    '            <li>' +
    '                jRun' +
    '                <span class="colored sdf">کتابخانه جاوا اسکریپت برای توسعه سریع وب</span>' +
    '            </li>' +
    '            <li>' +
    '                Persian PDF with js' +
    '                <span class="colored sdf">اجرای خصوصی</span>' +
    '            </li>' +
    '        </ul>' +
    '    </section>' +
    '' +
    '    <section class="section sectionThree"' +
    '         data-4700="opacity:0;transform:translateY(0px);"' +
    '         data-5000="opacity:1;transform:translateY(-500px);"' +
    '         data-6000="opacity:1;transform:translateY(-500px);"' +
    '         data-6200="opacity:0;transform:translateY(-950px);"' +
    '    >' +
    '        <i class="linearicon linearicon-beaker partIcon"></i>' +
    '        <h4>پروژه های انجام شده من </h4>' +
    '        <div class="smalltext">یه سری پروژه که بنده انجامشون داده ام</div>' +
    '        <hr class="separator"/>' +
    '        <ul class="left">' +
    '            <li>' +
    '                Citygram' +
    '                <a class="colored" href="http://citygram.ir" target="_blank">[See project]</a>' +
    '            </li>' +
    '            <li>' +
    '                Jurchin' +
    '                <a class="colored" href="http://jurchin.com" target="_blank">[See project]</a>' +
    '            </li>' +
    '            <li>' +
    '                Idea processor\'s company' +
    '                <span class="colored" href="#">[private]</span>' +
    '            </li>' +
    '            <li>' +
    '                TorfehNegar web applications' +
    '                <span class="colored" href="#">[private]</span>' +
    '            </li>' +
    '        </ul>' +
    '    </section>' +
    '' +
    '    <section class="section sectionThree"' +
    '         data-6200="opacity:0;transform:translateY(0px);"' +
    '         data-6500="opacity:1;transform:translateY(-680px);"' +
    '         data-7500="opacity:1;transform:translateY(-680px);"' +
    '         data-7700="opacity:0;transform:translateY(-950px);"' +
    '    >' +
    '        <i class="linearicon linearicon-reading partIcon"></i>' +
    '        <h4>دانش فنی </h4>' +
    '        <div class="smalltext">چیزهایی که مثلا بلدم ...</div>' +
    '        <hr class="separator"/>' +
    '        <ul class="left">' +
    '            <li>PHP <span class="colored">[laravel , zend framework2 , twig , blade , orm ... ]</span></li>' +
    '            <li>Javascript <span class="colored">[pure , jquery , angular.js , react.js , pug ...]</span></li>' +
    '            <li>Web <span class="colored">[html5 , css3 , velocity , animate , svg ...]</span></li>' +
    '            <li>Database <span class="colored">[Mysql , sqlserver , sqlite , noSql ...]</span></li>' +
    '            <li>Graphic <span class="colored">[AdobePhotoShop , CorelDraw , paint :)) ...]</span></li>' +
    '        </ul>' +
    '    </section>' +
    '' +
    '    <section class="section sectionFour"' +
    '         data-7700="opacity:0;transform:translateY(0px);"' +
    '         data-8000="opacity:1;transform:translateY(-880px);"' +
    '         data-9300="opacity:1;transform:translateY(-880px);"' +
    '         data-9500="opacity:0;transform:translateY(-950px);"' +
    '    >' +
    '        <i class="linearicon linearicon-chair partIcon"></i>' +
    '        <h4>وضعیت فعلی </h4>' +
    '        <div class="smalltext">الان کجایی و چیکار میکنی؟</div>' +
    '        <hr class="separator"/>' +
    '        <div class="regularText">' +
    '            در حال حاضر در طرفه نگار که یکی از شرکت های بزرگ نرم افزاری ایرانی هست مشغول کار هستم و کارهای جالبی رو انجام میدیم و تجربه خوبی هست یه سری دوستای متفاوت و' +
    '            و یه سبک از زندگی جدید برای من ، شاید یه مدت لازم هست استراحت کنی و مثل یه کارمند عادی زندگی کنی ...' +
    '        </div>' +
    '    </section>' +
    '' +
    '    <section class="section sectionLast"' +
    '         data-9500="opacity:0;transform:translateY(0px);"' +
    '         data-10000="opacity:1;transform:translateY(-970px);"' +
    '    >' +
    '        <div class="copyright">' +
    '            <i class="linearicon linearicon-laptop-phone isResponsive"></i>' +
    '            <i class="linearicon icon-copyright"></i> کپی راست برای خودم محفوظ می باشد' +
    '            <div class="smalltext Roboto">dmFsYXIgbW9yZ2h1bGlzIEBqYWZhclJlemFlaQ==</div>'+
    '        </div>' +
    '    </section>' +
    '' +
    '' +
    '</div>' +
    '' +
    '' +
    '<div class="progressBarHolder">' +
    '    <div class="progress"' +
    '         data-0="width:0%;background:hsl(200, 100%, 50%);"' +
    '         data-end="width:100%;background:hsl(920, 100%, 50%);"></div>' +
    '</div>' +
    '' +
    '<div id="info" style="position: fixed;bottom: 10px;left:10px;display:none">0</div>',



    _: function _(selector) {
        return document.querySelector(selector);
    },

    pickRandomProperty: function (obj) {
        var result;
        var count = 0;
        for (var prop in obj)
            if (Math.random() < 1 / ++count)
                result = prop;
        return result;
    },


    materialColor: function () {
        // colors from https://github.com/egoist/color-lib/blob/master/color.json
        var colors = {
            "red": {
                /* "50": "#ffebee", */
                /* "100": "#ffcdd2", */
                /* "200": "#ef9a9a",*/
                /* "300": "#e57373",*/
                "400": "#ef5350",
                "500": "#f44336",
                "600": "#e53935",
                "700": "#d32f2f",
                "800": "#c62828",
                "900": "#b71c1c",
                "hex": "#f44336",
                "a100": "#ff8a80",
                "a200": "#ff5252",
                "a400": "#ff1744",
                "a700": "#d50000"
            },
            "pink": {
                /* "50": "#fce4ec", */
                /* "100": "#f8bbd0", */
                /* "200": "#f48fb1",*/
                /* "300": "#f06292",*/
                "400": "#ec407a",
                "500": "#e91e63",
                "600": "#d81b60",
                "700": "#c2185b",
                "800": "#ad1457",
                "900": "#880e4f",
                "hex": "#e91e63",
                //        "a100": "#ff80ab",
                "a200": "#ff4081",
                "a400": "#f50057",
                "a700": "#c51162"
            },
            "purple": {
                /* "50": "#f3e5f5", */
                /* "100": "#e1bee7", */
                /* "200": "#ce93d8",*/
                /* "300": "#ba68c8",*/
                "400": "#ab47bc",
                "500": "#9c27b0",
                "600": "#8e24aa",
                "700": "#7b1fa2",
                "800": "#6a1b9a",
                "900": "#4a148c",
                "hex": "#9c27b0",
                //        "a100": "#ea80fc",
                "a200": "#e040fb",
                "a400": "#d500f9",
                "a700": "#aa00ff"
            },
            "deepPurple": {
                /* "50": "#ede7f6", */
                /* "100": "#d1c4e9", */
                /* "200": "#b39ddb",*/
                /* "300": "#9575cd",*/
                "400": "#7e57c2",
                "500": "#673ab7",
                "600": "#5e35b1",
                "700": "#512da8",
                "800": "#4527a0",
                "900": "#311b92",
                "hex": "#673ab7",
                "a100": "#b388ff",
                "a200": "#7c4dff",
                "a400": "#651fff",
                "a700": "#6200ea"
            },
            "indigo": {
                /* "50": "#e8eaf6", */
                /* "100": "#c5cae9", */
                /* "200": "#9fa8da",*/
                /* "300": "#7986cb",*/
                "400": "#5c6bc0",
                "500": "#3f51b5",
                "600": "#3949ab",
                "700": "#303f9f",
                "800": "#283593",
                "900": "#1a237e",
                "hex": "#3f51b5",
                "a100": "#8c9eff",
                "a200": "#536dfe",
                "a400": "#3d5afe",
                "a700": "#304ffe"
            },
            "blue": {
                /* "50": "#e3f2fd", */
                /* "100": "#bbdefb", */
                /* "200": "#90caf9",*/
                /* "300": "#64b5f6",*/
                "400": "#42a5f5",
                "500": "#2196f3",
                "600": "#1e88e5",
                "700": "#1976d2",
                "800": "#1565c0",
                "900": "#0d47a1",
                "hex": "#2196f3",
                "a100": "#82b1ff",
                "a200": "#448aff",
                "a400": "#2979ff",
                "a700": "#2962ff"
            },
            "lightBlue": {
                /* "50": "#e1f5fe", */
                /* "100": "#b3e5fc", */
                /* "200": "#81d4fa",*/
                /* "300": "#4fc3f7",*/
                /* "400": "#29b6f6", */
                "500": "#03a9f4",
                "600": "#039be5",
                "700": "#0288d1",
                "800": "#0277bd",
                "900": "#01579b",
                "hex": "#03a9f4",
                //        "a100": "#80d8ff",
                "a200": "#40c4ff",
                "a400": "#00b0ff",
                "a700": "#0091ea"
            },
            "cyan": {
                /* "50": "#e0f7fa", */
                /* "100": "#b2ebf2", */
                /* "200": "#80deea",*/
                /* "300": "#4dd0e1",*/
                /* "400": "#26c6da", */
                "500": "#00bcd4",
                "600": "#00acc1",
                "700": "#0097a7",
                "800": "#00838f",
                "900": "#006064",
                "hex": "#00bcd4",
                //        "a100": "#84ffff",
                //        "a200": "#18ffff",
                //        "a400": "#00e5ff",
                "a700": "#00b8d4"
            },
            "teal": {
                /* "50": "#e0f2f1", */
                /* "100": "#b2dfdb", */
                /* "200": "#80cbc4",*/
                /* "300": "#4db6ac",*/
                "400": "#26a69a",
                "500": "#009688",
                "600": "#00897b",
                "700": "#00796b",
                "800": "#00695c",
                "900": "#004d40",
                "hex": "#009688",
                //        "a100": "#a7ffeb",
                //        "a200": "#64ffda",
                //        "a400": "#1de9b6",
                "a700": "#00bfa5"
            },
            "green": {
                /* "50": "#e8f5e9", */
                /* "100": "#c8e6c9", */
                /* "200": "#a5d6a7",*/
                /* "300": "#81c784",*/
                /* "400": "#66bb6a", */
                "500": "#4caf50",
                "600": "#43a047",
                "700": "#388e3c",
                "800": "#2e7d32",
                "900": "#1b5e20",
                "hex": "#4caf50",
                //        "a100": "#b9f6ca",
                //        "a200": "#69f0ae",
                //        "a400": "#00e676",
                "a700": "#00c853"
            },
            "lightGreen": {
                /* "50": "#f1f8e9", */
                /* "100": "#dcedc8", */
                /* "200": "#c5e1a5",*/
                /* "300": "#aed581",*/
                /* "400": "#9ccc65", */
                "500": "#8bc34a",
                "600": "#7cb342",
                "700": "#689f38",
                "800": "#558b2f",
                "900": "#33691e",
                "hex": "#8bc34a",
                //        "a100": "#ccff90",
                //        "a200": "#b2ff59",
                //        "a400": "#76ff03",
                "a700": "#64dd17"
            },
            "lime": {
                /* "50": "#f9fbe7", */
                /* "100": "#f0f4c3", */
                /* "200": "#e6ee9c",*/
                /* "300": "#dce775",*/
                /* "400": "#d4e157", */
                /* "500": "#cddc39", */
                /* "600": "#c0ca33", */
                "700": "#afb42b",
                "800": "#9e9d24",
                "900": "#827717",
                //        "hex": "#cddc39",
                //        "a100": "#f4ff81",
                //        "a200": "#eeff41",
                //        "a400": "#c6ff00",
                //        "a700": "#aeea00"
            },
            "yellow": {
                /* "50": "#fffde7", */
                /* "100": "#fff9c4", */
                /* "200": "#fff59d",*/
                /* "300": "#fff176",*/
                /* "400": "#ffee58", */
                /* "500": "#ffeb3b", */
                /* "600": "#fdd835", */
                //        "700": "#fbc02d",
                "800": "#f9a825",
                "900": "#f57f17",
                //        "hex": "#ffeb3b",
                //        "a100": "#ffff8d",
                //        "a200": "#ffff00",
                //        "a400": "#ffea00",
                //        "a700": "#ffd600"
            },
            "amber": {
                /* "50": "#fff8e1", */
                /* "100": "#ffecb3", */
                /* "200": "#ffe082",*/
                /* "300": "#ffd54f",*/
                /* "400": "#ffca28", */
                /* "500": "#ffc107", */
                /* "600": "#ffb300", */
                /* "700": "#ffa000", */
                //        "800": "#ff8f00",
                "900": "#ff6f00",
                //        "hex": "#ffc107",
                //        "a100": "#ffe57f",
                //        "a200": "#ffd740",
                //        "a400": "#ffc400",
                "a700": "#ffab00"
            },
            "orange": {
                /* "50": "#fff3e0", */
                /* "100": "#ffe0b2", */
                /* "200": "#ffcc80",*/
                /* "300": "#ffb74d",*/
                /* "400": "#ffa726", */
                /* "500": "#ff9800", */
                /* "600": "#fb8c00", */
                "700": "#f57c00",
                "800": "#ef6c00",
                "900": "#e65100",
                //        "hex": "#ff9800",
                //        "a100": "#ffd180",
                //        "a200": "#ffab40",
                "a400": "#ff9100",
                "a700": "#ff6d00"
            },
            "deepOrange": {
                /* "50": "#fbe9e7", */
                /* "100": "#ffccbc", */
                /* "200": "#ffab91",*/
                /* "300": "#ff8a65",*/
                /* "400": "#ff7043", */
                "500": "#ff5722",
                "600": "#f4511e",
                "700": "#e64a19",
                "800": "#d84315",
                "900": "#bf360c",
                "hex": "#ff5722",
                //        "a100": "#ff9e80",
                //        "a200": "#ff6e40",
                "a400": "#ff3d00",
                "a700": "#dd2c00"
            },
            "brown": {
                /* "50": "#efebe9", */
                /* "100": "#d7ccc8", */
                /* "200": "#bcaaa4",*/
                /* "300": "#a1887f",*/
                "400": "#8d6e63",
                "500": "#795548",
                "600": "#6d4c41",
                "700": "#5d4037",
                "800": "#4e342e",
                "900": "#3e2723",
                "hex": "#795548"
            },
            "grey": {
                /* "50": "#fafafa", */
                /* "100": "#f5f5f5", */
                /* "200": "#eeeeee",*/
                /* "300": "#e0e0e0",*/
                /* "400": "#bdbdbd", */
                /* "500": "#9e9e9e", */
                "600": "#757575",
                "700": "#616161",
                "800": "#424242",
                "900": "#212121",
                //        "hex": "#9e9e9e"
            },
            "blueGrey": {
                /* "50": "#eceff1", */
                /* "100": "#cfd8dc", */
                /* "200": "#b0bec5",*/
                /* "300": "#90a4ae",*/
                "400": "#78909c",
                "500": "#607d8b",
                "600": "#546e7a",
                "700": "#455a64",
                "800": "#37474f",
                "900": "#263238",
                "hex": "#607d8b"
            }
        };
        // pick random property
        //var property = pickRandomProperty(colors);
        var colorList = colors[jRLoader.pickRandomProperty(colors)];
        var newColorKey = jRLoader.pickRandomProperty(colorList);
        return colorList[newColorKey];
    },


    afterLoad : function () {
        if(jRLoader.animationLoading && jRLoader.filesLoading && !jRLoader.isLoaded) {
            jRLoader._('.loadingText').style.visibility = "hidden";
            jRLoader._('.spinner').style.visibility = "hidden";
            jRLoader._('.arrowLoaded').style.display = "block";
            jRLoader._('#loadData').innerHTML = jRLoader.htmlData;
           
            // set color to copy right icon responsive
            jRLoader._('.isResponsive').color = jRLoader.choosedColor;
            
            jRLoader.isLoaded = true;
            skrollr.init({
                render: function (data) {
                    //Log the current scroll position.
                    //jRLoader._('#info').innerHTML = data.curTop;
                }
            });
        }
    },

    setRandomColor: function () {
        var color = jRLoader.materialColor();
        jRLoader._('.bloc').style.borderColor = color;
        jRLoader._('.spinner').style.backgroundColor = color;
        jRLoader._('#jafarRezaeiAnimate').style.color = color;
        jRLoader._('.arrowLoaded').style.color = color;
        jRLoader._('#jafarRezaeiAnimate').style.fill = color;
        jRLoader.choosedColor = color;
    },


    build: function () {

        jRLoader.setRandomColor();

        var hi_jRun = new Vivus(
            'jafarRezaeiAnimate',
            {
                type: 'oneByOne',
                duration: 300,
                start: 'autostart',
                dashGap: 40,
                forceRender: false
            },
            function (obj) {
                setTimeout(function () {
                    obj.el.classList.add('finished');

                    // load bundle of javascript pack here then do the job
                    jRLoader.animationLoading = true;
                    jRLoader.afterLoad();

                }, 500);
            }
        );


        document.getElementById("jafarRezaeiAnimate").addEventListener("click" , function () {

            jRLoader.setRandomColor();

            this.classList.remove("finished");
            hi_jRun.reset().play();
        });
    }

};

jRLoader.build();
