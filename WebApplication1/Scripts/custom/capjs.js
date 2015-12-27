$(function () {
    var machinelist = '@ViewData["machinelist"]';

    @{
        var serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
    }

    var tt = @Html.Raw(serializer.Serialize(ViewData["machinelist"]));

    var mem = _.memoize(function(obj){return obj;});

    mem.cache.set('ttmem', tt);

    //console.log(tt);
    var obj = _.keys(tt);
        
    var totalarr = new Array();
    for(var i=0; i < _.size(obj); i++)
    {
        var objarr = new Array();
            
        objarr.push(obj[i]);
        _.forIn(tt[obj[i]], function(value, key)
        {
            if("name" == key || "location" == key 
                || "leaseuser" == key 
                || "status" == key
                )
                objarr.push(value);
        });
        totalarr.push(objarr);
    }       
           
    //var table = $('#example').
    var dt = $('#example').DataTable({
        'processing':true,
        data: totalarr,
        rowId: 3,
        columns:[
            {
                "class":"details-control",
                "orderable": false,
                "data":  null,
                "defaultContent": ""
            },
            {
                title: "Page Visited",
                className: 'employeevisit'
            },
            {
                title: "Time",
                className: 'visitedtime'
            },
            {
                title: "Page Visited",
                className: 'employeevisit'
            },
            {
                title: "Time",
                className: 'visitedtime'
            },
            {
                title: "Edit",
                data: null,
                className: "center",
                "render": function(data, type, row)
                {
                    var machineId = row[3];
                    return '<a href="/Home/MachineDetail/' + machineId + '" class="btn btn-info">Edit</a>';
                }    
            }
        ]

    });
        
    $('#example').on('click', 'a.editor_edit', function (e) {
        e.preventDefault();
        var tr = $(this).closest('tr');
        var row = dt.row( tr );
        var idx = $.inArray( tr.attr('id'), detailRows );
        var machineId = tr.attr('id');
        //Ajax redirect
        //
        var MyAppUrlSettings =
        {
            MyUsefulUrl: '@Url.Action("MachineDetail", "Home")'
        }

        $.ajax({
            type: 'POST',
            url: MyAppUrlSettings.MyUsefulUrl,
            data: {"machineId": machineId },
            success: function(){
                alert('hello world');
            },
            dataType: JSON
        });
    } );
        
    var detailRows = [];

    $('#example tbody').on( 'click', 'tr td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = dt.row( tr );
        var idx = $.inArray( tr.attr('id'), detailRows );
 
        if ( row.child.isShown() ) {
            tr.removeClass( 'details' );
            row.child.hide();

            detailRows.splice( idx, 1 );
        }
        else {
            tr.addClass( 'details' );
            //var rdata = format(row.data());
            var rdata = dformat(row.data());
            row.child(rdata).show();
 
            if ( idx === -1 ) {
                detailRows.push( tr.attr('id') );
            }
        }
    } );


    var dformat = (function(d)
    {
        var ss = @Html.Raw(serializer.Serialize(ViewData["machinelist"]));
        var str = 
        'Sockets: '+ ss[d[0]]["resources"].sockets +'<br/>'+
        'Cores: '+ ss[d[0]]["resources"].cores + '<br />'+
        'Processor: '+ ss[d[0]]["resources"].cpus + '<br />'+
        'Memory: '+ ss[d[0]]["resources"].memory + '<br />'+
        'Disks: ' + ss[d[0]]["resources"].disks + '<br />';        
        var noofdisks = parseInt(ss[d[0]]["resources"].disks);
        for(var i=0; i < noofdisks ; i++)
        {
            var diskstr = "Disk" + _(i+1).toString() + ": " + ss[d[0]]["resources"]["disk" + _(i+1).toString()] + "<br/>";
            str += diskstr;
        }
        return str;
    });

    dt.on( 'draw', function () {
        $.each( detailRows, function ( i, id ) {
            $('#'+id+' td.details-control').trigger( 'click' );
        } );
    } );



    function getdiskinfo(res, diskno)
    {
        var returnstr;
        for(var i=0; i < diskno; i++)
        {
            var str = "Disk" + i + ": " + res["resource"]["disk" + i] + "<br />";
            returnstr += str;
        }
        return returnstr;
    }

});