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
    // Submit to the DB
    collection.insert({
        "username" : "" + req.body.userName,
        "comment" : "" + req.body.userComment,
        "image" : "" + req.body.userImage,
        "longitude" : "" + req.body.userLongitude,
        "latitude" : "" + req.body.userLatitude
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
