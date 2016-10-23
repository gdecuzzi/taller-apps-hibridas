angular.module('ejemploconf.controllers')
.controller('MenuCtrl', function($scope, $state, $ionicHistory) {
  $scope.$on('$ionicView.beforeEnter', function(){
    $ionicHistory.clearHistory();
  });

  $scope.goTo = function(newState){
    $ionicHistory.nextViewOptions({
      historyRoot: true
    });
    $state.go(newState);
  }
});


