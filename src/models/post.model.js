import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
      trim: true,
      min:1,
      max:150
    },
  },
  {
    timestamps: true,
  },
);

export const Post = mongoose.model("Post", PostSchema);
