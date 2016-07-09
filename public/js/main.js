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


let rdy = 0;

app.directive('usernameDirective', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(value) {
          if (value){
            if (value.length < 4 || value.length > 20) {
              mCtrl.$setValidity('charE', false);
              rdy += 1;
            } else {
              rdy -= 1;
              mCtrl.$setValidity('charE', true);
            }
            return value;
          }
      }

      mCtrl.$parsers.push(myValidation);
    }
  };
});

app.directive('emailDirective', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(value) {
        if (value.indexOf("e") > -1) {
          mCtrl.$setValidity('charE', true);
        } else {
          mCtrl.$setValidity('charE', false);
        }
        return value;
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
});

app.directive('passwordDirective', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, mCtrl) {
      function myValidation(value) {
        if (value) {
          if (value.length <6) {
            rdy += 1;
            mCtrl.$setValidity('charE', false);
          } else {
            rdy -= 1;
            mCtrl.$setValidity('charE', true);
          }
          return value;
        }
      }
      mCtrl.$parsers.push(myValidation);
    }
  };
});


/**
 * Fcts
 */

function sendSignIn() {
  let name = $("#signinName").val();
  console.log("name = " + name);
  let pw = $("#signinPw").val();
  $.post("http://ec2-50-112-40-35.us-west-2.compute.amazonaws.com:12345/connect", {username:name, password:pw}, function (data, status) {
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

app.controller('signinCtrl', function($scope) {
  console.log("in the signinCtrl");

  $scope.myVal = function () {
    console.log("Attempting to connect...");
    let name = $scope.user;
    let pw = $scope.password;

    $.post("http://ec2-50-112-40-35.us-west-2.compute.amazonaws.com:12345/connect", {username:name, password:pw}, function (data, status) {
      console.log("Request status: " + status);
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
});

app.controller('signupCtrl', function($scope) {
  $scope.user = 'John Doe';
  $scope.email = 'john.doe@gmail.com';
  $scope.password = '******'

  $scope.myVal = function() {
    console.log("sending info...");
    let name = $scope.user;
    let email = $scope.email;
    let pw = $scope.password;
    //console.log("info is: " + name + " " + email + " " + pw);

    $.post("http://ec2-50-112-40-35.us-west-2.compute.amazonaws.com:12345/register", {username:name, password:pw}, function (data, status) {
      if (status == "success"){
        console.log("success, data is: " + data);
      }
      else
        console.log("request failed");
    });
  }
});


//function sendSignUp() {
//  console.log("in the send sign up");
//  let name = $("#signupName").val();
//  let email = $("#email").val();
//  let pw = $("#signupPw").val();
//
//  $.post("http://ec2-50-112-40-35.us-west-2.compute.amazonaws.com:12345/register", {username:name, password:pw}, function (data, status) {
//    if (status == "success"){
//      console.log("success, data is: " + data);
//    }
//    else
//      console.log("request failed");
//  });
//}
