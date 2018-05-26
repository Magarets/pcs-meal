var express = require('express');
var router = express.Router();

/* 처음 들어왔을때 */
router.get('/', function(req, res, next) {
  const menu = {
    type: 'buttons',
    buttons: ["노래 추천해줘","네 노래로 추천해줘."]
  };
  res.set({
    'content-type' : 'application/json'
  }).send(JSON,stringify(menu));
});

module.exports = router;
