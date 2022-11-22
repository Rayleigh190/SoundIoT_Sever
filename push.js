// push 알림
const adminAndroid = require("firebase-admin");
const Token = require("./models/Token");
let androidServiceAccount = require("###");

adminAndroid.initializeApp({
  credential: adminAndroid.credential.cert(androidServiceAccount),
});

let soundStr = ["살려주세요", "도와주세요", "울음소리"];

const androidRegistrationToken = [];

module.exports = {
  send: async function (soundID) {
    var android_fcm_message = {
      notification: {
        title:
          "\uD83D\uDEA8 김민영님의 '" +
          soundStr[soundID - 1] +
          "' 소리가 인식 됐습니다.",
        body: "김민영님의 위치를 확인해 보세요!",
      },
      tokens: androidRegistrationToken,
    };
    await Token.find(function (err, data) {
      // console.log("get token");
      if (err) {
        console.log(err);
      } else {
        // console.log(data);
        for (let i in data) {
          var obj = JSON.stringify(data[i]);
          androidRegistrationToken.push(JSON.parse(obj).user_token);
        }
        console.log("message push");
        try {
          adminAndroid
            .messaging()
            .sendMulticast(android_fcm_message)
            .then(function (response) {
              // console.log("push success: ", response);
              androidRegistrationToken.length = 0;
            })
            .catch(function (err) {
              console.log("push error: ", err);
            });
        } catch (err) {
          console.log(err);
        }
      }
    })
      .clone()
      .catch(function (err) {
        console.log(err);
      });
  },
};
