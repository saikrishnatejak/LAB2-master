// create the module and name it scotchApp
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : 'home.html',
            controller  : 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'about.html',
            controller  : 'aboutController'
        })
        .when('/weather', {
            templateUrl : 'weather.html',
            controller  : 'weatherctrler'
        })
        .when('/calories', {
            templateUrl : 'calories.html',
            controller  : 'calorieCtrl'
        })
        // route for the contact page
        .when('/contact', {
            templateUrl : 'contact.html',
            controller  : 'contactController'
        });
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Hey...! You can now see weather details and calorie details.' + "\n" + 'Please click on respective tabs';
});

scotchApp.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

scotchApp.controller('contactController', function($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});

scotchApp.controller('calorieCtrl', function($scope, $http) {
    $scope.calorieDetailsFn = function() {
        var foodName = document.getElementById("foodName").value;
        var query = "https://api.edamam.com/api/nutrition-data?app_id=6ac7a2f1&app_key=0f56610ff7a48582b4a6b01293f60bc0 &ingr=" + foodName;

        $http.get(query)
            .then(function(response) {
                console.log("response", response.data);
                var calorieData = response.data;
                $scope.calorieDetails = [];
                $scope.calorieDetails.push({name:"calories", value:calorieData.calories});
                $scope.calorieDetails.push({name:"totalWeight", value:calorieData.totalWeight});
                return $scope.calorieDetails;
            });

    }
});

scotchApp.controller('weatherctrler', function($scope, $http) {

            console.log(3);
            $scope.getWeather = function() {
                $http.get('https://api.wunderground.com/api/36b799dc821d5836/conditions/q/'+$scope.StateName+'/'+$scope.CityName+'.json').success(function(data) {
                    console.log("inside getweatgher");
                    console.log(data);

                    temp = data.current_observation.temp_f;
                    weather = data.current_observation.weather;
                    wind=data.current_observation.wind_string;
                    pressure=data.current_observation.pressure_mb;
                    humidity=data.current_observation.relative_humidity;
                    console.log(temp);
                    $scope.currentweather = {
                        html: "Currently " + temp + " &deg; F and " + weather + " "+" wind is "+ wind +" pressure is "+pressure+" humidity is "+humidity+""
                    }
                })


            }




});

