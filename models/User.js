const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: Number,
    default: 2,
  },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

userSchema.pre("remove", function (next) {
  this.tasks.remove({ _id: this.tasks._id }).exec();
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.role;
  delete userObject.__v;

  return userObject;
};

module.exports = mongoose.model("User", userSchema);
