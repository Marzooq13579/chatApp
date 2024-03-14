import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface User {
  name: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  matchPassword: (pw: string) => Promise<boolean>
}

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  try {
    // Update updatedAt timestamp
    this.updatedAt = Date.now() as unknown as Date;

    if (!this.isModified("password")) {
      next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    console.error("Error saving user:", error);
    next(error); // Pass the error to the next middleware or error handler
  }
});

const User = mongoose.model("User", userSchema);

export default User;
