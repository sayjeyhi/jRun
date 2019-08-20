if(jRun){

    jRun.tables = {};

    /**
     * add data table pre-defined values
     */
    jRun.addTableDefaults = function(){
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
    };


    /**
     * Data table builder [beta version]
     */
    jRun.buildDataTable = function (tableObj) {

        // set default things about table
        jRun.addTableDefaults();

        var $selector = $("table.jTable");
        if(tableObj !== undefined){
            $selector = tableObj;
        }


        // data table with class torfe
        $selector.each(function () {
            var table = $(this);

            var id = table.attr("id") || 0;
            if (id === 0) {
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
    };


    /**
     * Destroy specific dataTable with its Id
     * @param id
     */
    jRun.destroyDataTable = function (id) {

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
    };

}