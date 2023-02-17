const mongoose = require("mongoose");

var ObjectId = require('mongodb').ObjectId;

const EventsSchema = new mongoose.Schema(
  {
    //HOST_ID       EX: '63ebe5b9d4d533c9fc679baa'
    host_id:{
      type: ObjectId,
      required: true
    },
    //NAME OF EVENT EX: 'VOLLEYBALL GAME'
    name: {
      type: String,
      required: true,
    },
    //LOCATION      EX: 'LIBRARY 3RD FLOOR'
    location:{
      type: String,
      require: true
    },
    //DESCRIPTION   EX: 'CSC 430 STUDY SESSION'
    description:{
      type: String,
      require: true
    },
    //DATE          EX: '2023-02-28 08:30:00'
    date:{
      type: Date,
      required: true
    },
    //CATEGORY      EX: 'ACADEMICS' - NOTE{CONSIDER REFERENCING A SET CATEGORIES TABLE}
    category:{
      type: String,
      require: true
    },
    //GPS          EX: [-122.5, 37.7]
    gps:{
      type: [Number],
      required: true,
    }
  },
  { collection: "events" }
);

const Events = mongoose.model("events", EventsSchema);

module.exports = Events;
