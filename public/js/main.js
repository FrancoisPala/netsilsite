var app = angular.module('myApp', ['ngRoute']);

app.controller('HomeController', function($scope) {
  $scope.message = 'Hello from HomeController';
});




app.factory('userInfo', [function () {
  return {
    model: {
      name: '',
      id: '',
      email: ''
    }
  };
}]);

app.controller('accountCtrl', function($scope, $rootScope, userInfo) {
  //$scope.user = userInfo;

  //console.log("bon: " + infos.name + " " + infos.email);

  $scope.user = {};
  $scope.user.id = $rootScope.id;
  $scope.user.email = $rootScope.email;

  console.log("accountCtrl: " + $scope.user.id + " " + $scope.email)

});




/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
  .when("/signin", {templateUrl: "partials/signin.html", controller: "PageCtrl"})
  .when("/myaccount", {templateUrl: "partials/myaccount.html", controller: "PageCtrl"})
  .when("/signup", {templateUrl: "partials/signup.html", controller: "PageCtrl"})
  .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  //console.log("Page Controller reporting for duty.");


});


let rdy = 0;



/**
 * Fcts
 */

let infos = {};

app.controller('signinCtrl', function($scope, $location, $timeout, $rootScope, userInfo) { //API SEND SUCCESS EVEN THO THE USER DOESNT EXIST? GOT TO TRY AGANI LATER

  $scope.myVal = function () {
    console.log("Attempting to connect...");
    let name = $scope.user;
    let pw = $scope.password;

    //console.log(name + " " + pw);

    $.post("http://ec2-50-112-40-35.us-west-2.compute.amazonaws.com:12345/connect", {user:name, password:pw}, function (data, status) {
      console.log("Request status: " + status);
      if (status == "success"){
        let obj = JSON.parse(JSON.stringify(data));
        console.log(obj);

        if (obj['token']) {
          console.log("REQ SUCCESS");
          let id = obj['user'];

          console.log("filling the rootscope: " + " " + id);

          $rootScope.user = {};
          $rootScope.connected = 1;
          $rootScope.id = id;
          $rootScope.email = "email";

          $("#signin").toggle();
          $("#signout").toggle();
          $("#signup").toggle();

          $timeout(function () {
            $scope.currentPath = $location.path('/myaccount');
          }, 0);
        }
        else {
          //message d'erreur
          console.log("ERREUR DE REQ");
          $("#myerror").css("display", "block");
        }
      }
      else
        console.log("request failed");
    });
  }
});

app.controller('signupCtrl', function($scope) {
  $scope.user = 'John Doe';
  $scope.email = 'john.doe@gmail.com';
  $scope.password = '******';

  $scope.myVal = function() {
    console.log("sending info...");
    let name = $scope.user;
    let email = $scope.email;
    let pw = $scope.password;
    console.log("info is: " + name + " " + email + " " + pw);

    $.post("http://ec2-50-112-40-35.us-west-2.compute.amazonaws.com:12345/register", {username:name, password:pw}, function (data, status) {
      if (status == "success"){
        let obj = JSON.parse(JSON.stringify(data));
        console.log("success, data is: " + obj);
      }
      else
        console.log("request failed");
    });
  }
});

app.controller('headerCtrl', function($scope, $rootScope) {
  $scope.signOut = function () {
    $("#signin").toggle();
    $("#signout").toggle();
    $("#signup").toggle();


    $rootScope.user = {};
    $rootScope.user.connected = 0;
    $rootScope.user.id = "";
  }
});

/**
 * DIRECTIVES
 */

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

function signOut($rootScope){

}
