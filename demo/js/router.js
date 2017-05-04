
var app = angular.module('app',['ngRoute']);

app.config(['$routeProvider',function ($routeProvider) {
	$routeProvider
		.when('/a',{
			controller:'Acontroller',
			templateUrl:'../views/a.html'
		})
		.when('/b',{
			controller:'Bcontroller',
			templateUrl:'../views/b.html'
		})
		.when('/c',{
			controller:'Ccontroller',
			templateUrl:'../views/c.html'
		});

}])

app.controller('Acontroller',['$scope',function ($scope) {
	$scope.title='A控制器...';
	console.log($scope.title)
}]);


app.controller('Bcontroller',['$scope',function ($scope) {
	$scope.title='B控制器...';
}]);

app.controller('Ccontroller',['$scope',function ($scope) {
	$scope.title='C控制器...';
}]);
