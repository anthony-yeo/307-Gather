const mongoose = require("mongoose");
const userModel = require("./user");
const eventModel = require("./events");
const bcrypt = require("bcrypt");
mongoose.set("debug", true);
require('dotenv').config();

const conn_str = 'mongodb+srv://ProjectGather:' + process.env.DB_PASSWORD + '@project-gather.iidopil.mongodb.net/?retryWrites=true&w=majority'
const hashRound = 10;            

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

async function getUsers(name, job) {
  let result;
  if (name === undefined && job === undefined) {
    result = await userModel.find();
  } else if (name && !job) {
    result = await findUserByName(name);
  } else if (job && !name) {
    result = await findUserByJob(job);
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
    const hash = bcrypt.hashSync(user.password, hashRound);
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
    if (newEvent === null) return false;

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

async function addFriend(id, friend_id) {
  try {
    var user = await userModel.findOne({'_id':id});
    if (user === undefined) return false;
    var newFriendsList = user.friends;

    const newFriend = await userModel.findById({'_id': friend_id});
    if (newFriend === null) return false;

    if(newFriendsList.includes(friend_id)) return false;

    newFriendsList.push(newFriend);
    await userModel.updateOne({ '_id': id }, {
      friends: newFriendsList
    });
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function delUser(id){
  try{
    return userModel.find({'_id': id}).remove()
  } catch (error) {
    console.log(error);
    return false;
  }
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

async function findUserByJob(job) {
  return await userModel.find({ job: job });
}


exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.delUser = delUser;
exports.validateUser = validateUser;
exports.saveEvent = saveEvent;
exports.addFriend = addFriend;
