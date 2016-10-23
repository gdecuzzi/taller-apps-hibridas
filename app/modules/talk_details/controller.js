angular.module('ejemploconf.controllers')
.controller('TalkDetailsCtrl', function($scope, TalkService) {
  $scope.talk=TalkService.selectedTalk;
});
