const mongoose = require("mongoose");
const { Schema } = mongoose;
const tokenSchema = new Schema({
  user_token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Token", tokenSchema);
