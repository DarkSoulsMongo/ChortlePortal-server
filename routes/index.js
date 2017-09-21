var express = require('express');
var router = express.Router();
var monk = require('monk');
var uuid = require('uuid/v4');
var csv = require('fast-csv');
var csvparse = require('csv-parser');
var AWS = require('aws-sdk');
const upload  = require('multer')();

require('dotenv').config();

AWS.config.update({ accessKeyId: process.env.S3_KEY, secretAccessKey: process.env.S3_SECRET });
const s3 = new AWS.S3();


/* GET home page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('chortles');
    collection.find({},function(e,docs){
        res.json(docs);
    });
});

/* POST to Add Chortle */
router.post('/addchortle', upload.single('image'), function(req, res, next) {
  //console.log('hitting route');
  //console.log(req.body);
  //console.log(req.file);
    let db = req.db;
    //console.log('rabbit');
    let id = uuid();
    console.log(id);
    console.log('here?');
    let params = {
      Bucket: process.env.S3_BUCKET,
      Key: id,
      Body: new Buffer(req.file.buffer)
    }
    console.log(params)
    s3.putObject(params, err => {
      if (err) {
        console.log("err", err);
        next(err)
      } else {

        let collection = db.get('chortles');
        collection.insert({
            username : req.body.userName,
            comment : req.body.userComment,
            image : process.env.S3_ROOT + id,
            longitude : req.body.userLongitude,
            latitude : req.body.userLatitude
        })
        .then(function(){
          res.json(`{"success": true}`)
        })
        .catch(function(err){
          console.log('err', err);
        })

      }
    })
// in mongo, check that its in s3
    // Submit to the DB
    // collection.insert({
    //     username : req.body.userName,
    //     comment : req.body.userComment,
    //     image : req.body.userImage,
    //     longitude : req.body.userLongitude,
    //     latitude : req.body.userLatitude
    // })




      // var s3Stream = s3.getObject(params).createReadStream()

});

module.exports = router;
