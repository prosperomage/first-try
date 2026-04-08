import mongoose, { Schema } from "mongoose";

//lover schema will have name, age, sex, location

const LoverSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      required: true,
      trim: true,
    },
    sex:{
        type: String,
        required: true,
        trim: true
    },
    location:{
        type: String,
        required: true,
        tim: required
    }
  },
  {
    timestamps: true,
  },
);

export const  Lover = mongoose.model('Lover', LoverSchema )
