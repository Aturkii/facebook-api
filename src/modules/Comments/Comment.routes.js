import { Router } from 'express';
import * as CommentController from './Comment.controller.js';

const router = Router();

//* get all comments with posts and authors
router.get('/', CommentController.getAllComments);

//* create a new comment
router.post('/', CommentController.createComment);

//* get all comments for a specific post
router.get('/post/:postId', CommentController.getCommentsByPost);

//* get a specific comment by id
router.get('/:id', CommentController.getCommentById);

//* update a comment by Id
router.put('/:id', CommentController.updateComment);

//* delete a comment by Id
router.delete('/:id', CommentController.deleteComment);

export default router;
