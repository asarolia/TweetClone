var express = require('express');
var router = express.Router();
// import mongoose and our post model
var mongoose = require('mongoose');
var Post =  mongoose.model('Post');

// /* GET home page. */
// router.get('/api', function(req, res, next) {
//   res.render('api', { title: 'Express' });
// });

// Protecting API in application by adding below custom middleware for authentication check

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/posts', isAuthenticated);


//api for all posts
router.route('/posts')
	
	//create a new post
	.post(function(req, res){

		//TODO create a new post in the database
		//res.send({message:"TODO create a new post in the database"});

		// Create document in MongoDB collection 
	
		var post = new Post();
		post.tweetText = req.body.text;
		post.created_By = req.body.created_By;
		//post.created_By = req.session.passport.user.id;

		// here we are assuming that db/collection already
		post.save(function(err,post){

			if (err){
				// if error then return 500
				res.send(500,err);

			}
			console.log("Inserted one post successfully");
			return res.json(post);
		});
		


	})

	.get(function(req, res){

		//TODO get all the posts in the database
	//	res.send({message:"TODO get all the posts in the database"});

		// Get all the posts from the MongoDB collection
		

		Post.find(function(err,posts){
			if (err){
				res.send(500,err);
			}
			console.log("Retrieved all posts successfully");
			res.json(posts);
		});

	})
	
//api for a specfic post
router.route('/posts/:id')
	
	//create
	.put(function(req,res){
		return res.send({message:'TODO modify an existing post by using param ' + req.params.id});
	})

	.get(function(req,res){
		return res.send({message:'TODO get an existing post by using param ' + req.params.id});
	})

	.delete(function(req,res){
		return res.send({message:'TODO delete an existing post by using param ' + req.params.id})
	});


module.exports = router;