const mongoose = require("mongoose");

const sEventSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      trim: true,
    },
    event_id: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { collection: "saved_events" }
);

const sEvent = mongoose.model("saved_events", EventSchema);

module.exports = sEvent;
