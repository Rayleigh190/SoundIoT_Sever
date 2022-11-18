var express = require("express");
var router = express.Router();
const Sound = require("../models/Sound");
const Path = require("../models/Path");

router.get("/sound", function (req, res, next) {
  console.log("request sound data");
  Sound.find({})
    .sort({ created_at: -1 })
    .limit(10)
    .then((data) => {
      res.send(JSON.stringify(data));
    });
});

router.get("/path", function (req, res, next) {
  var today = new Date();
  today.setUTCHours(0, 0, 0, 0); // https://stackoverflow.com/questions/26591079/date-to-json-number-after-date
  console.log("request path data");
  Path.find({
    created_at: { $gte: today },
  })
    .sort({ created_at: -1 })
    .limit(10)
    .then((data) => {
      res.send(JSON.stringify(data));
    });
});
// 안드로이드에서 요청 받기

module.exports = router;
