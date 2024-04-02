
const { User, Media, SavedPost } = require("../db/db");
const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
const { JWT_SECRET } = require("../config");

const userRouter = express.Router();

const signUpSchema = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});

const LogInSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
});

const updateSchema = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
});

userRouter.post("/signup", async (req, res) => {
  const { success } = signUpSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      msg: "Check your inputs",
    });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (existingUser) {
      return res.status(411).json({
        msg: "Email/Username is already taken",
      });
    }

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const userId = user._id;

    const token = jwt.sign({ userId }, JWT_SECRET);

    return res.status(200).json({
      msg: "User Created Successfully",
      token,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { success } = LogInSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      msg: "Invalid Inputs",
    });
  }

  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res.status(411).json({
        msg: "User Not exist",
      });
    } else {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);

      return res.status(200).json({
        msg: "Logged in succesfully",
        token,
      });
    }
  } catch (error) {
    console.log("Error : " + error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

userRouter.put("/update", authMiddleware, async (req, res) => {
  try {
    const { success } = updateSchema.safeParse(req.body);

    if (!success) {
      return res.status(411).json({
        msg: "Inavlid Inputs",
      });
    }

    await User.findByIdAndUpdate(req.userId, req.body);

    return res.status(200).json({
      msg: "User info Updated Succesfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

userRouter.delete("/delete", authMiddleware, async (req, res) => {
  try {
    await Media.deleteMany({user : req.userId});

    await User.findByIdAndDelete(req.userId);

    return res.status(200).json({
      msg: "User Deleted Succesfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

userRouter.get("/info", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const posts = await Media.find({ user: req.userId }).populate('user', 'username');

    const savedPosts = await SavedPost.find({ user: req.userId }).populate({
      path : 'post',
      populate : {path : 'user', select : 'username'}
    });

    return res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      posts: posts,
      savedPosts: savedPosts,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

userRouter.get("/info/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    const posts = await Media.find({
      user: id,
    }).populate('user', 'username');

    return res.status(200).json({
      username: user.username,
      posts,
    });
  } catch (error) {
    console.log("Error " + error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

module.exports = userRouter;
