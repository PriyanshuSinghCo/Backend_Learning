import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [
        3,
        "Name must be at least 3 characters long",
      ],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    rootDirId: {
      type: Schema.Types.ObjectId,
      ref: "Directory",
      required: true,
    },
  },
  {
    strict: "throw",
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;

