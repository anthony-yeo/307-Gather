const mongoose = require("mongoose");

const friendsSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      trim: true,
    },
    friend_id: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { collection: "friends_list" }
);

const friends = mongoose.model("friends", EventSchema);

module.exports = friends;
