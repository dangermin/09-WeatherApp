(function() {
    'use strict';

    angular
        .module('app')
        .factory('WeatherFactory', WeatherFactory);

    WeatherFactory.$inject = ['$http', '$q', '$log'];

    function WeatherFactory($http, $q, $log) {
        var service = {
            getWeather: getWeather
        };
        return service;

        function getWeather(cityPass) {

            var apiId = '7bb251471198d4ac538e3f9acb720948';
            var defer = $q.defer();
            var url = 'http://api.openweathermap.org/data/2.5/weather';

            console.log(url);
            $http({
                    method: 'GET',
                    url: url,
                    params: {
                        q: cityPass,
                        mode: 'json',
                        units: 'imperial',
                        appid: '7bb251471198d4ac538e3f9acb720948'
                    }
                })
                .then(
                    function(response) {
                        if (typeof response.data === 'object') {
                            defer.resolve(response.data);
                            toastr.success('Weather is Working!');
                        } else {
                            defer.reject(response);
                            toastr.warning('no weather found<br/>' + response.config.url);
                        }
                    },
                    // failure
                    function(error) {
                        defer.reject(error);
                        $log.error(error);
                        toastr.error('error: ' + error.data + '<br/>status: ' + error.statusText);
                    });

            return defer.promise;

        };
    };
})();
