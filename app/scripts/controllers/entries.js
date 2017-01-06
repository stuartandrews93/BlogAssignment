'use strict';

angular.module('yapp').
controller('EntriesCtrl', function ($scope, $location)
{
    var user = firebase.auth().currentUser;

    if (!user)
    {
      $location.path('/login');
      $scope.$apply();
    }

    $scope.allPosts = null;
    $scope.allPostNull = false;
    $scope.id = null;
    $scope.title = null;
    $scope.post = null;
    $scope.key = null;
    fetchPosts();

    console.log($scope.allPosts);


    function fetchPosts()
    {
      var user = firebase.auth().currentUser;

      var referenceLink = "/blogs/" + user.uid;
      var data = firebase.database().ref(referenceLink);

      data.once('value').then(function (snapshot)
      {
        $scope.allPosts = [];
        var count = 0;
        snapshot.forEach(function (d)
        {
          $scope.allPosts.push(d.val());
          count++;
        });
        $scope.$apply();
        if(count == 0)
        {
          $scope.allPostNull = true;
        }
      });
    }

      $scope.saveMessageID = function (key,title,post,id)
      {
        $scope.key = key;
        $scope.title = title;
        $scope.id = id;
        $scope.post = post;
      };

      $scope.submitRevised = function()
      {
        if ($scope.post)
        {
          var user = firebase.auth().currentUser;
          firebase.database().ref('/blogs/' + user.uid + '/' + $scope.id + '/').update({
            post: $scope.post,
            title: $scope.title
          });
          $scope.allPosts[$scope.key].post = $scope.post;
          $scope.allPosts[$scope.key].title = $scope.title;
        }
      };

      $scope.delete = function()
      {
        var user = firebase.auth().currentUser;
        firebase.database().ref('/blogs/' + user.uid + '/' + $scope.id + '/').remove();
        $scope.allPosts.splice($scope.key,1);
        if($scope.allPosts != null && $scope.allPosts.length == 0)
        {
          $scope.allPostNull = true;
        }
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
