const mongoose = require("mongoose");

const sEventSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    eventId: {
      type: String,
      required: true,
      trim: true,
    }
  },
  { collection: "saved_events" }
);

const sEvent = mongoose.model("saved_events", EventSchema);

module.exports = sEvent;
