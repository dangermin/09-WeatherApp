"use strict";

// describe the behavior we are testing 
describe("weather api factory", function() {
            var WeatherFactory, httpBackend;

            // the top level module
            beforeEach(module("app"));

            // inject the factory and httpbackend
            beforeEach(inject(function(_WeatherFactory_, $httpBackend) {
                    WeatherFactory = _WeatherFactory_;
                    httpBackend = $httpBackend;
                }));

                afterEach(function() {
                    httpBackend.verifyNoOutstandingExpectation();
                    httpBackend.verifyNoOutstandingRequest();
                });

            //     // verify we can access the method we need to test 
                it("should have a getWeather method", function() {
                    expect(angular.isFunction(WeatherFactory.getWeather)).toBe(true);
                });

                // // verify a successful api call
                it("should work", function() {

                    httpBackend
                        .whenGET("http://api.openweathermap.org/data/2.5/weather?appid=7bb251471198d4ac538e3f9acb720948&mode=json&q=San+Diego&units=imperial")
                        .respond(200, { name: "San Diego" });

                    WeatherFactory.getWeather("San Diego")

                //     // test the response
                    .then(function(response) {
                        expect(response.name).toBe("San Diego");
                    });

                    httpBackend.flush();
                });

                // // verify the error handler is working
                it("should throw an error on a server exception", function() {
                    var result, error;

                //     // setup http backend
                    httpBackend
                        .expectGET("http://api.openweathermap.org/data/2.5/weather?appid=7bb251471198d4ac538e3f9acb720948&mode=json&q=San+Diego&units=imperial")
                        .respond(500);

                    var promise = WeatherFactory.getWeather("San Diego");

                    promise.then(function(data) {
                        result = data;
                    }, function(data) {
                        error = data;
                    });

                    httpBackend.flush();

                //     // test the reponse
                    expect(result).toBeUndefined();
                    expect(error.status).toEqual(500);

                });

            });



