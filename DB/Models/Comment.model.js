import { DataTypes } from 'sequelize';
import { sequelize } from '../../DB/connection.js';
import Post from './Post.model.js';
const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments', onDelete: "CASCADE", onUpdate: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post', onDelete: "CASCADE", onUpdate: "CASCADE" });

export default Comment;
