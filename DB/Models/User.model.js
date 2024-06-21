import { DataTypes } from 'sequelize';
import { sequelize } from '../../DB/connection.js';
import Comment from './Comment.model.js';
import Post from './Post.model.js';
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


User.hasMany(Post, { foreignKey: 'authorId', as: 'posts', onDelete: "CASCADE", onUpdate: "CASCADE" });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author', onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments', onDelete: "CASCADE", onUpdate: "CASCADE" });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: "CASCADE", onUpdate: "CASCADE" });



export default User;
