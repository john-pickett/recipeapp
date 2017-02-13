var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Recipes' });
});

/* GET Add Recipe page */
router.get('/addrecipe', function(req, res, next) {
  res.render('addrecipe', { title: 'Add New Recipes' });
});

/* GET View Recipe page */
router.get('/viewrecipe', function(req, res, next) {
  // var id = req.params.id;
  res.render('viewrecipe', { title: 'View Recipe Details'});
});

/* POST Send ID on home page */
// router.post('/sendid', function(req, res) {
//   res.send({redirect: '/viewrecipe', msg: "go", id: "this is from index.js - routes"});
// });


module.exports = router;
