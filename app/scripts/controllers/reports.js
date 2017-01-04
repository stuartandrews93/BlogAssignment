'use strict';

angular.module('yapp')
  .controller('ReportsCtrl', function($scope, $state)
    {
      $scope.$state = $state;

      var user = firebase.auth().currentUser;
      console.log(user.uid);
      $scope.list = [];
      $scope.blog = 'hello';

      $scope.submit = function()
      {
        if ($scope.blog)
        {
          var d = new Date();
          var seconds = d.getTime() / 1000;
          writeUserData(user.uid,Math.floor(seconds),$scope.blog);
        }
      };

      function writeUserData(userId, time, message)
      {
        firebase.database().ref('blogs/' + userId + '/' + time + '/').set({
          id: time,
          post: message
        });
      }
    });
