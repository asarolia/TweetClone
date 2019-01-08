var myModule = angular.module('TweetCloneUI',['ngRoute']).run(function($rootScope, $http){
    // all controllers only has access to there specific scope but they also has access to root scope
    // we are adding root scope as dependency here to set or maintain certain varibales at global level to 
    // be accessed from anywhere

    $rootScope.authenticated = false;
    $rootScope.current_user = {};

// Implement logout 

$rootScope.signout = function(){
    $http.get('auth/signout');
    $rootScope.authenticated = false;
    $rootScope.current_user = '';
  };


});

// declare application routes to pick partial views 
myModule.config(function($routeProvider){
    $routeProvider
      //the timeline display
      .when('/', {
        templateUrl: 'mainpartial.html',
        controller: 'tweethandle'
      })
      //the login display
      .when('/login', {
        templateUrl: 'loginpartial.html',
        controller: 'authhandle'
      })
      //the signup display
      .when('/register', {
        templateUrl: 'registerpartial.html',
        controller: 'authhandle'
      });
  });

myModule.controller('tweethandle',function($scope){

    $scope.posts = [];

    $scope.newPost = {createdBy:'',tweetText:'',createdAt:''};

    $scope.postData = function(){

        $scope.newPost.createdAt = new Date();
        
       // $scope.posts.push($scope.newPost.createdBy + ' says ' + $scope.newPost.tweetText + ' at ' + $scope.newPost.createdAt);
       
       $scope.posts.push($scope.newPost);

        $scope.newPost = {createdBy:'',tweetText:'',createdAt:''};

    }



});

myModule.controller('authhandle', function($scope,$rootScope,$http,$location){

    $scope.user = {username:'',password:''};
    $scope.errmsg = '';

    // register function
    $scope.register = function(){

        // placeholder message , to be implemented later
        //$scope.errmsg = "Registration successfull for " + $scope.user.username;

        $http.post('/auth/signup',$scope.user).then(function(resp){
                if(resp.data.state == 'success')
                {
                    $rootScope.authenticated = true;
                    $rootScope.current_user = resp.data.user.username;
                    $location.path('/');
                }else{
                    $scope.errmsg = resp.data.message;        
                }
                
        },function(resp){
            $scope.errmsg = resp.data.message;

        });

    }

    // login function
    $scope.login = function(){

       // Display placeholder message 
      //  $scope.errmsg = "Login successfull for " + $scope.user.username;

      $http.post('/auth/login',$scope.user).then(function(resp){
        if(resp.data.state == 'success')
        {
            $rootScope.authenticated = true;
            $rootScope.current_user = resp.data.user.username;
            $location.path('/');
        }else{
            $scope.errmsg = resp.data.message;        
        }
        
        },function(resp){
            $scope.errmsg = resp.data.message;

        });


    }

});