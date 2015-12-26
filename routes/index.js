var express = require('express');
var router = express.Router();
var userDb = require("../model/users");
var bookDb = require("../model/books");
var bcrypt = require('bcryptjs');


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.Authen) {
    bookDb.findAllBook({}, function (err, data) {
      res.render('index', {
        title: 'Bookie',
        auth: req.Authen,
        authUsername:req.user.username,
        data: data
      });
      
      
    })
  }
  else {
    res.render('index', {
      title: 'Bookie',
      auth: req.Authen
    });

  }
});


/*Post Login details*/
router.post('/login', function (req, res, next) {

  //find user 
  userDb.findUser({
    email: req.body.email.toLowerCase()
  }, function (err, data) {

    //compare password with hash password
    var userPass = (function () {
      if (data === null) {
        return false;
      }
      else {
        return bcrypt.compareSync(req.body.password, data.password);
      }
    })();

    //render home page with error
    if (err || data === null || !userPass) {
      req.BookieSession.reset();
      res.render('index', {
        title: 'Login Error',
        auth: req.Authen,
        error: ''
      });
    }
    else {

      //redirect to dashboard with user cookie/session
      var user = {
        username: data.username,
        email: data.email
      };
      req.BookieSession.user = user;
      res.redirect('/dashboard');
    }

  });

});

/*post Sign Up*/
router.post('/signup', function (req, res, next) {

  //hash user pass
  var hashPass = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  //save user data 
  userDb.addUser({
    username: req.body.username.toLowerCase(),
    password: hashPass,
    email: req.body.email.toLowerCase(),
    UserInfo: {
      phone: req.body.phone,
      reqion: req.body.reqion.toLowerCase(),
      city: req.body.city.toLowerCase()
    }
  }, function (err, data) {

    //render home page with error
    if (err) {
      req.BookieSession.reset();
      res.render('index', {
        title: 'SignUp Error',
        auth: req.Authen,
        error: ''
      });
    }
    else {
      //redirect to dashboard with user cookie/session
      var user = {
        username: data.username,
        email: data.email
      };
      req.BookieSession.user = user;
      res.redirect('/dashboard');
    }

  });
});


/*GET Logout Page*/
router.get('/logout', function (req, res, next) {

  //remove cookie/session
  req.BookieSession.reset();
  res.redirect('/');
});

module.exports = router;
