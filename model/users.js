var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserInfoSchema = new Schema({
  phone: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  reqion: {
    type: String,
    required: true
  }
});

var UserRequestSchema = new Schema({
  bookname: String,
  owner: String,
  status: String
});


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

  UserInfo: [UserInfoSchema],
  userBookRequest: [UserRequestSchema]
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
      UserInfo: [{
        phone: query.UserInfo.phone,
        reqion: query.UserInfo.reqion,
        city: query.UserInfo.city
      }]
    });


    user.save(cb);
  },

  updateUserInfo: function (query, cb) {
    obj.getUser().findOneAndUpdate({
      email: query.email,
      username: query.username
    }, {
      UserInfo: {
        phone: query.phone,
        reqion: query.reqion,
        city: query.city
      }
    }, cb);
  },

  addBookReq: function (query, cb) {

    obj.getUser().findOne({
      username: query.username
    }, function (err, data) {
      if (err) return cb(err);

      data.userBookRequest.push({
        bookname: query.bookname,
        owner: query.owner,
        status: query.status
      });

      data.save(cb);

    });

  },

  getAllBookReq: function (query, cb) {
    obj.getUser().findOne({
      username: query.username
    }, 'userBookRequest', cb)
  }

};


//mongo
mongoose.connect(process.env.MongoUrl);
module.exports = obj;