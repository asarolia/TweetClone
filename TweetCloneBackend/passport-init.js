// initialization file for passport middle ware 

var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
//temporary in memory data store for users, going forward we will change this to Mongo DB
var records = {};
module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    // for serialization we have to use unique id for every user for time being we are using username with 
    // assumption that username will be unique
	passport.serializeUser(function(user, cb) {
        console.log('serializing user: '+ user.username);
        // serialization basically stores user unique id in the session, which is later 
        // used to retrieve the complete user object via deserialization; 
        // saved to session ; req.session.passport.user = {id: 'username'}

		return cb(null, user.username); // return unique ID associated with user object to store in session
    });
    
    //Deserialize user using unique ID , here just using the username as that is acting as ID 

	passport.deserializeUser(function(username, cb) {

        //return cb('we have not implemented this', false);
        console.log('After De-serializing user: '+ records[username].username);
        console.log('After De-serializing password: '+ records[username].password);
        return cb(null,records[username]);

	});

	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, cb) { 

            //return cb('we have not implemented this', false);
            // validate user password
            if(!isValidPassword(records[username],password))
            {
                return cb(null,false,{message: 'Incorrect password'});
            }

            // validate user id 
            if (!(records[username].username == username))
            {
                return cb(null,false,{message: 'Invalid user ID'});
            }

            return(null,records[username]);


		}
	));

	passport.use('signup', new LocalStrategy({
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req, username, password, cb) {

        //	return cb('we have not implemented this', false);
            
             // implement custom logic to validate if user is existing or not 
              if (records[username].username == username)
              {
                  console.log('user already existing with name' + username);
                  return cb(null,false,{message: 'user already existing'});
              }

              // If not existing then store the username and hash value of password 
              records[username] = {
                  username : username,
                  password : createHash(password)
              }

              console.log('Registration completed for :'+ records[username].username);
              
              //return username   
              return cb(null, records[username]);

		})
	);
    
    // compare password
	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
    };
    
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};