const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;


const UserSchema = new mongoose.Schema(
  {
    //FIRST_NAME      EX: "JOHN"
    firstName: {
      type: String,
      required: true,
    },
    //LAST_NAME       EX: "DOE"
    lastName: {
      type: String,
      required: true,
    },
    //EMAIL           EX: "JOHNDOE@GMAIL.COM" - NOTE{REGEX TO CHECK FOR VALID EMAIL?}
    email: {
      type: String,
      required: true,
    },
    //BIO             EX: "3RD YEAR COMPUTER SCIENCE STUDENT"
    bio: {
      type: String,
      required: false,
    },
    //PASSWORD        EX: "$2y$12$GEJWQnKmlAqjrWqeM2K38eEU2v/8ol4h1BulLyWVW1JtyvIBcQgsO"
    //NOTE{STORE AS BCRPYT HASH - 12 ROUNDS}
    password:{
      type: String,
      required: true,
    },

    //FRIENDS         EX: "[63ef15ef2a847e0eb0e379e9, ...]"
    friends:[{
      type: ObjectId,
      default: [],
      required: false,
    }],
    //NOTE{IS USER A VERIFIED USER?}
    verified:{
      type: Boolean,
      required: false,
      default: false,
    }
  },
  { collection: "users" }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;

/*

FAFASDF
*/
//TEMPLATE
/*
{
"first_name":"",
"last_name":"",
"email":"",
"password":"",
}
*/