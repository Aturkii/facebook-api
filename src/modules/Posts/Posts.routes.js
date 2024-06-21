import { Router } from 'express';
import * as PostController from './Posts.controller.js';

const router = Router();


//* get all posts
router.get('/', PostController.getPosts);

//* get all posts by a specific user
router.get('/user/:userId', PostController.getPostsByUser);

//* get specific post by its id with the auther
router.get('/:id', PostController.getPostById);

//* create a new post
router.post('/', PostController.createPost);

//* update post bt its user id and post id
router.put('/:userId/:postId', PostController.updatePostByUser);

//* delete post by its user id and post id
router.delete('/:userId/:postId', PostController.deletePostByUser);



export default router;
