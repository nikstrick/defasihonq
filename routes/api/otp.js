const messagebird = require('messagebird')('ywXLdgiFow9TSF2m8eZIg3Yb8');
const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

router.get('/',function(req, res) {
    res.send('SUCCESS');
});

router.post('/step2', function(req, res) {
    var number = req.body.number;
    messagebird.verify.create(number, {
        originator : 'Code',
        template : 'Your verification code is %token.'
    }, function (err, response) {
        if (err) {
            console.log(err);
            res.json({
                error : err.errors[0].description
            });
        } else {
            console.log(response);
            res.json({
                id : response.id
            });
        }
    })
 });

router.post('/step3', function(req, res) {
    var id = req.body.id;
    var token = req.body.token;
    messagebird.verify.verify(id, token, function(err, response) {
      if (err) {
        console.log(err);
        res.json( {
          error: err.errors[0].description,
          id: id,
        });
      } else {
        console.log(response);
        res.json({
            msg : "success"
        });
      }
    });
  });
module.exports = router;