var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BooksSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

var obj = {
  getBookDb: function () {
    return mongoose.model('Books', BooksSchema);
  },

  addBook: function (query, cb) {
    var book = new obj.getBookDb({

    });

    book.save(cb);
  },

  removeBook: function (query, cb) {
    obj.getBookDb().findOneAndRemove({

    }, cb)
  }

};


//mongo
module.exports = obj;