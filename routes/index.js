var express = require('express');
var router = express.Router();
var userDb = require("../model/users")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Bookie',
    auth: req.Authen
  });
});


/*Post Login details*/
router.post('/login', function (req, res, next) {

  //find user 
  userDb.findUser({
    email: req.body.email,
    password: req.body.password
  }, function (err, data) {
    
    //render home page with error
    if (err || data === null) {
      req.BookieSession.reset();
      res.render('index', {
        title: 'Login Error',
        auth: req.Authen,
        error: ''
      });
    }
    else {

      //redirect to dashboard with user cookie/session
      var user = {};
      req.BookieSession[user];
      res.redirect('/dashboard');
    }

  });

});

/*post Sign Up*/
router.post('/signup',function(req, res, next){
  
  //save user data 
  userDb.addUser({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      UserInfo: {
        phone: req.body.useInfo.phone,
        reqion: req.body.useInfo.reqion,
        city: req.body.useInfo.city
      }
    },function(err,data){
      
      //render home page with error
    if(err){
      res.render('index', {
        title: 'SignUp Error',
        auth: req.Authen,
        error: ''
      });
    }else{
      
      //redirect to dashboard with user cookie/session
      var user = {};
      req.BookieSession[user];
      res.redirect('/dashboard');
      
    }
    
  });
});


/*GET Logout Page*/
router.get('/logout', function (req, res, next) {
  
  //remove cookie/session
  req.BookieSession.reset();
  res.rediret('/');
});

module.exports = router;
