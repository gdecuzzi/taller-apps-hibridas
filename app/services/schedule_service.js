angular.module('ejemploconf.services')
.factory('ScheduleService', function($http, $q, _) {
  var cache = {
    schedule: []
  };

  function getSchedule(successCallback, errorCallback) {
    var url = AppSettings.api_url + '/schedule';
    var canceler = $q.defer();
    $http.get(url, {timeout: canceler.promise}).then(function(response){
      cache.schedule = response.data;
      successCallback(response.data);
    }, errorCallback);
    return canceler;
  }

    function getTalksOnDate(day){
      return _.filter(cache.schedule, function(talk){ return day.isSame(talk.date,'day');});
    }

  return {
    schedule: getSchedule,
    scheduledOn: getTalksOnDate
  }
});
