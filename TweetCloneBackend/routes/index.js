var express = require('express');
var router = express.Router();

/* GET home page. */



router.get('/', function(req, res, next) {
// below will render view from views directory using jade template file with same name
 // res.render('index', { title: 'TweetClone' });

 // We want to serve our own angular html pages from public folder henceusing res.sendfile() 
 //res.senfile('./public/index.html');
 res.sendfile('./public/indexcard.html');
});

module.exports = router;
