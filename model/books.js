var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BooksSchema = new Schema({

  bookname: String,
  username: String,
  email: String,
  bookisbn:String,
  status: Boolean

});

var obj = {
  getBookDb: function () {
    return mongoose.model('Books', BooksSchema);
  },
  
  findBook:function(query, cb){
    obj.getBookDb().findOne({
      bookname: query.bookname,
      username: query.username, 
    }, cb)
  },
  
  findAllBook:function(query,cb){
    obj.getBookDb().find(query, cb)
  },
  
  addBook: function (query, cb) {
    var book = new obj.getBookDb()({
      bookname: query.bookname,
      bookisbn: query.bookisbn,
      username: query.username,
      email: query.email,
      status: query.status
    });

    book.save(cb);
  },

  removeBook: function (query, cb) {
    obj.getBookDb().findOneAndRemove({
      bookname: query.bookname,
      username: query.username, 
    }, cb)
  }

};


//mongo
module.exports = obj;