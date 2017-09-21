var express = require('express');
var router = express.Router();
var monk = require('monk');


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
    var db = req.db;
    var collection = db.get('chortles');
    // Get our form values. These rely on the "name" attributes
    var userName = req.body.userName;
    var userComment = req.body.userComment;
    var userImage = req.body.userImage;
    var userLongitude = req.body.userlongitude;
    var userLatitude = req.body.userlatitude;
    // Submit to the DB
    collection.insert({
        "username" : "fucko",//userName,
        "comment" : "hey fucko",//userComment,
        "image" : "no way fucko",//userImage,
        "longitude" : 90,//userLongitude,
        "latitude" : 90//userLatitude
    },
      function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("error, broski");
        }
        else {
            // And forward to success page
            res.send("success, broski");
            res.redirect("chortles");
        }
    });
});

module.exports = router;
