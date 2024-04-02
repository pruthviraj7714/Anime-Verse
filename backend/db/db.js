const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const DB_URL = process.env.MONGODB_URl;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const savedPostSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "User",
    required : true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    required: true
  },
  savedAt: {
    type: Date,
    default: Date.now
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  savedPosts: [savedPostSchema]
});


const mediaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  imageUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('User', userSchema);

const Media = mongoose.model('Media', mediaSchema);

const SavedPost = mongoose.model('SavedPost', savedPostSchema);


module.exports = { User, Media, SavedPost };
