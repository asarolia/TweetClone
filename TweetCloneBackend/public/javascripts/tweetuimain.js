var myModule = angular.module('TweetCloneUI',['ngRoute']);

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

myModule.controller('authhandle', function($scope){

    $scope.user = {username:'',password:''};
    $scope.errmsg = '';

    // register function
    $scope.register = function(){

        $scope.errmsg = "Registration successfull for " + $scope.user.username;

    }

    // login function
    $scope.login = function(){

        
        $scope.errmsg = "Login successfull for " + $scope.user.username;

    }

});