describe('weather controller test', function() {
    beforeEach(module('app'));
    var $scope;
    var $controller;
    var $q
    var deferred;
    var vm;


    describe('with mock of weather factory', function() {
        beforeEach(inject(function(_$controller_, _$rootScope_, _$q_, _$log_, WeatherFactory) {
            $scope = _$rootScope_.$new();
            $controller = _$controller_;
            $q = _$q_;
            deferred = _$q_.defer();

            // Jasmine Spy on return the deferred object for the getWeather method
            spyOn(WeatherFactory, 'getWeather').and.returnValue(deferred.promise);

            // init controller, passing our spy service instance
            vm = $controller('WeatherController', {
                weatherFactory: WeatherFactory,
            });

        }));

        it('should return a promise', function() {
            deferred.resolve({
                name: "San Diego",
                coord: { lat: 1, lon: 2 },
                main: {
                	temp: 68,
                	pressure: 20,
                	humidity: 50,
                	temp_min: 54,
                	temp_max: 72
                },
                wind: {
                	speed: 10
                }
            });

            $scope.$apply();

            expect(vm.title).toBe("WeatherController");
            expect(vm.WeatherResponse).not.toBe(undefined);
            expect(vm.WeatherResponseName).toBe("San Diego")
        });

        it('should reject promise', function() {
            // this will call the catch method in the controller
            deferred.reject();

            // We have to call apply for this to work
            $scope.$apply();

            expect(vm.WeatherResponse).toBe(undefined);
        });
    });
});
