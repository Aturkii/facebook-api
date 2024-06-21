import { Router } from 'express';
import * as UserController from './User.controller.js';

const router = Router();


//* register user
router.post('/register', UserController.registerUser);

//* login user
router.post('/login', UserController.loginUser);

//* get a specific user with a specific post and post’s comments.
router.get('/:id', UserController.getUserDetails);

//* get all users
router.get('/', UserController.getAllUsers);

//* logout
router.post('/logout', UserController.logoutUser);
export default router;
