import mongoose from 'mongoose';
import library from './library.model.js';
import shelves from './shelves.model.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  library: [library],
  shelves: [shelves],
});

const User = mongoose.model('User', userSchema);

export default User;
