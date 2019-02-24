'use strict';

const AuthModel = require('../models/auth-model'),
      am = new AuthModel(),
      errors = require('../middlewares/errors'),
      fs = require('fs');


class AuthController {
  index(req, res, next) {

    res.render('index', {
      title: 'Vieweb',
      bodyClass: 'body-index'
    });

  }

  loginGet(req, res, next) {

    if (req.session.username) {
      res.redirect('/dashboard');
    } else {
      res.render('login', {
        title: 'Login',
        bodyClass: 'body-login'
     });

    }
    
  }

  loginPost(req, res, next) {
    let user = {
      useremail: req.body.useremail,
      password: req.body.password
    };

    //console.log(user);

    am.getUser(user, (docs) => {
      req.session.useremail = (docs != null) ? user.useremail : null;
      req.session.userDir = (docs !=null) ? docs.userDir : null;
      req.session.username = (docs != null) ? docs.username : null;
      
      console.log(req.session);
      console.log(req.session, '---', docs);

      return (req.session.useremail) 
        ? res.redirect(`/dashboard`) 
        : errors.http401(req, res, next) ;
    });
  }

  signupGet(req, res, next) {
    res.render('signup', {
      title: 'Sign Up',
      bodyClass: 'body-signup'
    });
  }

  signupPost(req, res, next) {
    let user = {
          user_id:0,
          username: req.body.username,
          useremail: req.body.useremail,
          password: req.body.password,
          userDir: req.body.userDir
        };
    am.setUSer(user, (docs) => {
      fs.mkdir(`${__dirname}/../public/dist/files/${user.userDir}`, { recursive: true }, (err) => {
        if(err) throw err; 
        res.redirect(`/login?message=El usuario ${user.username} ha sido creado`);
      });
     
    });
  }

  logOut(req, res, next) {
    req.session.destroy((err) => {
      return (err)
        ? errors.http500(req, res, next)
        : res.redirect('/');
    });
  }

  
  
}

module.exports = AuthController;
