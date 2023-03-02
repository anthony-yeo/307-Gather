const mongoose = require("mongoose");
const userModel = require("./user");
const eventModel = require("./events");
const attendanceModel = require("./attendance");
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

//WHAT ARE SOME WAYS WE WANT TO FILTER USER BY?
//--VERIFIED USERS
async function getUsers() {
  result = await userModel.find();
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
    const checkEmail = await userModel.findOne({email:user.email});
    
    if (checkEmail !== undefined || checkEmail === null){
      const hash = bcrypt.hashSync(user.password, hashRound);
      user.password = hash;

      const userToAdd = new userModel(user);
      const savedUser = await userToAdd.save();

      return savedUser;
    }
    else{
      return checkEmail;
    }
    
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function saveEvent(userId, eventId) {
  try {
    var savedEvent = await attendanceModel.findOne({event_id:eventId});
    if (savedEvent === null) return false;

    var newAttendeeList = savedEvent.attendees;
    newAttendeeList.push(userId);

    await attendanceModel.updateOne({'event_id':eventId}, {
      attendees: newAttendeeList
    });

    return savedEvent;
  } catch (error) {
    console.log(error);
    return undefined;
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
    return undefined;
  }
}

async function addFriend(userId, friendId) {

  try {
    var user = await userModel.findOne({'_id':userId});
    var userFriends = user.friends;

    var friend = await userModel.findById({'_id': friendId});
    var friendFriends = friend.friends;

    if (friend === undefined || user === undefined) return undefined;

    
    if(userFriends.includes(friendId) || friendFriends.includes(userId)) return false;

    userFriends.push(friend);
    friendFriends.push(user);

    await userModel.updateOne({ '_id':userId }, {
      friends: userFriends
    });

    await userModel.updateOne({'_id':friendId}, {
      friends: friendFriends
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function delUser(body){
  try{
    if (body.userId === undefined){
      return userModel.find({'email':body.email}).remove();
    }
    else if (body.email === undefined){
      return userModel.find({'_id':body.userId}).remove();
    }
    else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.delUser = delUser;
exports.validateUser = validateUser;
exports.saveEvent = saveEvent;
exports.addFriend = addFriend;
