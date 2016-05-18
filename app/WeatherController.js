(function() {

    'use strict';

    angular
        .module('app')
        .controller('WeatherController', WeatherController);
    // vm.city = "{ name: 'San Diego' };"

    WeatherController.$inject = ['WeatherFactory', '$log'];

    /* @ngInject */
    function WeatherController(WeatherFactory, $log) {
        var vm = this;
        vm.title = 'WeatherController';
        vm.cityPass = vm.city;
        vm.cityArray = [];
        vm.postArray = [];

        var todayDate;

        vm.postHistory = function(cityPass) {
            vm.cityArray.unshift({ name: cityPass, time: moment().format("lll") });
            console.log(vm.cityArray.length)
            vm.todayDate = moment().format('lll');

            if (vm.cityArray.length > 5) {
                vm.cityArray.pop();
                console.log(vm.cityArray.length)
            }
        };

        // vm.city = 'San Diego';
        vm.getWeather = function getWeather(city) {
            WeatherFactory.getWeather(city).then(
                function(response) {
                    // console.log(response)
                    vm.WeatherResponse = response;
                    vm.WeatherResponseName = response.name;
                    vm.WeatherResponseLat = response.coord.lat;
                    vm.WeatherResponseLon = response.coord.lon;
                    vm.WeatherResponseTemp = response.main.temp;
                    vm.WeatherResponsePressure = response.main.pressure;
                    vm.WeatherResponseHumidity = response.main.humidity;
                    vm.WeatherResponseLowTemp = response.main.temp_min;
                    vm.WeatherResponseHighTemp = response.main.temp_max;
                    vm.WeatherResponseWindSpeed = response.wind.speed;

                    vm.postHistory(response.name);
                },

                function(error) {
                    
                    $log.error('failed to get weatherAPI', error)
                });

        };
        activate();

        function activate() {
            vm.getWeather('san diego');

        };
    };
})();
