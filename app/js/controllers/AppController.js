windApp.controller("AppController",
	function($log, $scope, getWeather) {

		var goButton = angular.element("#goBtn");

		goButton.on('click', function() {

			// Get location from user input field
			var location = angular.element("#location").val().replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
			$scope.location = location;


			// Retrieve weather, and isolate wind speed
			var promise = getWeather.currentWeather(location);
			promise.then(
				function(response) {
					var weatherData = response.data.query.results;
					if(weatherData === null) {
						$scope.showError=true;
						$scope.showDecision=false;
					} else {
						$scope.currentWindSpeed = weatherData.channel.wind.speed;
						$scope.foundLocation = weatherData.channel.location;
						$scope.mph = " mph";
						$scope.kph = " kph";
						$scope.showDecision = true;
						$scope.showError=false;
					}
				},
				function(error) {
					$log.error('failed to get speed', error);
				}
				);
		}); // end of click

	// Adjust blade speed with returned wind speed (based upon mph speed)
	$scope.bladeSpeed= function(currentWindSpeed){
		if(currentWindSpeed >= 35){
			return "blade05";
		}
		else if(currentWindSpeed >= 25 && currentWindSpeed < 35){
			return "blade1";
		}
		else if(currentWindSpeed >= 15 && currentWindSpeed < 25){
			return "blade3";
		}
		else if(currentWindSpeed >= 5 && currentWindSpeed < 15){
			return "blade7";
		}
		else if(currentWindSpeed < 1){
			return "blade-stop";
		}
	};

	// Adjust cloud speed with returned wind speed (based upon mph speed)
	$scope.cloudSpeed= function(currentWindSpeed){
		if(currentWindSpeed >= 35){
			return "cloud-speed05";
		}
		else if(currentWindSpeed >= 25 && currentWindSpeed < 35){
			return "cloud-speed1";
		}
		else if(currentWindSpeed >= 15 && currentWindSpeed < 25){
			return "cloud-speed3";
		}
		else if(currentWindSpeed >= 5 && currentWindSpeed < 15){
			return "cloud-speed7";
		}
		else if(currentWindSpeed < 1){
			return "cloud-stop";
		}
	};

}); // end of AppController
