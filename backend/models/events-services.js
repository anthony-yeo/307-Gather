const mongoose = require("mongoose");
const eventModel = require("./events");
const userModel = require("./user");
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
    const host_id = eventToAdd.host_id;

    const createdEvent = await eventToAdd.save();


    const host = await userModel.findById({'_id': host_id});
    var events_created = host.events_created;

    events_created.push(eventToAdd.id);

    await userModel.updateOne({ '_id': host_id }, {
      events_created: events_created
    });
    return createdEvent;
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

