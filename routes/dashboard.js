var express = require('express');
var request = require('request');
var router = express.Router();
var bookDb = require("../model/books")
var userDb = require('../model/users')

/* GET Dashboard Page. */
router.get('/', function (req, res, next) {
  if (!req.Authen) {
    return res.redirect('/');
  }

  bookDb.findAllBook({
    username: req.user.username,
  }, function (err, data) {

    userDb.getAllBookReq({
      username: req.user.username
    }, function (err, bookReq) {
      
    
      userDb.getAllBookReqMess({
        username: req.user.username
      }, function (err, bookReqMess) {
        
        res.render('dashboard', {
          title: 'dashboard',
          auth: req.Authen,
          data: data,
          bookReq: bookReq.userBookRequest,
          bookReqMess:bookReqMess.BookRequestMess
        });

      });

    });

  });


});



// adding a new book
router.post('/', function (req, res, next) {
  if (!req.Authen) {
    return res.redirect('/');
  }

  var query = req.body.book.replace(/ /g, '_');
  request("http://isbndb.com/api/v2/json/INDTFIJN/book/" + query, function (error, response, body) {
    body = JSON.parse(body);

    if (!error && response.statusCode == 200 &&
      body.error == undefined) {

      var book = body.data[0].title.toLowerCase();
      var bookisbn = body.data[0].isbn10;
      bookDb.findBook({
        bookname: book,
        username: req.user.username
      }, function (err, data) {

        if (err || data !== null) {
          return respond('err');
        };

        bookDb.addBook({
          bookname: book,
          bookisbn: bookisbn,
          username: req.user.username,
          email: req.user.email,
          status: false
        }, function (err, data) {
          if (err) {
            return respond('err');
          }

          res.redirect('/dashboard');
        });

      });


    }
    else {
      respond('err');
    }


    function respond(title) {
      res.render('dashboard', {
        title: title,
        data: []
      });
    }

  });

});

module.exports = router;
