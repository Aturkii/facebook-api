import Comment from "../../../DB/Models/Comment.model.js";
import Post from "../../../DB/Models/Post.model.js";
import User from './../../../DB/Models/User.model.js';


//& Create a new post
export const createPost = async (req, res, next) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await Post.create({ title, content, authorId });
    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//& Get all posts
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username', 'email']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'content', 'userId'],
          include: {
            model: User,
            as: 'user',
            attributes: ['username']
          }
        }
      ]
    });
    res.status(200).json({ message: "success", Posts: posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//& Get all posts by a specific user
export const getPostsByUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId, {
      include: [
        { model: Post, as: 'posts', attributes: ['id', 'title', 'content'] }
      ]
    });

    if (user) {
      res.status(200).json({ message: "Success", Posts: user.posts });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//& Get a specific post by ID
export const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id, {
      include: [
        { model: User, as: 'author', attributes: ['username', 'email'] },
        { model: Comment, as: 'comments', attributes: ['content', 'postid', 'userid'] }
      ]
    });
    if (post) {
      res.status(200).json({ message: "success", post });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//& Update a post by user ID and post ID
export const updatePostByUser = async (req, res, next) => {
  const { userId, postId } = req.params;
  const { title, content } = req.body;

  try {
    const post = await Post.findOne({
      where: {
        id: postId,
        authorId: userId
      }
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found or you are not the author' });
    }

    post.title = title !== undefined ? title : post.title;
    post.content = content !== undefined ? content : post.content;

    await post.save();
    res.status(200).json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//& Delete a post by user ID and post ID
export const deletePostByUser = async (req, res, next) => {
  const { userId, postId } = req.params;

  try {
    const post = await Post.findOne({
      where: {
        id: postId,
        authorId: userId
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or you are not the author' });
    }
    await post.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};