var express = require("express");
var router = express.Router();
const Sound = require("../models/Sound");
const Path = require("../models/Path");
const Token = require("../models/Token");

router.get("/sound", function (req, res, next) {
  console.log("request sound data");
  Sound.find({})
    .sort({ created_at: -1 })
    .limit(30)
    .then((data) => {
      res.send(JSON.stringify(data));
    });
});

router.get("/path", function (req, res, next) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  console.log("request path data");
  Path.find({
    created_at: { $gte: kr_curr },
  })
    .sort({ created_at: -1 }) //.limit(10)
    .then((data) => {
      res.send(JSON.stringify(data));
    });
});
// 안드로이드에서 요청 받기

//
// import { register } from "../push";
router.post("/token", async function (req, res, next) {
  console.log(req.body.token);
  const token = new Token({
    user_token: req.body.token,
  });
  const user = await Token.findOne({ user_token: req.body.token });
  console.log(typeof user);
  if (user == null) {
    try {
      token.save();
      console.log("insert OK");
    } catch (err) {
      console.log({ message: err });
    }
    res.send("Token registration success");
    console.log("Token registration success");
  } else {
    res.send("Token already exists");
    console.log("Token already exists");
  }
});

router.get("/token", async function (req, res, next) {
  var tokens = [];
  Token.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      for (let i in data) {
        var obj = JSON.stringify(data[i]);
        console.log(JSON.parse(obj).user_token);
        tokens.push(JSON.parse(obj).user_token);
      }
      console.log(tokens);
      res.send(tokens);
    }
  });
});
//

module.exports = router;
