angular.module('ejemploconf.controllers')
.controller('ScheduleCtrl', function($scope, ScheduleService, $state, TalkService) {
    var onScheduleLoaded = function (data){
      $scope.schedule = data;
    };

    ScheduleService.schedule(onScheduleLoaded);

  $scope.setTalk=function(talk){
    TalkService.selectedTalk=talk;
    $state.go('talkDetails', {"talkId": talk.id});
  };
});
