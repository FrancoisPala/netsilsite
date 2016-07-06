var app = angular.module('myApp', ['ngRoute']);

app.controller('HomeController', function($scope) {
  $scope.message = 'Hello from HomeController';
});

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
   //Home
  .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
 //Pages
  .when("/signin", {templateUrl: "partials/signin.html", controller: "PageCtrl"})
  .when("/myaccount", {templateUrl: "partials/myaccount.html", controller: "PageCtrl"})
  /* etc… routes to other pages… */
 //Blog
  .when("/signup", {templateUrl: "partials/signup.html", controller: "PageCtrl"})
 //else 404
  .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");


});
