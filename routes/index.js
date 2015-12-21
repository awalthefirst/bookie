var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Bookie'
  });
});


/*Login */
router.get('/login', function (req, res, next) {
  //find user 
  res.rediret('/');

  //set cookie/session 

});



/*Logout*/
router.get('/logout', function (req, res, next) {
  //remove cookie/session
  req.BookieSession.reset();
  res.rediret('/');
});

module.exports = router;
