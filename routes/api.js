var express = require('express');
var router = express.Router();
var booksDb = require("../model/books");



router.put('/bookrequest', function (req, res, next) {

  if (req.Authen && req.body.owner 
     !== req.user.username) {
     console.log(req.body);
     
     res.send();
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
