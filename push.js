// push 알림
const adminAndroid = require("firebase-admin");
let androidServiceAccount = require("###");

adminAndroid.initializeApp({
  credential: adminAndroid.credential.cert(androidServiceAccount),
});

var androidRegistrationToken =
  "d_RbtI6TT_yZZdTTqQnohc:APA91bEAl-JJNa4fq3rTD3ZsxRp14R5Rr2tFr2aXokO656F1DeUIKfwfTFMYTcxZvjpWCkiojQjJTuVxe7IqihhqyIo0ScDzNpZSO5Z12n_LpY-o47rVBg_kwwHRLTkzvnGzmD6j40jE";

let soundStr = ["살려주세요", "도와주세요", "울음소리"];

module.exports = {
  send: function (soundID) {
    var android_fcm_message = {
      notification: {
        title:
          "김민영님의 '" + soundStr[soundID - 1] + "' 소리가 인식 됐습니다.",
        body: "김민영님의 위치를 확인해 보세요!",
      },
      token: androidRegistrationToken,
    };

    console.log("message push");
    adminAndroid
      .messaging()
      .send(android_fcm_message)
      .then(function (response) {
        console.log("push success: ", response);
      })
      .catch(function (err) {
        console.log("push error: ", err);
      });
  },
};
