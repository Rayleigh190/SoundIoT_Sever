const mongoose = require("mongoose");
const { Schema } = mongoose;
const soundSchema = new Schema({
  soundID: {
    // 소리 id
    type: Number,
    required: true,
  },
  latitude: {
    // 위도
    type: Number,
    required: true,
  },
  longitude: {
    // 경도
    type: Number,
    required: true,
  },
  address: {
    // 주소
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Sound", soundSchema);
