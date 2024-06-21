import express from 'express'
import connectionDb from './DB/connection.js'
import UserRouter from './src/modules/Users/User.routes.js';
import Postrouter from './src/modules/Posts/Posts.routes.js'
import CommentRouter from './src/modules/Comments/Comment.routes.js';
import cors from "cors";

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

connectionDb()

app.use('/users', UserRouter);
app.use("/posts", Postrouter);
app.use('/comments', CommentRouter);

app.use("*", (req, res, next) => res.status(404).json('404 not found'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))