angular.module('ejemploconf.controllers')
.controller('ScheduleCtrl', function($scope, ScheduleService) {
    var onScheduleLoaded = function (data){
      $scope.schedule = data;
    };

    ScheduleService.schedule(onScheduleLoaded);
});
