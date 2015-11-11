angular.module('starter.controllers', ['ionic','ionic-datepicker'])

.factory('Auth', function ($http, $window, $rootScope, Login) {
        return {
            login: function (user) {
              console.log(user);
               return $http.post($rootScope.server.url + '/login', user)
                    .success(function (data) {
                      console.log(data);
                        $rootScope.user = data.user;
                        $window.localStorage.setItem('user', JSON.stringify(user));
                        //$window.localStorage.user = JSON.stringify(data.user);
                        //$window.localStorage.token = data.token;

                       /* console.log('Subscribing for Push as ' + data.user.email);
                        if (typeof(ETPush) != "undefined") {
                            ETPush.setSubscriberKey(
                                function() {
                                    console.log('setSubscriberKey: success');
                                },
                                function(error) {
                                    alert('Error setting Push Notification subscriber');
                                },
                                data.user.email
                            );
                        }*/

                   // });
                  });
            },
            fblogin: function (fbUser) {
                console.log(JSON.stringify(fbUser));
                return $http.post($rootScope.server.url + '/fblogin', {user:fbUser, token: $window.localStorage['fbtoken']})
                    .success(function (data) {
                        $rootScope.user = data.user;
                        $window.localStorage.user = JSON.stringify(data.user);
                        $window.localStorage.token = data.token;

                        console.log('Subscribing for Push as ' + data.user.email);
                        if (typeof(ETPush) != "undefined") {
                            ETPush.setSubscriberKey(
                                function() {
                                    console.log('setSubscriberKey: success');
                                },
                                function(error) {
                                    alert('Error setting Push Notification subscriber');
                                },
                                data.user.email
                            );
                        }

                    });
            },
            logout: function () {
                $rootScope.user = undefined;
                var promise = $http.post($rootScope.server.url + '/logout');
                $window.localStorage.removeItem('user');
                $window.localStorage.removeItem('token');
                return promise;
            },
            signup: function (user) {
                console.log(user);
                return $http.post($rootScope.server.url + '/signup', user);
            },
            leave: function (leaves) {
                return $http.post($rootScope.server.url + '/leaveReport', leaves);
            }
        }
    })

.controller('LoginCtrl', function($scope, $state,$window,  $stateParams, $ionicPopup, $rootScope, Auth) {
    $scope.user = {};
    $scope.login = function () {
        Auth.login($scope.user)
            .success(function (data) {
                $state.go("app.home");
            })
            .error(function (err) {
                $ionicPopup.alert({title: 'Oops', content: err});
            });
    },
    $scope.logout = function() {
      $rootScope.user = null;
      $window.localStorage.removeItem('user');
      $window.localStorage.removeItem('token');
      $ionicPopup.alert({title: 'LOGOUT', content: "Thanks for using our application !!"});
      $state.go('noMenu.user_login');
    },
    $scope.signup = function() {
      if ($scope.user.password !== $scope.user.password2) {
          $ionicPopup.alert({title: 'Oops', content: "passwords don't match"});
          return;
      }
      Auth.signup($scope.user)
            .success(function (data) {
                $state.go("noMenu.user_login");
            })
            .error(function (err) {
                $ionicPopup.alert({title: 'Oops', content: err}); 
            });
    };
})
.controller('HomeCtrl',function($scope,$stateParams){
  $scope.mydate ="";
  $scope.datepickerObject = {
      titleLabel: 'Select Start Date',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
      disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList,   //Optional
      monthList: monthList, //Optional
      templateType: 'popup', //popup
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2000, 8, 2),   //Optional
      to: new Date(2100, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };

    var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];

    var weekDaysList = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        console.log('Selected date is : ', val)
         $scope.mydate=val;
      }
    };

 
})


.controller("OTRequest",function($scope){

  $scope.mydate ="";
  $scope.datepickerObject = {
      titleLabel: 'Select Start Date',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),    //Optional
      mondayFirst: true,    //Optional
      disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList,   //Optional
      monthList: monthList, //Optional
      templateType: 'popup', //popup
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2000, 8, 2),   //Optional
      to: new Date(2100, 8, 25),    //Optional
      callback: function (val) {    //Mandatory
        datePickerCallback(val);
      }
    };

    var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];

    var weekDaysList = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
    var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        console.log('Selected date is : ', val)
         $scope.mydate=val;
      }
    };

 
})

.controller("LeavesRepCtrl",function($scope, $http){
  console.log("LeavesRepCtrl started...");
  $http.get("http://localhost:4000/leave")
    .success(function(response) {
      $scope.leave = response;
    });
})


.controller("OTReportCtrl",function($scope){

});



