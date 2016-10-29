angular.module('ejemploconf.controllers')
.controller('TalkDetailsCtrl', function($scope, TalkService) {
  $scope.talk=TalkService.selectedTalk;

    $scope.bookEvent = function(){
      var start = moment($scope.talk.date);
      var end = start.add(1, 'hour');
      try {
        window.plugins.calendar.createEvent(
          $scope.talk.title, 
          $scope.talk.stage_slug,
          $scope.talk.description,
          start,
          end,
          function (result) {
            $ionicPopup.alert({
              title: 'Charla agendada',
              template: 'La charla fue agendada en el calendario de tu dispositivo, podés consultarla en cualquier momento.'
            });
          });
      } catch(err){
        console.log(err);
        $ionicPopup.alert({
          title: 'Error al agendar',
          template: 'La charla no pudo ser agendada. Por favor verifica que el calendario de tu dispositivo se encuentre configurado'
        });
      }
    };
});
