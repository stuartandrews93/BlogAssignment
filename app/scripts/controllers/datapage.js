'use strict';

angular.module('yapp').
controller('DatapageCtrl', function ($scope) {
    $scope.allPosts = null;
    $scope.id = null;
    $scope.post = null;
    $scope.key = null;
    fetchPosts();
    fetchPosts();

    console.log($scope.allPosts);


    function fetchPosts() {
      var user = firebase.auth().currentUser;

      var referenceLink = "/blogs/" + user.uid;
      var data = firebase.database().ref(referenceLink);

      data.once('value').then(function (snapshot) {
        $scope.allPosts = [];
        snapshot.forEach(function (d) {
          $scope.allPosts.push(d.val());
        });
        $scope.$apply();
      });
    }

      $scope.saveMessageID = function (key,post,id)
      {
        console.log(key);
        console.log(post + " " + id);
        $scope.key = key;
        $scope.id = id;
        $scope.post = post;
      };

      $scope.submitRevised = function()
      {
        if ($scope.post)
        {
          var user = firebase.auth().currentUser;
          firebase.database().ref('/blogs/' + user.uid + '/' + $scope.id + '/').update({
            post: $scope.post
          });
          $scope.allPosts[$scope.key].post = $scope.post;
        }
      };

      $scope.delete = function()
      {
        var user = firebase.auth().currentUser;
        firebase.database().ref('/blogs/' + user.uid + '/' + $scope.id + '/').remove();
        $scope.allPosts.splice($scope.key,1);
      };

    $scope.getPostDate = function(epoch)
    {
      var dateString = "";
      var date = new Date(epoch*1000);

      var day = date.getDay() + 1;
      if (day < 10)
      {
        dateString += "0" + day.toString() + "/";
      }
      else
      {
        dateString += day.toString() + "/";
      }

      var month = date.getMonth() + 1;
      if (month < 10)
      {
        dateString += "0" + month.toString() + "/";
      }
      else
      {
        dateString += month.toString() + "/";
      }

      var year = date.getFullYear();
      dateString += year.toString() + " - ";


      var hours = date.getHours();
      if (hours < 10)
      {
        dateString += "0" + hours.toString() + ":";
      }
      else
      {
        dateString += hours.toString() + ":";
      }

      var minutes = date.getMinutes();
      if (minutes < 10)
      {
        dateString += "0" + minutes.toString() + ":";
      }
      else
      {
        dateString += minutes.toString() + ":";
      }

      var seconds = date.getSeconds();
      if (seconds < 10)
      {
        dateString += "0" + seconds.toString() + ":";
      }
      else
      {
        dateString += seconds.toString();
      }

      return dateString;
    }
  });
