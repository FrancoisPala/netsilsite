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
  //console.log("Page Controller reporting for duty.");


});

/**
 * Fcts
 */

function sendSignIn() {
  let name = $("#signinName").val();
  console.log("name = " + name);
  let pw = $("#signinPw").val();
  $.post("http://ec2-50-112-40-35.us-west-2.compute.amazonaws.com:12345/connect", {user:name, password:pw}, function (data, status) {
    //console.log(status);
    if (status == "success"){
      let obj = JSON.parse(JSON.stringify(data));
      console.log(obj);

      let id = obj['id'];
      let username = obj['login'];

      let ai = $("#account-info");
      ai.append("<p>My account<br><br>Name: " + username + "<br>id: " + id + "<br>email: netsil@netsil.com</p>");

    }
    else
      console.log("request failed");
  });

}

function sendSignUp() {
  let name = $("#signupName").val();
  let email = $("#email").val();
  let pw = $("#signupPw").val();
  $.post("http://ec2-50-112-40-35.us-west-2.compute.amazonaws.com:12345/register", {username:name, password:pw}, function (data, status) {
    if (status == "success"){
      console.log("success, data is: " + data);
    }
    else
      console.log("request failed");
  });
}
