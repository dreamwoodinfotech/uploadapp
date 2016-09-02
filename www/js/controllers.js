angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, $cordovaFileTransfer,$ionicLoading) {
  ////////////////////////////////////////////////////////////////////fileupload
  $scope.upload  = function(){
    console.info("achieved");
    var options = {
            fileKey: "adam",
            fileName: "ionic.png",
            chunkedMode: true,
            mimeType: "image/png"
        };
        $cordovaFileTransfer.upload("http://ionicapp.890m.com/upload", "/android_asset/www/img/ionic.png", options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            $ionicLoading.hide();
            alert("SUCCESS: " + JSON.stringify(result.response)+" and data is:"+angular.toJson(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
            alert("file not uploaded "+angular.toJson(err));
        }, function (progress) {
            // constant progress updates
            //alert("Loading....");
            $ionicLoading.show({
              template: 'Loading...'
            }).then(function(){
               console.log("The loading indicator is now displayed");
            });
        });
    console.info("file upload done");
    //alert("done!@");
    $ionicLoading.hide();
  };


  $scope.download = function(){
    var url = "http://ionicapp.890m.com/files/pic.jpg";
    var targetPath = cordova.file.documentsDirectory+"/sdcard/Download/myfirstimage.jpg";//
    var trustHosts = true;
    var options = {};

    $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
      .then(function(result) {
        // Success!
        alert("SUCCESS: " + JSON.stringify(result.response));
      }, function(err) {
        // Error
        alert("file not downloaded "+angular.toJson(err));
      }, function (progress) {
        $timeout(function () {
          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        });
      });
      alert("done downloaded");
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
