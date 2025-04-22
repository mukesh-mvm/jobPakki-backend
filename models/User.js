import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    specialization: {
      type: String,
      enum: ["tech", "govern", "bank"],
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type:String,
      
    },

    status:{
      type:String,
      default:"Inactive"
    },

    role: {
      type: String,
      enum: ['user', 'admin', 'superAdmin', 'seoAdmin'],
      default: 'user',
    },
  },
  { timestamps: true }

  
);



// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
