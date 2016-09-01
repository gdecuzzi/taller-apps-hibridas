angular.module('ejemploconf.routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('root', {
    abstract: true,
    views:{
      'root-view': {
        templateUrl: 'modules/menu/menu.html',
        controller: "MenuCtrl"
      }
    }
  })

  .state('root.schedule', {
    url: '^/schedule',
    views: {
      'content': {
        templateUrl: 'modules/schedule/schedule.html',
        controller: 'ScheduleCtrl'
      }
    }
  })

  .state('talkDetails', {
    cache: false,
    url: '/schedule/:talkId',
    views: {
      'root-view': {
        templateUrl: 'modules/talk_details/talk_details.html',
        controller: 'TalkDetailsCtrl'
      }
    },
    defaultBack: {
      state: 'root.schedule'
    }
  })

  $urlRouterProvider.otherwise('/schedule');
});
