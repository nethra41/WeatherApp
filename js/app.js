
var app = angular.module('home', []);

function weatherController($scope, $http) {
	$scope.searchTerm = 'boston';
	$scope.date = [];
	var day = new Date();
	var nextDate = day;
	$scope.date.push(day);
		for(i=1; i<7; i++) 
		{
			var nextDay = new Date(nextDate);
			var nextDate = nextDay.setDate(day.getDate()+i);
			$scope.date.push(nextDate);
		}
	$scope.getData = function(indx) {
	var a = indx;
	term = $scope.searchTerm;
	console.log(term);
	 var url = 'http://api.openweathermap.org/data/2.5/forecast/daily';
    $http.jsonp(url, { params : {
        q : term,
		cnt : '7',
        units : 'metric',
        callback: 'JSON_CALLBACK'
      }}).
      success(function(data, status, headers, config) {
        $scope.main = data.list[a].temp;
        $scope.wind = data.list[a].speed;
        $scope.humid = data.list[a].humidity;
        $scope.clouds = data.list[a].clouds;
        $scope.description = data.list[a].weather[0].description;
		$scope.image = 'http://openweathermap.org/img/w/' + data.list[a].weather[0].icon + '.png';
	   console.log(data.list[a].weather[0].icon);
      });
	}
}
	
	