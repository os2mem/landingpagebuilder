'use strict';

class DashBoardController {

  index(req, res, next) {
    if (req.session.useremail) {
      res.render('dashboard', {
        title: 'Dashboard',
        bodyClass: 'body-dashboard',
        userDir: req.session.userDir,
        username: req.session.username
      });

    } else {
      res.redirect('/');
    }

  }

}

module.exports = DashBoardController;