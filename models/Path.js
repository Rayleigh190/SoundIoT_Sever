const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Path", userSchema);
