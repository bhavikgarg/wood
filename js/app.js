// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','ngCordovaOauth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
// Camera Factory
.factory('Camera', function($q) {

   return {
      getPicture: function(options) {
         var q = $q.defer();

         navigator.camera.getPicture(function(result) {
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }

})

.config( function ($stateProvider){




 $stateProvider
 .state('index', {
    url: '/',
    templateUrl: 'views/home.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'views/login.html'
  })
  .state('about',{
    url:'/about',
    templateUrl:'views/about.html'
  })
  .state('register',{
    url:'/register',
    templateUrl:'views/register.html'
  })
  .state('misc',{
    url:'/misc',
    templateUrl:'views/misc.html'
  });


})

.controller('MCtrl', function($scope,$cordovaOauth,$cordovaSocialSharing,$ionicActionSheet,$timeout,$ionicSideMenuDelegate,Camera,$ionicSlideBoxDelegate) {


  $scope.toggleLeftMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }

  //beware:set all redirect_uri as http://localhost/callback
  $scope.facebookLogin=function(){
    console.log('Facebook');
    var client_id="1748083488747758"
    var appScope=['public_profile'];

    $cordovaOauth.facebook(client_id,appScope).then(function(result){
      alert(result);
    },function(error){
      console.log('error');

    })


  };
  $scope.googleLogin=function(){
    console.log('Google');
   var client_id="644445423137-vmvevg6p6kr37apvsodj1o84svfcg047.apps.googleusercontent.com";
   var appScope=['https://www.googleapis.com/auth/userinfo.profile'];

    $cordovaOauth.google(client_id,appScope).then(function(result){
     console.log(JSON.stringify(result));
    },function(error){
     console.log(JSON.stringify(result));
   });
 };

  $scope.linkedLogin=function(){
    console.log('LinkedIn');
    var client_id="81xuu48kkxbsbw";
    var key="jxsbGQCekF91fYu7";
    var appScope=['r_basicprofile'];
    var state="myapp";

    $cordovaOauth.linkedin(client_id,key,appScope,state).then(function(result){
      alert(JSON.stringify(result));
    },function(error){
      alert(JSON.stringify(error));
    })

  };

  $scope.githubLogin=function(){

    console.log('GithHub');
    var client_id="";//git client_id
    var key="";//git secret key
    var appScope=[];//the scope for your app

    $cordovaOauth.github(client_id,key,appScope).then(
      function(result){
        console.log(result);
      },function(err){
        console.log(err);
      }
    )


  }

 $scope.show=function(){
var hideSheet=$ionicActionSheet.show({
  buttons:[
    {text:'<b>Login Via Facebook</b>'},
    {text:'<b>Share Sms</b>'},
    {text:'<b>Share Google</b>'}
  ],
  destructiveText:'Delete',
  titleText:'Protocols',
  cancel:function (){

  },
  buttonClicked:function(index){

      switch(index){
       case 0:
          break;
        case 1:
        $cordovaOauth.google("CLIENT_ID_HERE", ["email"]).then(function(result) {
    console.log("Response Object -> " + JSON.stringify(result));
}, function(error) {
    console.log("Error -> " + error);
});
        break;
        case 2:
        break;

      }
  }
});

$timeout(function(){
  hideSheet();
},2000);


 };



  $scope.takePicture=function (options){

      var options = {
         quality : 75,
         targetWidth: 200,
         targetHeight: 200,
         sourceType: 1,
         correctOrientation: true
      };
        Camera.getPicture(options).then(function(imageData) {
         $scope.picture = imageData;;
      }, function(err) {
         console.log(err);
      });

   };

    $scope.getPicture = function (options) {

      var options = {
         quality : 75,
         targetWidth: 200,
         targetHeight: 200,
         sourceType: 0
      };

      Camera.getPicture(options).then(function(imageData) {
         $scope.picture = imageData;;
      }, function(err) {
         console.log(err);
      });
   };



})
