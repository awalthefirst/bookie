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

  UserInfo: [{
    phone: Number,
    reqion: String,
    city: String
  }]
});

var obj = {
  getUser: function () {
    return mongoose.model('User', userSchema);
  },

  findUser: function (query, cb) {
    obj.getUser().findOne({
      email: query.email
    }, cb);
  },

  addUser: function (query, cb) {
    
    var user = new obj.getUser()({
      username: query.username,
      password: query.password,
      email: query.email,
      UserInfo: {
        phone: query.phone,
        reqion: query.reqion,
        city: query.city
      }
    });
    
    user.save(cb);
  },

  updateUserInfo: function () {}
};


//mongo
mongoose.connect(process.env.MongoUrl);
module.exports = obj;