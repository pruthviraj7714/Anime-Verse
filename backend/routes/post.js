const express = require("express");
const { authMiddleware } = require("../middleware");
const { Media, SavedPost } = require("../db/db");
const z = require("zod");
const postRouter = express.Router();


const postSchema = z.object({
  title: z.string(),
  imageUrl: z.string().url(),
});

postRouter.post("/new", authMiddleware, async (req, res) => {
  const { success } = postSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      msg: "Invalid Inputs",
    });
  }
  try {

    const post = await Media.create({
      user: req.userId,
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      description : req.body.description
    
    });

    await post.populate('user', 'username'); 

    return res.status(200).json({
      msg: "Media Added succesfully",
      post: post,
    });
  } catch (error) {
    console.log("Error" + error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

postRouter.get("/info/:postId", authMiddleware, async (req, res) => {
  try {
    const postId = req.params.postId;

    const post = await Media.findById(postId).populate('user', 'username');

    if(!post) {
        return res.status(404).json({
            msg: "post doesn't exist"
        })
    }
    return res.status(200).json({
        post
    })

  } catch (error) {
    console.log("Error" + error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

postRouter.delete('/:postId', authMiddleware, async(req, res) => {
  try {
    const postId = req.params.postId;
    
    await SavedPost.deleteOne({
      post : postId
    })

    await Media.findByIdAndDelete(postId);

    return res.status(200).json({
      msg : "Post Deleted Succesfully"
    })
    
  } catch (error) {
    console.log("Error" + error.message);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
})

postRouter.post('/save/:postId', authMiddleware, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.userId;

    const existingPost = await SavedPost.findOne({
      user: userId,
      post: postId
    });

    if (existingPost) {
      return res.status(400).json({
        msg: "Post is already saved"
      });
    }
   
    await SavedPost.create({
      user: userId,
      post: postId,
    });

    return res.status(200).json({
      msg: "Post saved successfully"
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

postRouter.delete('/unsave/:postId', authMiddleware, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.userId;


    await SavedPost.findOneAndDelete({
      user: userId,
      post: postId
    });

    return res.status(200).json({
      msg: "Post unsaved successfully"
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});


postRouter.get('/saved-posts', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;


    const savedPosts = await SavedPost.find({ user: userId }).populate({
      path : 'post',
      populate : {path : 'user', select : 'username'}
    });

    return res.status(200).json({
      savedPosts: savedPosts 
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
});

postRouter.get("/all", authMiddleware, async (req, res) => {
  try {
    const posts = await Media.find({}).populate("user", "username");

    return res.status(200).json({
      posts,
    });
  } catch (error) {
    console.log("Error" + error.message);
  }
});

module.exports = postRouter;
