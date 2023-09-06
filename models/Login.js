const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogPost = new Schema({
   fname : String,
   lname : String,
   username : {
      type: String,
      unique: true
   },
   password : String
});

const LOGIN = mongoose.model('Login', BlogPost);

module.exports = LOGIN;