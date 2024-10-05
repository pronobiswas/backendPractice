const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  FirstName: {
    type: "String",
    required: [true, "FirstName missing !!"],
    max: [12, "max Name size 12 charecter"],
    min: [3, "Minimun Name size 3 charecter"],
  },
  LastName: {
    type: "String",
    required: [true, "LastName missing !!"],
    max: [12, "max Name size 12 charecter"],
    min: [3, "Minimun Name size 3 charecter"],
  },
  Email: {
    type: "String",
    required: [true, "Email missing or Invalid !!"],
  },
  TelePhone: {
    type: "String",
    required: [true, "TelePhone missing or Invalid !!"],
    max: [13, "max Name size 12 charecter"],
    min: [10, "Minimun Name size 3 charecter"],
  },
  TelePhone: {
    type: "String",
    required: [true, "TelePhone missing or Invalid !!"],
  },
  Adress1: {
    type: "String",
    required: [true, "Adress1 missing or Invalid !!"],
  },
  Adress2: {
    type: "String",
  },
  City: {
    type: String,
    trim: true,
  },
  PostCode: {
    type: String,
    trim: true,
    max: 4,
  },
  Devision: {
    type: String,
    trim: true,
  },
  District: {
    type: String,
    trim: true,
  },
  Password: {
    type: String,
    required: [true, "Passsword is missing"],
    trim: true,
  },
  OTP: {
    type: String,
  },
  userIsVeryFied: {
    type: Boolean,
    default: false,
  },
  Role: {
    type: String,
    enum: ["admin", "user", "marchent"],
    default: "user",
  },
  Token: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

const userModel = mongose.model("ExamUsers", UserSchema);

module.exports = { userModel };
