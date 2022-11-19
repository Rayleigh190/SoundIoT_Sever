// push 알림
const adminAndroid = require("firebase-admin");
let androidServiceAccount = require("###");

adminAndroid.initializeApp({
  credential: adminAndroid.credential.cert(androidServiceAccount),
});

var fcmTokens = [
  "c8N11QTvSlGccEErz8caCl:APA91bHJqrX3chw93bcT8LlgImqkK4IYaWob8FvOMVSuhZuX4hu-XeccUOyXhJ7tn8zVmbbyBBhaulbL_ow4OhY1MS3lGgX6yM4W55JRxg6ubgj7eI7ZMhLB9PqCd3OTo4gQMrN6OVBk",
  "eGTDWLG_TR2KiG0ss4qX7l:APA91bHZ-S5KAM4zqZVpMPdIr7TKG8zAAfZhR4oFixk0JTRPbmiXu2G4Qf91tnqztgbIceRvpXpnj2mP49I8uulVfS339kp9SyHXNvzv3HRmWfVghXTQC_dU0s5YlR-m-1du7S9tsyk6",
];

let soundStr = ["살려주세요", "도와주세요", "울음소리"];
const androidRegistrationToken = [];

module.exports = {
  send: function (soundID) {
    var android_fcm_message = {
      notification: {
        title:
          "김민영님의 '" + soundStr[soundID - 1] + "' 소리가 인식 됐습니다.",
        body: "김민영님의 위치를 확인해 보세요!",
      },
      tokens: fcmTokens,
    };

    console.log("message push");
    adminAndroid
      .messaging()
      .sendMulticast(android_fcm_message)
      .then(function (response) {
        console.log("push success: ", response);
      })
      .catch(function (err) {
        console.log("push error: ", err);
      });
  },
};
