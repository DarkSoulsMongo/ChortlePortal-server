var express = require('express');
var router = express.Router();
var monk = require('monk');
var uuidv4 = require('uuid/v4');
var csv = require('fast-csv');
var csvparse = require('csv-parser');
var AWS = require('aws-sdk');
const s3 = new AWS.S3();
const upload  = require('multer')();

require('dotenv').config();

AWS.config.update({ accessKeyId: process.env.S3_KEY, secretAccessKey: process.env.S3_SECRET });


/* GET home page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('chortles');
    collection.find({},function(e,docs){
        res.json(docs);
    });
});

/* POST to Add Chortle */
router.post('/addchortle', upload.single('image'), function(req, res) {
    let db = req.db;
    let id = uuid();
    let collection = db.get('chortles');
    let params = {
      Bucket: process.env.S3_BUCKET,
      Key: id,
      Body: req.body.userImage
    }

    s3.putObject(params, err => {
      if (err) {
        next(err)
      } else {
        res.json(`{"success": true}`)
      }
    })
    .then(response => {
      console.log(response);
    })
    // Submit to the DB
    // collection.insert({
    //     username : req.body.userName,
    //     comment : req.body.userComment,
    //     image : req.body.userImage,
    //     longitude : req.body.userLongitude,
    //     latitude : req.body.userLatitude
    // })




      var s3Stream = s3.getObject(params).createReadStream()

});

module.exports = router;
