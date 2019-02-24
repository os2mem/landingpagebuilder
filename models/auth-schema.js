'use strict';

const mongoose = require('./model'),
  Schema = mongoose.Schema,
  AuthSchema = new Schema({
    username: String,
    useremail: String,
    password: String,
    userDir: String
  },
  {
    collection: 'users'
  }),
  Auth = mongoose.model('Users', AuthSchema);

module.exports = Auth;