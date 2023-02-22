const mongoose = require("mongoose");
const userModel = require("./user");
const eventModel = require("./events");
const bcrypt = require("bcrypt");
mongoose.set("debug", true);
require('dotenv').config();

var ObjectId = require('mongodb').ObjectId;
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
      console.log("mongodb users is connected");
}})

async function getUsers(first_name, last_name) {
  let result;
  if (first_name === undefined && last_name === undefined) {
    result = await userModel.find();
  } else if (first_name && !last_name) {
    result = await findUserByFirstName(first_name);
  } else if (first_name && !last_name) {
    result = await findUserByLastName(job);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function saveEvent(id, eventId) {
  try {
    var user = await userModel.findOne({'_id':id});
    if (user === undefined) return false;
    var newEventList = user.events_saved;

    const newEvent = await eventModel.findById({'_id': eventId});
    if (newEvent === undefined) return false;

    if(newEventList.includes(eventId)) return false;

    newEventList.push(newEvent);
    await userModel.updateOne({ '_id': id }, {
      events_saved: newEventList
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function delUser(id){
  try{
    return userModel.find({'_id': id}).remove();
  } catch (error) {
    console.log(error);
    return false;
  }
}


async function findUserByFirstName(first_name) {
  return await userModel.find({ first_name: first_name });
}

async function validateUser(reqInfo) {
  if (reqInfo.email === undefined || reqInfo.password === undefined) return false;
  try {
    const user = await userModel.findOne({ 'email':reqInfo.email });
    if (user === undefined) return false;
    return bcrypt.compareSync(reqInfo.password, user.password);
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByLastName(last_name) {
  return await userModel.find({ last_name: last_name });
}


exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.delUser = delUser;
//exports.addFriend = addFriend;
exports.validateUser = validateUser;
exports.saveEvent = saveEvent;

