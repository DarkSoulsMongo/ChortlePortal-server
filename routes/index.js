var express = require('express');
var router = express.Router();
var monk = require('monk');;


/* GET home page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('chortles');
    collection.find({},function(e,docs){
        res.json(docs);
    });
});

router.get('/newchortle', function(req, res) {
    res.render('newchortle', { title: 'Add New Chortle' });
});

/* POST to Add Chortle Service */
router.post('/addchortle', function(req, res) {
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var userName = req.body.userName;
    var userComment = req.body.userComment;
    var userImage = req.body.userImage;
    var userLongitude = req.body.userlongitude;
    var userLatitude = req.body.userlatitude;
    // Set our collection
    var collection = db.get('chortledb');
    // Submit to the DB
    collection.insert({
        "username" : userName,
        "comment" : userComment,
        "image" : userImage,
        "longitude" : userLongitude,
        "latitude" : userLatitude
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.send("success");
            // res.redirect("chortles");
        }
    });
});

module.exports = router;
