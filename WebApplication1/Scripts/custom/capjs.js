$(function () {

    $.ajax({
        type: "get",
        url: "../../Home/GetData",
        contentType: "application/json",
        dataType: "json",
        success: function (data) { treegrid(data) },
        failure: function (response) {
            alert(response.d);
        }
    });
    // prepare the data
    var treegrid = function (data) {
        var machines = [];
        var machineid = 0;
        _.forEach(data, function (n, keys) {
            var row = { "sitename": n.site, "machinename": n.name, "leaseuser": n.leaseuser };

            machines.push(row);
        });
        var sitemachines = _.groupBy(data, 'site');
        var ms = [];
        _.forEach(sitemachines, function (n, key) {

            var available = _.size(n) - _.size(_.countBy(n, { "leaseto": null }));
            var site = { "sitename": key, "machinename": null, "machineid": key + "0", "leaseuser": available, "parentmachineid": key };
            ms.push(site);
            var counter = 1;
            _.forEach(n, function (n, key) {

                if (null == n.leaseuser) {
                    n.leaseuser = "idle";
                }
                var mss = {
                    "sitename": n.site, "machinename": n.name, "leaseuser": n.leaseuser,
                    "parentmachineid": n.site + "0", "machineid": n.site + counter
                };
                counter++;
                ms.push(mss);
            });
        });

        var machines = [
            { "machinename": "", "sitename": "FTL", "leaseuser": null, "machineid": "adsds" },
            { "machinename": "3R93-01", "sitename": "adsds", "leaseuser": null, "machineid": null },
            { "machinename": "3R93-012", "sitename": "adsds", "leaseuser": "stephench", "machineid": null },
            { "machinename": "NKG01", "sitename": "NKG", "leaseuser": null, "machineid": null }
        ];


        var source =
        {
            dataType: "json",
            dataFields: [
                { name: 'sitename', type: 'string' },
                { name: 'machinename', type: 'string' },
                { name: 'leaseuser', type: 'string' },
                { name: 'parentId', type: 'string' },
                { name: 'parentmachineid', type: 'string' },
                { name: "machineid", type: 'string' }
            ],
            hierarchy:
            {
                /*
                groupingDataFields:
                [
                    {
                        name: "sitename"
                    }
                ]
                */
                keyDataField: { name: 'machineid' },
                parentDataField: { name: 'parentmachineid' }
                
            },
            id: 'machinename',
            localData: ms
        };
        var dataAdapter = new $.jqx.dataAdapter(source);
        // create Tree Grid
        $("#treeGrid").jqxTreeGrid(
        {
            width: 300,
            source: dataAdapter,
            columnsResize: true,
            sortable: true,
            filterable: true,
            filterMode: 'simple',
            ready: function () {
                $("#treeGrid").jqxTreeGrid('expandRow', '1');
                $("#treeGrid").jqxTreeGrid('expandRow', '2');
                $("#treeGrid").jqxTreeGrid('selectRow', '2');

                $("#treeGrid").jqxTreeGrid('focus');
                /*
                $("#treeGrid tr").on('click', function (event) {
                    alert($(event.target).text());
                });
                */
            },
            columns: [
                  { text: 'Site', dataField: 'sitename',columnGroup: 'Name', width: 100, 'class': "hidden" },
                  { text: 'Machine', dataField: 'machinename', columnGroup: 'Name', width: 100 },
                  { text: 'Status', dataField: 'leaseuser', width: 100}
            ],
            columnGroups: [
              { text: 'Name', name: 'Name' }
            ]
        });

        $("#treeGrid").on('rowClick', function (event) {
            var args = event.args;
            var key = args.key;
            var row = args.row;
            console.log("One Click");
        });

        $("#treeGrid").on('rowDoubleClick', function (event) {
            var args = event.args;
            var key = args.key;
            var row = args.row;
            console.log("Double Click");
            console.log(row.machinename);
        });
    }
});