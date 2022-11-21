// mosquitto server sound topic에서 위도, 경도 데이터를 읽어오기
const mqtt = require("mqtt");
const client = mqtt.connect("###");
const Path = require("./models/Path");
const Sound = require("./models/Sound");
const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const request = require("request");
var async = require("async");
const deviceRouter = require("./routes/devices");
const bodyParser = require("body-parser");
// require("dotenv/config");
const Push = require("./push");
const MONGODB_URL =
  "###";

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// 라우터 만들기
app.use("/devices", deviceRouter);

const topic_list = ["path", "sound"];
// nodejs ---> mosquitto server
client.on("connect", () => {
  console.log("mqtt connect");
  client.subscribe(topic_list, { qos: 1 });
});

client.on("message", async function (topic, message) {
  if (topic == "path") {
    var obj = JSON.parse(message);
    obj.created_at = setDate();
    console.log(obj);
    const path = new Path({
      latitude: obj.latitude,
      longitude: obj.longitude,
      created_at: obj.created_at,
    });
    try {
      const savePath = path.save();
      console.log("insert OK");
    } catch (err) {
      console.log({ message: err });
    }
  } else {
    var obj = JSON.parse(message);
    obj.created_at = setDate();
    console.log(obj);
    // 좌표로 주소 받아오기
    var addressData;
    try {
      addressData = await getAddress(obj.latitude, obj.longitude);
      console.log("Get address : " + addressData);
    } catch (err) {
      console.log(err);
    }
    const sound = new Sound({
      soundID: obj.soundID,
      latitude: obj.latitude,
      longitude: obj.longitude,
      address: addressData,
      created_at: obj.created_at,
    });
    const path = new Path({
      latitude: obj.latitude,
      longitude: obj.longitude,
      created_at: obj.created_at,
    });
    try {
      sound.save();
      path.save();
      console.log("insert OK");
    } catch (err) {
      console.log({ message: err });
    }
    // 푸시 알람 보내기
    Push.send(obj.soundID);
    //
  }
});

// web server 만들기 : express
app.set("port", "3000");
var server = http.createServer(app);
// 소켓을 만들기
var io = require("socket.io")(server);
io.on("connection", (socket) => {
  //웹에서 소켓을 이용한 Path 센서데이터 모니터링
  socket.on("socket_evt_mqtt", (data) => {
    Path.find({})
      .sort({ _id: -1 })
      .limit(1)
      .then((obj) => {
        socket.emit("socket_evt_mqtt", JSON.stringify(obj[0]));
      });
  });

  socket.on("socket_evt_mqtt2", (data) => {
    Sound.find({})
      .sort({ _id: -1 })
      .limit(1)
      .then((obj) => {
        socket.emit("socket_evt_mqtt2", JSON.stringify(obj[0]));
      });
  });
});

server.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  } else {
    console.log("server ready");
    //Connection To DB
    mongoose.connect(
      MONGODB_URL,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("connected to DB!")
    );
  }
});

// 현재 날짜,시간 객체 생성
function setDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  dateObj = new Date(Date.UTC(year, month, today, hours, minutes, seconds));
  return dateObj;
}

function getAddress(lat, lon) {
  return new Promise(function (resolve, reject) {
    const options = {
      uri:
        "https://dapi.kakao.com/v2/local/geo/coord2address.json?x=" +
        lon +
        "&y=" +
        lat,
      headers: {
        Authorization: "KakaoAK ###",
      },
    };
    var addressData;
    request.get(options, function (err, response, body) {
      let jsonData = JSON.parse(body);
      if (jsonData.documents[0] != undefined) {
        if (jsonData.documents[0].road_address != null) {
          // console.log(jsonData.documents[0].road_address.address_name);
          addressData = jsonData.documents[0].road_address.address_name;
        } else {
          // console.log(jsonData.documents[0].address.address_name);
          addressData = jsonData.documents[0].address.address_name;
        }
      } else {
        addressData = "주소가 정의 되지 않은 지역입니다.";
      }
      if (!err) {
        resolve(addressData);
      } else {
        reject(err);
      }
    });
  });
}
