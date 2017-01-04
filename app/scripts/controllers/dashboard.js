'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state) {
    $scope.$state = $state;

    var user = firebase.auth().currentUser;
    $scope.test = null;
    fetchName();
    console.log($scope.test);
    $scope.test1 = "";

    function fetchName()
    {
      var referenceLink = "/users/" + user.uid;
      var data = firebase.database().ref(referenceLink);

      data.once('value').then(function (snapshot)
      {
        var u = snapshot.val().username;
        $scope.user = u;
        $scope.$apply();
      });
    }
  });
