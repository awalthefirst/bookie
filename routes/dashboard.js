var express = require('express');
var router = express.Router();

/* GET Dashboard Page. */
router.get('/', function(req, res, next) {
  if(!req.Authen){
    return res.redirect('/');
  }
  res.render('dashboard',{
      title:'dashboard'
  });
});

module.exports = router;
