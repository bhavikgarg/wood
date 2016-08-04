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
.config( function ($stateProvider,$urlRouterProvider){
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

  $urlRouterProvider.otherwise('/');



})
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
.controller('MCtrl', function($scope,$cordovaInstagram,$http,$cordovaOauth,$cordovaSocialSharing,$ionicActionSheet,$timeout,$ionicSideMenuDelegate,Camera,$ionicSlideBoxDelegate) {
     console.log($scope.imageName);

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
    var appScope=['email','public_profile'];

    $cordovaOauth.facebook(client_id,appScope).then(function(result){
      //alert(JSON.stringify(result));
      var token=result.access_token;

      $http({
        method:'GET',
        url:'https://graph.facebook.com/me?access_token='+token+''
      }).then(function(success){
        alert(JSON.stringify(success));
        $scope.fb_data=JSON.stringify(success);
      },function(err){
           alert(JSON.stringify(err));
      });



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
     var token=result.access_token;
     alert(token);
     alert(JSON.stringify(result));
     $http({
       method:'GET',
       url:'https://www.googleapis.com/plus/v1/people/me?access_token='+token

     }).then(function(res){
       alert(JSON.stringify(res));

     },function(error){
      alert(JSON.strinify(error));

     });
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
    //Github Requires a paid accout
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
    {text:'<b>Share Via Facebook</b>'},
    {text:'<b>Share Sms</b>'},
    {text:'<b>Share Whatsapp</b>'},
     {text:'<b>Share Via Mail</b>'},
     {text:'<b>Share via Instagram</b>'}
  ],
  destructiveText:'Delete',
  titleText:'<b>Protocols</b>',
  cancel:function (){

  },
  buttonClicked:function(index){

      switch(index){
       case 0:
       var msg="Hello I am Sagar";
       var img="Ok"
       var link="http://gda.smogate.com"
       $cordovaSocialSharing
       .shareViaFacebook(msg,'http://s6.favim.com/610/150425/adorable-animal-cat-cute-Favim.com-2680526.jpg', link)
    .then(function(result) {
      // Success!
      alert(JSON.stringify(result))
    }, function(err) {
      // An error occurred. Show a message to the user
      alert(JSON.stringify(err));
    });
          break;
        case 1:
        var message="Hey How are you";
        var number="8744096752";
        $cordovaSocialSharing
    .shareViaSMS(message, number)
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occurred. Show a message to the user
    });
        break;
        case 2:
        var message="Some Text";
        // var image="some link";
        var link="http://gda.smogate.com";
        $cordovaSocialSharing
    .shareViaWhatsApp(message,'http://s6.favim.com/610/150425/adorable-animal-cat-cute-Favim.com-2680526.jpg', link)
    .then(function(result) {
      // Success!
      alert(JSON.stringify(result));

    }, function(err) {
      alert(JSON.stringify(result));
      // An error occurred. Show a message to the user
    });


          break;
          case 3:
          var message="Hello World";
          var subject="I am Sagar";
          var toArr="sagar13912@gmail.com";
         var ccArr=null;
         var bccArr=null;
          var file=null;
          $cordovaSocialSharing
   .shareViaEmail(message, subject, toArr, ccArr, bccArr, file)
   .then(function(result) {
     // Success!
     alert(JSON.stringify(result));
   }, function(err) {
     // An error occurred. Show a message to the user
     alert(JSON.stringify(err));
   });
          break;
          case 4:
          // $cordovaInstagram.share('http://s6.favim.com/610/150425/adorable-animal-cat-cute-Favim.com-2680526.jpg','My Cat').then(function(){
          //    alert('success');
          // },function(err){
          //   alert(JSON.stringify(err));
          // });
            //  $cordovaSocialSharing
            //  .shareViaInstagram('Messagre','http://s6.favim.com/610/150425/adorable-animal-cat-cute-Favim.com-2680526.jpg').then(function(){
            //    alert('success');
            //  },function(err){
            //    alert(err);
            //  });
            // $cordovaSocialSharing.
            // shareViaInstagram('Hello Friends',{},function(result){
            //   alert(JSON.stringify(result));
            // }, function(err){
            //   alert(JSON.stringify(err));

            // })
  



           $cordovaInstagram.share($scope.picture.data, $scope.picture.caption).then(function() {
    // Worked
  }, function(err) {
    if(err){
      alert(JSON.stringify(err));
    } else {
      alert('success');
    }
    // Didn't work
  });



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
