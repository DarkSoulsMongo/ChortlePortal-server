var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('welcome', { title: 'Express' });
});


router.get('/welcome', function(req, res) {
    res.render('welcome', { title: 'ChortlePortal!' });
});

router.get('/chortles', function(req, res) {
    var db = req.db;
    var collection = db.get('chortles');
    collection.find({},{},function(e,docs){
        res.render('chortles', {
            "chortles" : docs
        });
    });
});

router.get('/newchortle', function(req, res) {
    res.render('newchortle', { title: 'Add New Chortle' });
});

router.post('/addchortle', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userImage = req.body.userimage;
    var userMessage = req.body.usermessage;
    var userLocation = req.body.userlocation;

    // Set our collection
    var collection = db.get('chortles');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "userimage" : userImage,
        "usermessage" : userMessage,
        "userlocation" : userLocation
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("chortles");
        }
    });
});

module.exports = router;
