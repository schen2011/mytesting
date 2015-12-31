$(function () {

    var spinner = null;
    var spinner_div = 0;
    var spinneroption = {
        lines: 13, length: 28, width: 14, radius: 42, scale: 1, corners: 1,
        color: '#000', opacity: 0.25, rotate: 0, direction: 1, speed: 1, trail: 60, fps: 20, zIndex: 2e9,
        className: 'spinner', top: '50%', left: '50%', position: 'absolute'
    }

    var opts = function () {
        return spinneroption
    }();
    spinner_div = $('#spinner').get(0);

    $.ajax({
        type: "get",
        url: "../../Home/GetData",
        contentType: "application/json",
        dataType: "json",
        beforeSend: function(){
            spinner = new Spinner(opts).spin(spinner_div);
            $.blockUI();
        },
        success: function (data) {
            buildtable(data);
            treegrid(data)
        },
        failure: function (response) {
            alert(response.d);
        },
        complete: function () {
            spinner.stop(spinner_div);
            $.unblockUI();
        }
    });






    var buildtable = function (tt) {

        localStorage.setItem("allmachines", JSON.stringify(tt));

        var obj = _.keys(tt);

        var totalarr = new Array();
        for (var i = 0; i < _.size(obj) ; i++) {
            var objarr = new Array();

            objarr.push(obj[i]);
            _.forIn(tt[obj[i]], function (value, key) {
                if ("broken" == key
                    || "leaseuser" == key
                    || "location" == key
                    || "name" == key
                    || "site" == key
                    || "status" == key
                    || "resources" == key
                    ) {
                    if ("resources" == key) {
                        if (_.isUndefined(value.cores)) {
                            objarr.push("");
                        }
                        else
                            objarr.push(value.cores);
                        if (_.isUndefined(value.sockets)) {
                            objarr.push("");
                        }
                        else
                            objarr.push(value.sockets);
                        if (_.isUndefined(value.cpus)) {
                            objarr.push("");
                        }
                        else
                            objarr.push(value.cpus);
                        if (_.isUndefined(value.disks)) {
                            objarr.push("");
                        }
                        else
                            objarr.push(value.disks);
                        if (_.isUndefined(value.memory)) {
                            objarr.push("");
                        }
                        else
                            objarr.push(value.memory);
                        if (_.isUndefined(value.disk1)) {
                            objarr.push("");
                        }
                        else
                            objarr.push(value.disk1);
                        if (_.isUndefined(value.disk2)) {
                            objarr.push("");
                        }
                        else
                            objarr.push(value.disk2);
                    }
                    else
                        objarr.push(value);
                }
            });
            totalarr.push(objarr);
        }

        var dt = $('#example').DataTable({
            'processing': true,
            data: totalarr,
            rowId: 3,
            "order": [[ 1, "asc" ]],
            columns: [
                {
                    "class": "details-control",
                    "orderable": false,
                    "data": null,
                    "defaultContent": ""
                },
                {
                    title: "Machine Name",
                    className: 'employeevisit'
                },
                {
                    title: "Site",
                    className: 'visitedtime'
                },
                {
                    title: "Location",
                    className: 'visitedtime'
                },
                {
                    title: "Lease User",
                    className: 'employeevisit'
                },
                {
                    title: "Status",
                    className: 'visitedtime'
                },
                {
                    title: "Broken",
                    className: 'visitedtime'
                },
                {
                    title: "Cores",
                    className: 'hiddenfield',
                },
                {
                    title: "Sockets",
                    className: 'hiddenfield'
                },
                {
                    title: "CPUs",
                    className: 'hiddenfield'
                },
                {
                    title: "Disks",
                    className: 'hiddenfield'
                },
                {
                    title: "Memory",
                    className: 'hiddenfield'
                },
                {
                    title: "Disk1",
                    className: 'hiddenfield'
                },
                {
                    title: "Disk2",
                    className: 'hiddenfield'
                },
                {
                    title: "Edit",
                    data: null,
                    className: "center",
                    "render": function (data, type, row) {
                        var machineId = row[4];
                        return '<a href="/Home/MachineDetail/' + machineId + '" class="btn btn-info">Edit</a>';
                    }
                }
            ],
            //ROW
            //0. machinename
            //1. broken
            //2. leasueruser
            //3. location
            //4. machinename
            //5. resource -> row[5]
            //6. site
            //7. status

            //totalarr
            //0. machinename
            //1. broken
            //2. leaseuser
            //3. location
            //4. machinename
            //5. resource -> core
            //6. resource -> socket
            //7. resource -> cpus
            //8. resource -> disks
            //9. resource -> memory
            //10. resource -> disk1
            //11. resource -> disk2
            //10. site 
            //11. status

            "columnDefs": [
            {
                "render": function (data, type, row) {
                    return row[0];
                },
                "targets": 1
            },
            {
                "render": function (data, type, row) {
                    return row[12];
                },
                "targets": 2
            },
            {
                "render": function (data, type, row) {
                    return row[3];
                },
                "targets": 3
            },
            {
                "render": function (data, type, row) {
                    return row[2];
                },
                "targets": 4
            },
            {
                "render": function (data, type, row) {
                    return row[13];
                },
                "targets": 5
            },
            {
                "render": function (data, type, row) {
                    return row[1];
                },
                "targets": 6
            },
            {
                "render": function (data, type, row) {
                    return row[5];
                },
                "targets": 7
            },
            {
                "render": function (data, type, row) {
                    return row[6];
                },
                "targets": 8
            },
            {
                "render": function (data, type, row) {
                    return row[7];
                },
                "targets": 9
            },
            {
                "render": function (data, type, row) {
                    return row[8];
                },
                "targets": 10
            },
            {
                "render": function (data, type, row) {
                    return row[9];
                },
                "targets": 11
            },
            {
                "render": function (data, type, row) {
                    return row[10];
                },
                "targets": 12
            },
            {
                "render": function (data, type, row) {
                    return row[11];
                },
                "targets": 13
            }
            ]
        });

        var detailRows = [];

        $('#example tbody').on('click', 'tr td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = dt.row(tr);
            var idx = $.inArray(tr.attr('id'), detailRows);

            if (row.child.isShown()) {
                tr.removeClass('details');
                row.child.hide();

                detailRows.splice(idx, 1);
            }
            else {
                tr.addClass('details');
                var rdata = dformat(row.data());
                row.child(rdata).show();

                if (idx === -1) {
                    detailRows.push(tr.attr('id'));
                }
            }
        });

        $('#example thead th').each(function (index) {
            if (index > 0) {
                var title = $(this).text();
            }
        });

        $(".filterbox").click(function (event) {
            event.preventDefault();
        });

        var table = $('#example').DataTable();

        table.columns().every(function () {
            var that = this;

            $('input', this.header()).on('keyup change', function (event) {

                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });

        var dformat = (function (d) {
            var ss = localStorage.getItem("allmachines");
            ss = JSON.parse(ss);
            var str =
            'Sockets: ' + ss[d[0]]["resources"].sockets + '<br/>' +
            'Cores: ' + ss[d[0]]["resources"].cores + '<br />' +
            'Processor: ' + ss[d[0]]["resources"].cpus + '<br />' +
            'Memory: ' + ss[d[0]]["resources"].memory + '<br />' +
            'Disks: ' + ss[d[0]]["resources"].disks + '<br />';
            var noofdisks = parseInt(ss[d[0]]["resources"].disks);
            for (var i = 0; i < noofdisks ; i++) {
                var diskstr = "Disk" + _(i + 1).toString() + ": " + ss[d[0]]["resources"]["disk" + _(i + 1).toString()] + "<br/>";
                str += diskstr;
            }
            return str;
        });

        dt.on('draw', function () {
            $.each(detailRows, function (i, id) {
                $('#' + id + ' td.details-control').trigger('click');
            });
        });

        function getdiskinfo(res, diskno) {
            var returnstr;
            for (var i = 0; i < diskno; i++) {
                var str = "Disk" + i + ": " + res["resource"]["disk" + i] + "<br />";
                returnstr += str;
            }
            return returnstr;
        }
    }

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
            var row = args.row;
            var table = $('#example').dataTable();
            if (!_.isNull(row.machinename))
                table.fnFilter(row.machinename);
            else {
                console.log(row.sitename);
                table.fnFilter(row.sitename);
            }
        });

        $("#treeGrid").on('rowDoubleClick', function (event) {
            var row = args.row;
            console.log("Double Click");
            console.log(row.machinename);
            if (!_.isNull(row.machinename)) {
                window.location.href = '/Home/MachineDetail/' + row.machinename
            }
        });
    }
});