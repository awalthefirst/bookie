var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    reqForMe: [{
        bookname: String,
        username: String
    }],

    reqForOthers: [{
        bookname: String,
        username: String
    }]
});

function MessWorkers() {
    var Book = mongoose.model('Message', MessageSchema);

    this.getOneReq = function (query, cb) {
        Book.findOne({
            bookname: query.bookname,
            username: query.username
        }, cb)
    };

    this.getAllReq = function (query, cb) {
        Book.find(query, cb)
    };

    this.addReq = function (query, cb) {
        var book = new Book();
        book({
            bookname: query.bookname,
            username: query.username
        });
        book.save(cb);
    };

    this.removeReq = function (query, cb) {
        Book.findOneAndRemove({
            bookname: query.bookname,
            username: query.username
        }, cb)
    }
}


var obj = {
    reqForMe: new MessWorkers(),
    reqForOthers: new MessWorkers()
};



//mongo
module.exports = obj;