const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("trombone", UserSchema);

module.exports = User;
