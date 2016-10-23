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

  function getTalkById(talkId, successCallback, errorCallback){
    var cachedTalk = _.find(cache.schedule, function(talk){
      return talk.id == talkId;
    });
    if(cachedTalk){
      successCallback(cachedTalk);
      return
    }

    var url = AppSettings.api_url + '/schedule/' + talkId;
    var canceler = $q.defer();
    $http.get(url, {timeout: canceler.promise}).then(function(response){
      var event = response.data;
      successCallback(event);
    }, errorCallback);
    return canceler;
  }


  return {
    schedule: getSchedule,
    scheduledOn: getTalksOnDate,
    talkById: getTalkById
  }
});
