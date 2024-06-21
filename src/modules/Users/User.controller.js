import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './../../../DB/Models/User.model.js';
import Post from './../../../DB/Models/Post.model.js';
import Comment from '../../../DB/Models/Comment.model.js';


//^ Register a new user
export const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.json({ message: "All fields are required" })
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log("aaaaaaaaaaaa");
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//^ Login a user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "Email and password are required" })
  }
  try {
    const user = await User.findOne({ where: { email } });
    if (!User) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    //* Generate a JWT token

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: "Success!", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//^ Get user details along with posts and comments
export const getUserDetails = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      include: [
        { model: Post, as: 'posts', attributes: ['title', 'content' , 'id'] },
        { model: Comment, as: 'comments', attributes: ['content', 'postid', 'userid'] }
      ],
      attributes: { exclude: ['password'] } //Not sendinf password in response 
    });

    if (user) {
      res.status(200).json({ message: "success", user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//^ Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: Post, as: 'posts', attributes: ['id', 'title', 'content'] },
        { model: Comment, as: 'comments', attributes: ['id', 'content', 'postId'] }
      ],
      attributes: { exclude: ['password'] } //Not sending password in response
    });
    res.status(200).json({ message: "success", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//^ Logout
export const logoutUser = (req, res, next) => {
  res.status(200).json({ message: "Logged out successfully." });
};