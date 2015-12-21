var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  
  UserInfo:[{
    phone:Number,
    reqion:String,
    city:String
  }]
});

var obj = {
  User:mongoose.model('User', userSchema),
}



//mongo
mongoose.connect(process.env.MongoUrl);
module.exports = o;