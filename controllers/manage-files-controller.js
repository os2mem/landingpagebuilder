'use strict';

const fs = require('fs');
const path = require('path');

class ManageFiles {
  getAll(req, res, next) {
    if (req.session.useremail) {
      let filesArr = [];
      let route = `${__dirname}/../public/dist/files/${req.session.userDir}/`;
      fs.readdir(route, (err, data) => {
        if (err) throw err
        data.map(file => {
          let ext = path.extname(file);
          if (ext !== '.html') {
            if (ext !== '.pug') {
              let stats = fs.statSync(route+file),
                fileSizeInBytes = (stats["size"] / 1000000.0) + ' mb';
                //console.log(fileSizeInBytes);
              filesArr.push({
                name: file,
                size: fileSizeInBytes
              });
            }            
          }
        });

        res.render('manage-files', {
          title: 'Archivos',
          files: filesArr,
          bodyClass: 'body-manage-files',
          userDir: req.session.userDir,
          username: req.session.username
        });
        
      });

    } else {
      res.redirect('/');
    }
    
  }

  addFile(req, res, next) {
    let newFile  = req.files.file,
        tempPath = newFile.path,
        userFolder = `${__dirname}/../public/dist/files/${req.session.userDir}/`,
        moveTo = `${userFolder}${newFile.name}`,
        fileSize = newFile.size,
        MAX_BYTES = (1024 * 1024);
      if ( MAX_BYTES > fileSize ) {
        fs.rename(tempPath, moveTo, (err) => {
          if (err) {
            return res.status(500).send({ message: err });
          } else {

            fs.readdir(userFolder, (err, data) => {
              if (err) throw err;

              return res.status(200).send({ message: 'File upload', filesList: data });
            });
          }
        });

      } else {
        return res.status(500).send({ message: 'La imagen supera el peso max' });
      }

  }
}

module.exports = ManageFiles;