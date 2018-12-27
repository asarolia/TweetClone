var myModule = angular.module('TweetCloneUI',[]);

myModule.controller('tweethandle',function($scope){

    $scope.posts = [];

    $scope.newPost = {createdBy:'',tweetText:'',createdAt:''};

    $scope.postData = function(){

        $scope.newPost.createdAt = new Date();
        
        $scope.posts.push($scope.newPost.createdBy + ' says ' + $scope.newPost.tweetText + ' at ' + $scope.newPost.createdAt);
        alert($scope.createdAt);
        $scope.newPost = {createdBy:'',tweetText:'',createdAt:''};

    }



});