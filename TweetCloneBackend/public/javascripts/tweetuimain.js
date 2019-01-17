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
    //   .when('/', {
    //     templateUrl: 'mainpartial.html',
    //     controller: 'tweethandle'
    //   })
    // display authentication page by default
    .when('/', {
        templateUrl: 'loginpartial.html',
        controller: 'authhandle'
      })
      //the timeline display
      .when('/main', {
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

// define a custom service for basic read from DB, this service can then be instantiated via DI whenever needed 
myModule.factory('postService', function($http){
        var baseUrl = "/api/posts";
        var factory = {};
        // below function will fetch all posts from API
        factory.getAllTweets = function(){
            return $http.get(baseUrl);
        };

        // below function will add post in DB via API
        factory.postTweet = function(tweetdata){
            return $http.post(baseUrl,tweetdata);
        };


        return factory;
    });

// add 
myModule.controller('tweethandle',function($scope, $rootScope, postService){


    $scope.posts = [];
    $scope.newPost = {createdBy:'',tweetText:'',createdAt:''};



  //used for basic read from json
	postService.getAllTweets().then(function(response){
        console.log("data received from get api");
		$scope.posts = response.data;
	});

   
    $scope.postData = function(){
        $scope.newPost.createdBy = $rootScope.current_user;

        $scope.newPost.createdAt = new Date();
        
       // $scope.posts.push($scope.newPost.createdBy + ' says ' + $scope.newPost.tweetText + ' at ' + $scope.newPost.createdAt);
       
       // Instead of pushing into local array, push the data to API
       //$scope.posts.push($scope.newPost);
       // success call back function 
    //    var handleSuccessCB = function(response,status){
    //        console.log("successfully posted");

    //    };
        postService.postTweet($scope.newPost).then(function(response,status){
            console.log("successfully posted");
 
        },function(response){
            console.log("post eror");
        });

          //used for basic read from json
        postService.getAllTweets().then(function(response){
            console.log("fresh data received from get api");
            $scope.posts = response.data;
        },function(response){
            console.log("fresh data fetch after post failed");
        });

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
                    // route to main instead of default root
                    // $location.path('/');
                    $location.path('/main');
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
            // route to main instead of default root
            // $location.path('/');
            $location.path('/main');
        }else{
            $scope.errmsg = resp.data.message;        
        }
        
        },function(resp){
            $scope.errmsg = resp.data.message;

        });


    }

});