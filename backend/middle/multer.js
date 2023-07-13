const multer = require('multer');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync(`./data`)) {
  fs.mkdirSync(`./data`);
}

exports.ImageFileHandler = (dirName) => {
  if (!fs.existsSync(`./data/${dirName}`)) {
    fs.mkdirSync(`./data/${dirName}`);
  }
  return multer({
    storage: multer.diskStorage({
      destination(req, file, res) {
        res(null, `./data/${dirName}`);
      },
      async filename(req, file, res) {
        const ext = path.extname(file.originalname);
        res(null, `${file.fieldname}_${Date.now()}${ext}`);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5메가로 용량 제한
  });
};
