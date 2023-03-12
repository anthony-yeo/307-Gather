const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userModel = require('./user');
const eventModel = require('./events');
const attendanceModel = require('./attendance');

mongoose.set('debug', true);
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



async function getUsers(query) {
  //http://localhost:5000/users/?firstName=test&lastName=test

  if (isEmpty(query)){
    return await userModel.find();
  }
  else if (query.verified !== undefined){
    return await userModel.find({verified: query.verified});
  }
  else if(query.firstName !== undefined && query.lastName !== undefined){
    return await userModel.find({firstName:query.firstName,
                                   lastName:query.lastName});
  }
  else if (query.firstName !== undefined){
    return await userModel.find({firstName:{$regex : query.firstName, $options : 'i'}});
  }

  else if (query.lastName !== undefined){
    return await userModel.find({lastName:{$regex : query.lastName, $options : 'i'}});
  }

}


async function findUserById(id) {
    return await userModel.findById(id);
}

async function findUserByEmail(email){
  return await userModel.find({email:email});
}

async function addUser(user) {
  const checkEmail = await userModel.findOne({email:user.email});

  if (checkEmail === null){
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();

    return savedUser;
  }
  else{
    return undefined;
  }
}

async function saveEvent(userId, eventId) {
  var savedEvent = await attendanceModel.findOne({event_id:eventId});
  if (savedEvent === null) return false;

  var newAttendeeList = savedEvent.attendees;
  newAttendeeList.push(userId);

  await attendanceModel.updateOne({'event_id':eventId}, {
    attendees: newAttendeeList
  });

  return savedEvent; 
}


async function validateUser(reqInfo) {
  if (reqInfo.email === undefined || reqInfo.password === undefined) return false;

  const user = await userModel.findOne({ 'email':reqInfo.email });
  if (user === null) return false;

  return bcrypt.compareSync(reqInfo.password, user.password);
  
}

async function addFriend(userId, friendId) {

  if (userId === undefined || friendId === undefined){
    return undefined;
  }

  var user = await userModel.findOne({'_id':userId});
  var friend = await userModel.findById({'_id': friendId});

  if (friend === null || user === null) return undefined;

  var userFriends = user.friends;
  var friendFriends = friend.friends;
  
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
}

async function delUser(body){
  if (body.email !== undefined){
    return userModel.find({'email':body.email}).remove();
  }
  else if (body.userId !== undefined){
    return userModel.find({'_id':body.userId}).remove();
  }
  else
    return false;
}


function isEmpty(obj) {
  return !Object.keys(obj).length > 0;
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.delUser = delUser;
exports.validateUser = validateUser;
exports.saveEvent = saveEvent;
exports.addFriend = addFriend;
exports.findUserByEmail = findUserByEmail;
