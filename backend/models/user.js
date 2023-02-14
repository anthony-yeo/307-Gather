const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
