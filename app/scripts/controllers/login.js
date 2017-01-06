'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location)
  {
    $scope.loginFailed = false;

    $scope.submit = function(email, passwd) {
      if(email==null || typeof(email)=='undefined' || email=='')
        alert('Please enter email');
      else if(passwd==null || typeof(passwd)=='undefined' || passwd=='')
        alert('Please enter password');
      else
      {
        firebase.auth().signInWithEmailAndPassword(email, passwd)
            .then(function(result)
            {
              $location.path('/dashboard');
              $scope.$apply();
            })
            .catch(function(error)
            {
              $scope.errorVal = true;
              $scope.errorMessage = error.message;

              console.log(error.message);
              $scope.$apply();
            });
      }
      return false;
    }

    $scope.createuser = function(username, email, passwd, passwd1){
      if(passwd == passwd1)
      {
        firebase.auth().createUserWithEmailAndPassword(email, passwd).then(function()
        {
          var user = firebase.auth().currentUser;
          firebase.database().ref('users/' + user.uid).set({
            username: username,
            email: email
          });

          $location.path('/dashboard');
          $scope.$apply();
        }).catch(function(error)
        {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
          $location.path('/login');
          $scope.$apply();
          // ...
        });
      }
      else
        alert("passwords donot match");
    }

  });
