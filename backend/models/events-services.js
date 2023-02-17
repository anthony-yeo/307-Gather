const mongoose = require("mongoose");
const eventModel = require("./events");
mongoose.set("debug", true);
require('dotenv').config();

const conn_str = 'mongodb+srv://ProjectGather:' + process.env.DB_PASSWORD + '@project-gather.iidopil.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(
  conn_str,
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  },(err) => {
    if (err) {
      console.log("error in connection");
    } else {
      console.log("mongodb events is connected");
}})

async function getEvents(name) {
  let result;
  if (name === undefined) {
    result = await eventModel.find();
  }
  return result;
}

async function addEvents(event) {
  try {
    const eventToAdd = new eventModel(event);
    const savedEvent = await eventToAdd.save();
    return savedEvent;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function delEvents(id){
  try{
    return eventModel.find({'_id': id}).remove()
  } catch (error) {
    console.log(error);
    return false;
  }
}


exports.getEvents = getEvents;
exports.addEvents = addEvents;
exports.delEvents = delEvents;

