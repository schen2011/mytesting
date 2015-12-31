

var machineapiurl = "../../Home/GetData";
var datatype = "json";


var machinedata;

var getpowerstatusurl = "../../Home/GetPowerStatus"
var getjobhistoryurl = "../../Home/GetJobHistroies"


var mpp = angular.module('machinedetail', []);
mpp.controller('MachineDetailController', ['$scope', '$http', function ($scope, $http) {

        $http({
            method:'GET',
            url: machineapiurl,
            params: { "id": "NKGXENRT-1" },
        }).success(function(data, status){

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

        }).error(function(data, status){
            console.log("please check your api");
        });


        $http({
                method: 'GET',
                url: getpowerstatusurl,
                params: { "id": "NKGXENRT-1" },
            }).success(function (data, status) {
                $scope.powerstatus = data.status;
        }).error(function (data, status) {
            console.log("error is" + status);
        });


        $http({
            method: 'GET',
            url: getjobhistoryurl,
            params: { "id": "NKGXENRT-1" },
        }).success(function (data, status) {
            console.log("get job history success");
        }).error(function (data, status) {
            console.log("error is" + status);
        });

    //$scope.greeting = "LLL";
    //$scope.double = function (value) { return value * 2; };
}]);

/*
var machinedata = $.get(machineapiurl, function (data, status) {
    alert("Data: " + data + "\nStatus: " + status);
});
*/
