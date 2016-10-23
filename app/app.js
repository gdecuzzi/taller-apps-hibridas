angular.module('ejemploconf.services', []);
angular.module('ejemploconf.directives', []);
angular.module('ejemploconf.controllers', []);

angular.module('ejemploconf', [
  'ionic',
  'ejemploconf.services',
  'ejemploconf.controllers',
  'ngCordova',
  'underscore',
  'ejemploconf.routes'
])
.config(function($ionicConfigProvider){
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.text("   ");
  $ionicConfigProvider.views.transition('none');
  $ionicConfigProvider.views.swipeBackEnabled(false);
})
.run(function($ionicPlatform, $cordovaSplashscreen, $cordovaKeyboard, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(false);
      $cordovaKeyboard.hideAccessoryBar(true);
      $cordovaKeyboard.disableScroll(false);
    }

    if (window.StatusBar) {
      StatusBar.overlaysWebView(true);
      StatusBar.styleLightContent(); //White
    }

    if(navigator.splashscreen) {
      setTimeout(function () {
        $cordovaSplashscreen.hide();
      }, 500);
    }
  });
});
