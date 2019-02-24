'use strict';

const conn = require('./auth-schema');

class AuthModel {
  getUser(user, cb) {
    console.log('Model', '---', user);
    conn
      .findOne({
        useremail: user.useremail,
        password: user.password
      })
      .exec((err, docs) => {
        if (err) throw err;
        cb(docs);
      });
  }

  setUSer (user, cb) {
    conn.create(user, (err) => {
      if (err) throw err;
      cb();
    });
  }
}

module.exports = AuthModel;