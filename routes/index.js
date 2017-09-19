var express = require('express');
var router = express.Router();
var monk = require('monk');;




//mongo connection troubleshooting
var mongodb = require('mongodb');
var uri = 'mongodb://heroku_20vql2mf:5ji9506agic7oje4589ddl5mgf@ds139904.mlab.com:39904/heroku_20vql2mf/collections';


//


/* GET home page. */
router.get('/', function(req, res) {
  console.log("route is hit");
    var db = req.db;
    var collection = db.get('chortles');
    collection.find({},function(e,docs){
        res.json(docs);
    });
    console.log('route end');
});

router.get('/newchortle', function(req, res) {
    res.render('newchortle', { title: 'Add New Chortle' });
});

/* POST to Add Chortle Service */
router.post('/addchortle', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userImage = req.body.userimage;
    var userMessage = req.body.usermessage;
    var userLocation = req.body.userlocation

    // Set our collection
    var collection = db.get('chortledb');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "image" : image,
        "message" : message,
        "location" : location
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
