// import mongoose ODM for MongoDB
var mongoose = require('mongoose');

// define DB connnection constants

const server = 'mongodb://127.0.0.1:27017';  // currently connecting to local installation
const database = 'tweetdb';     



module.exports = {

    // function to open connection 
    
 open: function(){
    mongoose.connect(`${server}/${database}`)
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
    },
 // function to close connection 

  close: function(){
    mongoose.connection.close(function () {
        console.log('Mongoose connection disconnected')
      })
  }

 }






