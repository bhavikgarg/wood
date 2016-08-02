// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

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

.controller('MCtrl', function($scope, $ionicSideMenuDelegate,Camera) {


  $scope.toggleLeftMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
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

//    $scope.openCitrus= function (options){
//     console.log('opening citrus');
// //      var dataObj = {
// //         orderAmount :"1.00",
// //         currency:  "INR",
// //         email:  "someone@validemail.com",
// //         phoneNumber: "9234567890",
// //         merchantTxnId:  "d2ead2113ee",
// //         returnUrl:  "http://www.abc.com/return-url",
// //         vanityUrl: "http://sandbox.citruspay.com/npev1iucts",
// //         secSignature:  "d32r24e2daewee13sd341rsefs",
// //         firstName: "Abc",
// //         lastName: "pqr",
// //         addressStreet1:"abcstreet1",
// //         addressStreet2:"abcstreet2",
// //         addressCity:"Mumbai",
// //         addressState:"MH",
// //         addressCountry:"India",
// //         addressZip:"400605",
// //         notifyUrl:"http://www.abc.com/notify-me",
// //         mode:"dropIn"
// // };

// CitrusPay.Merchant.Config = {
//         // Merchant details
//         Merchant: {
//             accessKey: 'BP2TCUPJAMJ9LD490R6U', //Replace with your access key
//             vanityUrl: 'npev1iucts'  //Replace with your vanity URL
//         }
//     };

//     fetchPaymentOptions();
//     makePayment("card");
    
//     function handleCitrusPaymentOptions(citrusPaymentOptions) {
//         if (citrusPaymentOptions.netBanking != null)
//             for (i = 0; i < citrusPaymentOptions.netBanking.length; i++) {
//                 var obj = document.getElementById("citrusAvailableOptions");
//                 var option = document.createElement("option");
//                 option.text = citrusPaymentOptions.netBanking[i].bankName;
//                 option.value = citrusPaymentOptions.netBanking[i].issuerCode;
//                 obj.add(option);
//             }
//     }
//     function citrusServerErrorMsg(errorResponse) {
//         alert(errorResponse);
//         console.log(errorResponse);
//     }
//     function citrusClientErrMsg(errorResponse) {
//         alert(errorResponse);
//         console.log(errorResponse);
//     }
//     //$('#citrusNetbankingButton').on("click", function () { makePayment("netbanking") });
//         //Card Payment
//     // $("#citrusCardPayButton").on("click", function () { makePayment("card") });


// citrusICP.launchIcp(dataObj)



//    }
  

  



})
