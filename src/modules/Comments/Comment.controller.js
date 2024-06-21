import Comment from "../../../DB/Models/Comment.model.js";
import Post from "../../../DB/Models/Post.model.js";
import User from "../../../DB/Models/User.model.js";


//& Create a new comment
export const createComment = async (req, res, next) => {
  const { content, postId, userId } = req.body;
  try {
    const post = await Post.findByPk(postId);
    const user = await User.findByPk(userId);

    if (!post || !user) {
      return res.status(404).json({ error: 'Post or User not found' });
    }

    const comment = await Comment.create({ content, postId, userId });
    res.status(201).json({ message: 'Comment created successfully', comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//& Get all comments for a specific post
export const getCommentsByPost = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { postId },
      include: [
        { model: User, as: 'user', attributes: ['username'] }
      ]
    });
    res.status(200).json({ message: "success", comments: comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//& Get a specific comment by ID
export const getCommentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ['username'] },
        { model: Post, as: 'post', attributes: ['title', 'id'] }
      ]
    });

    if (comment) {
      res.status(200).json({ message: "success", comment });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//& Update a comment by ID
export const updateComment = async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.findByPk(id);
    if (comment) {
      comment.content = content;
      await comment.save();
      res.status(200).json({ message: "Comment updated successfully", comment });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//& Delete a comment by ID
export const deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id);
    if (comment) {
      await comment.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//& Get all comments with posts and authors
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: Post,
          as: 'post',
          attributes: ['id', 'title', 'content'],
          include: {
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'email']
          }
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    res.status(200).json({ message: "success", comments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};