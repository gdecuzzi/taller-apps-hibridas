angular.module('ejemploconf.controllers')
.controller('ScheduleCtrl', function($scope, ScheduleService) {
    var onScheduleLoaded = function (data){
      $scope.schedule = data;
      //$scope.schedule = ScheduleService.scheduledOn(moment("2016-10-29"));
    };

    ScheduleService.schedule(onScheduleLoaded);
});
