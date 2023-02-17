const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    //FIRST_NAME    EX: "JOHN"
    first_name: {
      type: String,
      required: true,
    },
    //LAST_NAME     EX: "DOE"
    last_name: {
      type: String,
      required: true,
    },
    //EMAIL         EX: "JOHNDOE@GMAIL.COM" - NOTE{REGEX TO CHECK FOR VALID EMAIL?}
    email: {
      type: String,
      required: true,
    },
    //BIO           EX: "3RD YEAR COMPUTER SCIENCE STUDENT"
    bio: {
      type: String,
      required: false,
    },
    //PASSWORD      EX: "$2y$12$GEJWQnKmlAqjrWqeM2K38eEU2v/8ol4h1BulLyWVW1JtyvIBcQgsO"
    //NOTE{STORE AS BCRPYT HASH - 12 ROUNDS}
    password:{
      type: String,
      required: true,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;
