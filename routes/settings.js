var express = require('express');
var router = express.Router();
var bookDb = require("../model/users")

/* GET users listing. */

router.get('/', function (req, res, next) {
  res.render('settings', {
    title: 'settings'
  });
});

router.post('/', function (req, res, next) {

  bookDb.updateUserInfo({
    username: req.user.username,
    email: req.user.email,
    phone: req.body.phone,
    city: req.body.city,
    reqion: req.body.reqion
  }, function (err, data) {

    if (err) {
      res.render('settings', {
        title: 'error',
        settError:true
      });
    }else{
      res.redirect('/dashboard');
    }

  });

});

module.exports = router;
