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

async function getEvents(query) {

    let result;

    //http://localhost:5000/events/?event_id=63f93d5929eeae20467349be
    if(query.event_id !== undefined){
      result = await eventModel.findOne({'_id':query.event_id});
    }
    //http://localhost:5000/events/?startDate=2023-02-28&endDate=2023-02-29
    //Start and End date can't be the same, both must be provided
    else if (query.startDate !== undefined && query.endDate !== undefined){

        //http://localhost:5000/events/?name=Club Rush or ?name=Club works
      if (query.name !== undefined) { 
        result = await eventModel.find({'name':{$regex : query.name, $options : 'i'},
                                        'date':{$gte: query.startDate,
                                                $lte: query.endDate,}});
      }
      //http://localhost:5000/events/?cat=Academics
      else if (query.cat !== undefined){
        result = await eventModel.find({'category':query.cat,
                                        'date':{$gte: query.startDate,
                                                $lte: query.endDate,}});
      }
      //http://localhost:5000/events/?location=Dexter Lawn
      else if (query.location !== undefined){
        result = await eventModel.find({'location':{$regex : query.location, $options : 'i'},
                                        'date':{$gte: query.startDate,
                                                $lte: query.endDate,}});
      }
      else{
        result = await eventModel.find({'date':
                                          {$gte: query.startDate,
                                          $lte: query.endDate,}});
      }
    }
    else{
      result = await eventModel.find();
    }

    return result;
  }
  
  async function addEvents(event) {
    const eventToAdd = new eventModel(event);
    const v = await isVerified(eventToAdd.hostId);
    
    if (v === true){
      eventToAdd.verified = true;
    }

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

  async function isVerified(id){
    var host = await userModel.findById({'_id': id});
    return(host.verified);
  }
  
  
  exports.getEvents = getEvents;
  exports.addEvents = addEvents;
  exports.delEvents = delEvents;