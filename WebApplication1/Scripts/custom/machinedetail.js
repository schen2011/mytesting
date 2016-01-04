

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

var mpp = angular.module('machinedetail', []);
mpp.controller('MachineDetailController', ['$scope', '$http', function ($scope, $http) {

    var machinenametest = $('#machinenametest').html()

    $http({
        method: 'GET',
        url: machineapiurl,
        params: { "id": machinenametest },
    }).success(function (data, status) {
        console.log("call success");
        $scope.machinename = _.first(_.pluck(data, "name"));
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


    $http({
        method: 'GET',
        url: getpowerstatusurl,
        params: { "id": machinenametest },
    }).success(function (data, status) {
        $scope.powerstatus = data.status;
    }).error(function (data, status) {
        console.log("error is" + status);
    });


    $http({
        method: 'GET',
        url: getjobhistoryurl,
        params: { "id": machinenametest },
    }).success(function (data, status) {
        console.log("get job history success");
        $scope.lastjob = _.last(_.pluck(data, "id"));
        $scope.jobbreif = _.last(_.pluck(data, "description"));
        $scope.job = {
            id: _.last(_.pluck(data, "id")),
            description: _.last(_.pluck(data, "description"))
        };
    }).error(function (data, status) {
        console.log("error is" + status);
    });

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



}])

.directive('serialport', function () {
    return {
        template: 'Unix: <text class="serialtext">ssh -t cons@ {{ ip }} {{ machinename }} (password console)</text><br />Windows: <text class="serialtext">echo {{ machinename }} > %TEMP%\'xenrt-puttycmd & putty.exe -t cons@{{ ip }} -pw console -m %TEMP%\'xenrt-puttycmd (requires PuTTY on %PATH%)</text>'
    };
})

