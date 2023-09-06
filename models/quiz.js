const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Question = new Schema({

  question : String,
  options : [String],
  answer : String,
  category : { type: Schema.Types.ObjectId, ref: 'category' }

});

const  quiz = mongoose.model('quiz', Question);


module.exports = quiz;
