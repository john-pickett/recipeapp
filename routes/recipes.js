var express = require('express');
var router = express.Router();
var twilio = require('twilio');
// Twilio Credentials
var accountSid = 'AC4a65c018fca1b4693ea69aa208f1b98d';
var authToken = 'e55be36f2570d258092d7b53f0b76f35';
//require the Twilio module and create a REST client
var client = twilio(accountSid, authToken);
// Nodemailer
// var nodemailer = require('nodemailer');
//SendGrid
// var helper = require('sendgrid').mail;

// GET Recipe list
router.get('/recipelist', function(req, res) {
    var db = req.db;
    var collection = db.get('recipes');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

// GET recipe details to view
router.get('/getid', function(req, res){
  var db = req.db;
  var collection = db.get('functions');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

// GET Recipe list for View Recipe Page
router.get('/getview', function(req, res) {
    // var id = req.body.id;
    var db = req.db;
    var collection = db.get('recipes');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

// View Recipe Details
router.put('/sendid', function(req, res){
  var db = req.db;
  var id = { $set: { view_id: req.body.id }};
  // console.log("recipes.js: id is: " + id);
  var collection = db.get('functions');
  collection.update({'name': 'view_recipe'}, id, function(err, result){
      if (err) {
        alert(err);
      } else {
        res.send({redirect: '/viewrecipe', msg: "go"});
      }
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

// SendGrid code
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// router.post('/sendemail', function(req, res){
//   from_email = new helper.Email(req.body.from);
//   to_email = new helper.Email(req.body.to);
//   subject = req.body.subject;
//   content = new helper.Content("html", req.body.html);
//   mail = new helper.Mail(from_email, subject, to_email, content);
//   var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
//   var request = sg.emptyRequest({
//     method: 'POST',
//     path: '/v3/mail/send',
//     body: mail.toJSON()
//   });
//   sg.API(request, function(error, response) {
//     console.log(response.statusCode);
//     console.log(response.body);
//     console.log(response.headers);
//   })
// });



// Nodemailer code
// router.post('/sendemail', function(req, res){
//   var email = {
//     to: 'johnpick.10396@m.evernote.com',
//     from: 'john@johnpickett.net',
//     body: req.body.body
//   };
//
//   var transporter = nodemailer.createTransport({
//     host: 'gator3064.hostgator.com',
//     port: 465,
//     // secure: true,
//     auth: {
//       user: 'john@johnpickett.net',
//       password: 'HYf4Z3jupwGm'
//     }
//   });
//
//   // transporter.sendMail(email, function(err){
//   //   res.send((err === null) ? {msg: ''} : {msg: 'error: ' + err});
//   // });
//
//   transporter.verify(function(error, success) {
//    if (error) {
//         console.log(error);
//    } else {
//         console.log('Server is ready to take our messages');
//    }
// });
// });

module.exports = router;
