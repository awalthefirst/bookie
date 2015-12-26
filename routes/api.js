var express = require('express');
var router = express.Router();
var booksDb = require("../model/books");
var usersDb = require("../model/users")


router.put('/traderesponse', function (req, res, next) {

  if (req.Authen && req.body.owner !== req.user.username) {

    usersDb.updateMessStatus({
      bookname: req.body.bookname,
      action: req.body.action,
      status: true
    }, function (err, data) {
      res.send();

      if (!err) {

        usersDb.updateBookReq({
          username: req.body.owner, //person requesting the book
          bookname: req.body.bookname,
          owner: req.user.username, // person who added the book
          status: req.body.action
        }, function () {

        });

      }

    });

  }

});

router.put('/bookrequest', function (req, res, next) {

  if (req.Authen && req.body.owner !== req.user.username) {

    //add to user req
    usersDb.addBookReq({
      username: req.user.username,
      bookname: req.body.book,
      owner: req.body.owner,
      status: 'pending'
    }, function (err, data) {
      if (err) {
        return res.status(404).end();
      }

      res.send();


      booksDb.updateBookStatus({
        bookname: req.body.book,
        username: req.body.owner,
        status: true
      }, function (err) {
        if (!err) {
          // send book owner alert 
          usersDb.addBookReqMess({
            username: req.body.owner,
            bookname: req.body.book,
            who: req.user.username,
            status: false,
            action: null
          });
        }
      });

    });


  }

});


router.delete('/removebook', function (req, res, next) {

  if (req.Authen) {
    booksDb.removeBook({
      bookname: req.body.book,
      username: req.user.username
    }, function (err, data) {
      if (err) {
        next();
      }
      else {
        res.send();
      }
    });

  }

});

module.exports = router;
