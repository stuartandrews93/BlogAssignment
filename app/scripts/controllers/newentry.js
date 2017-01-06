'use strict';

angular.module('yapp')
  .controller('NewEntryCtrl', function($scope, $state, $location)
    {
      $scope.$state = $state;

      var user = firebase.auth().currentUser;

      if (!user)
      {
        $location.path('/login');
        $scope.$apply();
      }

      console.log(user.uid);
      $scope.list = [];
      $scope.blog = "";
      $scope.title = "";

      $scope.submit = function()
      {
        if ($scope.blog)
        {
          var d = new Date();
          var seconds = d.getTime() / 1000;
          writeUserData(user.uid,Math.floor(seconds),$scope.title,$scope.blog);
        }
      };

      function writeUserData(userId, time, title, message)
      {
        firebase.database().ref('blogs/' + userId + '/' + time + '/').set({
          id: time,
          title: title,
          post: message
        });
      }
    });
