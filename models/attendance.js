var mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;

const AttendanceSchema = new mongoose.Schema(
  {
    //HOST_ID       EX: '63ebe5b9d4d533c9fc679baa'
    event_id:{
      type: ObjectId,
      required: true
    },
    attendees:{
      type: [ObjectId],
      required: true,
      default: []
    }
  },
  { collection: "attendance" }
);

const Attendance = mongoose.model("attendance", AttendanceSchema);

module.exports = Attendance;
