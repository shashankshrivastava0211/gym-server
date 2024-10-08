const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 2,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: false, //disscuss krne k baad daalnge kitna bada form rkhna hai
      trim: true,
    },
    address: {
      type: String,
      //   required: true, discuss krne k baad daalnge kitna bada form rkhna hai
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    BMI: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
