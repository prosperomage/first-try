import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 5,
      maxLength: 12,
    },
    password: {
      type: String,
      required: true,
      minLenght: 6,
      maxLenght: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

//bcrypt hashses your passwords beore you save them
userSchema.pre("save", async function (next) {
  if (!this.isModified("paswword")) return next();
  this.password = await bcrypt.hash(this.password, 10);

  next();
});


//compare methods
userSchema.methods.comparePasswords = async function (password){
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema);
