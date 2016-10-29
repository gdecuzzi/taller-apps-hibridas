angular.module('ejemploconf.controllers')
.controller('ScheduleCtrl', function($scope, ScheduleService, $state, TalkService) {
    var onScheduleLoaded = function (data){
      $scope.schedule = data;
    };
    ScheduleService.schedule(onScheduleLoaded);


    $scope.yesterdayTalks = function(){
      $scope.schedule = ScheduleService.scheduledOn(moment("2016-10-28"));
    };

    $scope.todayTalks = function(){
      $scope.schedule = ScheduleService.scheduledOn(moment("2016-10-29"));
    };

    $scope.allTalks = function(){
      ScheduleService.schedule(onScheduleLoaded);
    };

    $scope.setTalk=function(talk){
      TalkService.selectedTalk=talk;
      $state.go('talkDetails', {"talkId": talk.id});
    };
});
