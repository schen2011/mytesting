

var machineapiurl = "../../Home/GetData";
var datatype = "json";


var machinedata;

var getpowerstatusurl = "../../Home/GetPowerStatus";
var getjobhistoryurl = "../../Home/GetJobHistroies";
var poweroncontrollerurl = "../../Home/PowerOn";
var poweroffcontrollerurl = "../../Home/PowerOff";
var powercyclecontrollerurl = "../../Home/PowerCycle";
var borrowmachineurl = "../../Home/BorrowMachine";
var returnmachineurl = "../../Home/ReturnMachine";
var extendmachineurl = "../../Home/ExtendMachine";

var mpp = angular.module('machinedetail', []);
mpp.controller('MachineDetailController', ['$scope', '$http', function ($scope, $http) {

    var machinenametest = $('#machinenametest').html()

    //get machine details
    $http({
        method: 'GET',
        url: machineapiurl,
        params: { "id": machinenametest },
    }).success(function (data, status) {
        $scope.machinename = _.first(_.pluck(data, "name"));
        $scope.machinenamedisplay = _.first(_.pluck(data, "name")) + '.xenrt.citrite.net';
        $scope.description = _.first(_.pluck(data, "description")) == null ? "no description" : _.first(_.pluck(data, "description"));
        var resoucelist = _.pluck(data, "resources");
        $scope.sockets = _.first(_.pluck(resoucelist, "sockets"));
        $scope.cores = _.first(_.pluck(resoucelist, "cores"));
        $scope.cpus = _.first(_.pluck(resoucelist, "cpus"));
        $scope.memory = _.first(_.pluck(resoucelist, "memory"));
        $scope.diskno = _.first(_.pluck(resoucelist, "disks"));
        $scope.disk1 = _.first(_.pluck(resoucelist, "disk1"));
        $scope.disk2 = _.first(_.pluck(resoucelist, "disk2"));
        $scope.status = _.first(_.pluck(data, "status"));
        $scope.leaseuser = _.first(_.pluck(data, "leaseuser"));
        $scope.ip = _.first(_.pluck(data, "ctrladdr"));
        var params = _.pluck(data, "params");
        $scope.racktableurl = _.first(_.pluck(params, "ASSET_URL"));

    }).error(function (data, status) {
        console.log("please check your api");
    });

    //get power status
    $http({
        method: 'GET',
        url: getpowerstatusurl,
        params: { "id": machinenametest },
    }).success(function (data, status) {
        $scope.powerstatus = data.status;
    }).error(function (data, status) {
        console.log("error is" + status);
    });

    //get job history
    $http({
        method: 'GET',
        url: getjobhistoryurl,
        params: { "id": machinenametest },
    }).success(function (data, status) {
        $scope.jobhistory = data;
        buildjobhistorytable(data);
        $scope.lastjob = _.last(_.pluck(data, "id"));
        $scope.jobbreif = _.last(_.pluck(data, "description"));
        $scope.job = {
            id: _.last(_.pluck(data, "id")),
            description: _.last(_.pluck(data, "description"))
        };
    }).error(function (data, status) {
        console.log("error is" + status);
    });

    //return machine
    $scope.returnmachine = function () {
        $.post(returnmachineurl, { "machineid": $scope.machinename }, function (data, status) {
            if ("success" == status) {
                window.location.reload(true);
            }
        });
    };

    $scope.duration = '';
    $scope.reason = '';
    $scope.borrowmachine = function () {
        $scope.reason = this.reason;
        $scope.duration = this.duration;
        $.post(borrowmachineurl, { "machineid": $scope.machinename, "reason": $scope.reason, "duration": $scope.duration }, function (data, status) {
            if ("success" == status) {
                window.location.reload(true);
            }
        });
    };

    $scope.extendmachine = function () {
        $scope.reason = this.reason;
        $scope.duration = this.duration;
        $.post(extendmachineurl, { "machineid": $scope.machinename, "reason": $scope.reason, "duration": $scope.duration }, function (data, status) {
            if ("success" == status) {
                window.location.reload(true);
            }
        });
    };




    $scope.openracktables = function () {
        window.open($scope.racktableurl, '_blank');
    };

    $scope.poweron = function () {
        $.post(poweroncontrollerurl, { "id": $scope.machinename }, function (data, status) {
            if ("success" == status) {
                window.location.reload(true);
            }
        });
    };

    $scope.poweroff = function () {
        $.post(poweroffcontrollerurl, { "id": $scope.machinename }, function (data, status) {
            if("success" == status)
            {
                window.location.reload(true);
            }
        });
    };

    $scope.powercycle = function () {
        $.post(powercyclecontrollerurl, { "id": $scope.machinename }, function (data, status) {
            if ("success" == status) {
                window.location.reload(true);
            }
        });
    };

    var buildjobhistorytable = function (inputs) {

        var input = [];
        _.forEach(inputs, function (data, key) {
            var eachinput = [];
            eachinput.push(data.id);
            eachinput.push(data.user);
            eachinput.push(data.description);
            eachinput.push(data.result);
            eachinput.push(data.status);
            eachinput.push(data.logUrl);
            input.push(eachinput);
        });

        //ROW
        //0. jobid
        //1. user
        //2. description
        //3. result
        //4. status
        //5. logUrl

        var dt = $('#jobhistorytab').DataTable({
            'processing': true,
            data: input,
            rowId: 0,
            "order": [[1, "asc"]],
            "columns": [
                {
                    title: "JobId",
                    className: 'employeevisit'
                },
                {
                    title: "User",
                    className: 'visitedtime'
                },
                {
                    title: "Description",
                    className: 'visitedtime'
                },
                {
                    title: "Result",
                    className: 'employeevisit'
                },
                {
                    title: "Status",
                    className: 'visitedtime'
                },
                {
                    title: "Detail",
                    //data: null,
                    className: "center"
                }
            ],
            "fnRowCallback": function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                if (aData[3] == "ERROR")
                {
                    $('td', nRow).css('background-color', 'Red');
                }
            },
            "columnDefs": [
            {
                "render": function (data, type, row) {
                    if (!_.isNull(row[5])) {
                        var logurl = row[5];
                        return '<a href="' + logurl + '" class="btn btn-info">Log</a>';
                    }
                    else
                        return "No Log";
                },
                "targets": 5
            }],
        });
    }

}])

.directive('serialport', function () {
    return {
        template: 'Unix: <text class="serialtext">ssh -t cons@ {{ ip }} {{ machinename }} (password console)</text><br />Windows: <text class="serialtext">echo {{ machinename }} > %TEMP%\'xenrt-puttycmd & putty.exe -t cons@{{ ip }} -pw console -m %TEMP%\'xenrt-puttycmd (requires PuTTY on %PATH%)</text>'
    };
})

