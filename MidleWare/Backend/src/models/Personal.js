import mongoose from "mongoose";

const personalSchema = new mongoose.Schema({
  employee_ID: {
    type: String,
    unique: true
  },
  first_Name: {
    type: String,
    maxlength: 50
  },
  last_Name: {
    type: String,
    maxlength: 50
  },
  middle_Initial: {
    type: String,
    maxlength: 50
  },
  address1: {
    type: String,
    maxlength: 50
  },
  address2: {
    type: String,
    maxlength: 50
  },
  city: {
    type: String,
    maxlength: 50
  },
  state: {
    type: String,
    maxlength: 50
  },
  zip: {
    type: Number
  },
  email: {
    type: String,
    maxlength: 50
  },
  phone_Number: {
    type: String,
    maxlength: 50
  },
  social_Security_Number: {
    type: String,
    maxlength: 50
  },
  drivers_License: {
    type: String,
    maxlength: 50
  },
  marital_Status: {
    type: String,
    maxlength: 50
  },
  gender: {
    type: Boolean
  },
  shareholder_Status: {
    type: Boolean,
    
  },
  benefit_Plans: {
    type: Number
  },
  ethnicity: {
    type: String,
    maxlength: 50
  }
},
  {
    timestamps: true,
    versionKey: false,
  });



export default mongoose.model('Personal', personalSchema);
