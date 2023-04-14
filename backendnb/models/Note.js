const mongoose = require("mongoose");
const { Schema } = mongoose;

//boiler plate schema
const notesSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId, //foreign key - linking notes with userID
    ref: 'User'
  },
  
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true,
    default: "personal"
  },
  date: {
    type: Date,
    default: Date.now
  },

});
module.exports = mongoose.model("notes", notesSchema); //exporting Schema
