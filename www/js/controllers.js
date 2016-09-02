angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, $cordovaFileTransfer) {
  ////////////////////////////////////////////////////////////////////fileupload
  $scope.upload  = function(){
    console.info("achieved");
    var options = {
            fileKey: "adam",
            fileName: "adam.png",
            chunkedMode: false,
            mimeType: "image/jpg"
        };
        $cordovaFileTransfer.upload("http://192.168.0.111/upload", "/img/adam.jpg", options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            alert("SUCCESS: " + JSON.stringify(result.response)+" and data is:"+angular.toJson(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
            alert("file not uploaded "+angular.toJson(err));
        }, function (progress) {
            // constant progress updates
            alert("Loading....");
        });
    console.info("file upload done");
    alert("done!@");
  };


})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
