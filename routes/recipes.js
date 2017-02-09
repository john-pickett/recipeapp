var express = require('express');
var router = express.Router();
var twilio = require('twilio');
// Twilio Credentials
var accountSid = 'AC4a65c018fca1b4693ea69aa208f1b98d';
var authToken = 'e55be36f2570d258092d7b53f0b76f35';
//require the Twilio module and create a REST client
var client = twilio(accountSid, authToken);
// Nodemailer
var nodemailer = require('nodemailer');

// GET users listing
router.get('/recipelist', function(req, res) {
    var db = req.db;
    var collection = db.get('recipes');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

// Add new user
router.post('/addrecipe', function(req, res) {
    var db = req.db;
    var recipe = {
      name: req.body.name,
      cuisine: req.body.cuisine,
      description: req.body.description,
      rating: req.body.rating,
      recipe: req.body.recipe,
      serving: req.body.serving,
      tags: req.body.tags,
      picture: req.body.picture,
      ingredients: req.body.ingredients,
      companionname: req.body.companionname,
      companion: req.body.companion
    };
    var collection = db.get('recipes');
    collection.insert(recipe, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

// PUT to update recipes
router.put('/updaterecipe/:id', function(req, res){
  var db = req.db;
  var collection = db.get('recipes');
  var recipeId = req.params.id;
  var doc = { $set: {
    name: req.body.name,
    cuisine: req.body.cuisine,
    ingredients: req.body.ingredients,
    description: req.body.description,
    rating: req.body.rating,
    recipe: req.body.recipe,
    serving: req.body.serving,
    tags: req.body.tags,
    picture: req.body.picture,
    companionname: req.body.companionname,
    companion: req.body.companion
  }};
  //var doc = { $set: req.body };
  collection.update({ '_id': recipeId }, doc, function(err){
    res.send((err === null) ? {msg: '' } : { msg:'error: ' + err });
  });
});


// DELETE to deleteuser
router.delete('/deleterecipe/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('recipes');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

// Twilio code
router.post('/sendtext', function(req, res){
  client.messages.create({
    to: '2566686887',
    from: '2562903706',
    body: req.body.body
  }, function(err){
    res.send((err === null) ? {msg: ''} : { msg: 'error: ' + err});
  });
});

// Nodemailer code
router.post('/sendemail', function(req, res){
  var email = {
    to: 'johnpick.10396@m.evernote.com',
    from: 'expsheep@gmail.com',
    body: req.body.body
  };

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'expsheep@gmail.com',
      password: 'jnrFp3WP2tXk'
    }
  });

  transporter.sendMail(email, function(err){
    res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
  });
});

module.exports = router;
