'use strict';
const toolbar = {
  title: 'TOOLBAR',
  tools: [
    {
      title: 'sección',
      name: 'add-sec',
      icon:'fas fa-table'
    },
    {
      title: 'fila',
      name: 'add-row',
      icon:'fas fa-grip-horizontal'
    },
    {
      title: 'columna',
      name: 'add-col',
      icon: 'fas fa-columns'
    },
    {
      title: 'párrafos',
      name: 'add-par',
      icon:'fas fa-paragraph'
    },
    {
      title: 'títulos',
      name: 'add-title',
      icon:'fas fa-font'
    },
    {
      title: 'imagen',
      name: 'add-img',
      icon:'far fa-image'
    },
    {
      title: 'menu',
      name: 'add-nav',
      icon:'fas fa-list-ul'
    },
    {
      title: 'formulario',
      name:'add-form',
      icon: 'fab fa-wpforms'
    }
  ]
};
const fs = require('fs'),
    path = require('path');

class CreateLandingController {
  
  index(req, res, next) {
    if (req.session.useremail) {
      let filesArr = [],
          route = `${__dirname}/../public/dist/files/${req.session.userDir}/`;
      fs.readdir(route, (err, data) => {
        if (err) throw err
        data.map(file => {
          let ext = path.extname(file);
          if (ext !== '.html') {
            if (ext !== '.pug') {
              let stats = fs.statSync(route + file),
                fileSizeInBytes = (stats["size"] / 1000000.0) + ' mb';
              //console.log(fileSizeInBytes);
              filesArr.push({
                name: file,
                size: fileSizeInBytes
              });
            }
          }
        });

        res.render('create-landing', {
          title: 'Landing page Title',
          toolbar: toolbar,
          files: filesArr,
          bodyClass: 'body-create-landing',
          userDir: req.session.userDir
        });

      });
    } else {
      res.redirect('/');
    }
  }

  init(req, res, next) {
    if(req.session.useremail) {
      if (req.params.read !== undefined) {
        fs.readFile(`${__dirname}/../public/dist/files/${req.session.userDir}/${req.session.userDir}.html`,
          'utf-8',
          (err, data) => {
            if (err) {
              throw err
            } else {
              res.send({ landing: data });
            }

          }
        );
      }
    }
  }

  save(req, res, next) {
    if (req.session.useremail) {
      let content = req.body.landingPrev,
         bp = req.body.landingBuild;

      fs.writeFile(`${__dirname}/../public/dist/files/${req.session.userDir}/index.pug`, content, err => {
        if (err) {
          throw err;
        }

      });

      fs.writeFile(`${__dirname}/../public/dist/files/${req.session.userDir}/${req.session.userDir}.html`, bp, err => {
        if (err) {
          throw err;
        }
      });

      res.send({ message: 'Your page has been saved with successes!' });
    }
    
  }

  preview(req, res, next) {
    if (req.session.useremail) {
      console.log(req.session.userDir);
      res.render(`${__dirname}/../public/dist/files/${req.session.userDir}/index.pug`);
    } else {
      res.redirect('/');
    }
  }

}

module.exports = CreateLandingController;
