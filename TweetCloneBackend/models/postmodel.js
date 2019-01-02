// import mongoose ODM for MongoDB
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create Model schema for posts

var postModelSchema = new Schema({

    created_By: {type: Schema.Types.String, ref:'User'},   // Schema.ObjectId should be changed based on the User type
    created_At: { type: Date, default: Date.now() },
    tweetText: String
    
});

// Bind Post model with schema and export as function 

module.exports = mongoose.model('Post',postModelSchema);
