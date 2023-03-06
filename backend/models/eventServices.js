const mongoose = require('mongoose');

const userModel = require('./user');
const eventModel = require('./events');
const attendanceModel = require('./attendance');

mongoose.set("debug", true);
require('dotenv').config();

const conn_str = 'mongodb+srv://ProjectGather:'+process.env.DB_PASSWORD+'@project-gather.iidopil.mongodb.net/?retryWrites=true&w=majority'
    
 
try {
  // Connect to the MongoDB cluster
   mongoose.connect(
    conn_str,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("> MONGODB events connection \t- successful")
  );

} catch (e) {
  console.log("> MONGODB events connection \t- failed");
}

async function getEvents(event_id, host_id, name, sDate, eDate, time, cat) {

    //ADD VERIFIED TAG TO EVENT SCHEMA

    let result;
    //http://localhost:5000/events/?event_id=63f93d5929eeae20467349be
    if(event_id !== undefined){
      result = await eventModel.findOne({'_id':event_id});
    }
    //http://localhost:5000/events/?name=Club Rush
    else if (name !== undefined) { 
      result = await eventModel.find({'name':name});
    }
    //http://localhost:5000/events/?cat=Academics
    else if (cat !== undefined){
      result = await eventModel.find({'category':cat});
    }
    //http://localhost:5000/events/?startDate=2023-02-28&endDate=2023-02-29
    else if (sDate !== undefined && eDate !== undefined){
      result = await eventModel.find({'date':
                                   {$gte: sDate,
                                    $lte: eDate,}
                                  });
    }
    return result;
}

  
  
  async function addEvents(event) {
    const eventToAdd = new eventModel(event);
    const createdEvent = await eventToAdd.save();
  
    event_id = createdEvent._id;
  
    const eventAttendance = new attendanceModel({event_id:event_id});
    const result = await eventAttendance.save();
  
    return result;
  
    
  }
  
  async function delEvents(id){
    const eventToDel = await eventModel.findOne({'_id': id});
    if(!eventToDel) return false;
  
    const result = await eventToDel.remove();
    return result;
  }
  
  
  exports.getEvents = getEvents;
  exports.addEvents = addEvents;
  exports.delEvents = delEvents;