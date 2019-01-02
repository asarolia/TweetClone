// import mongoose ODM for MongoDB
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create Model schema for users

var userModelSchema = new Schema({

    username: String,
    password: String,
    created_At: { type: Date, default: Date.now() }
    
});

// Bind user model with schema and export as function 

module.exports = mongoose.model('User',userModelSchema);
