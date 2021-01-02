var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require("fs")
var config = require("../config/config.json")
const FONTS_DIR = path.join(process.cwd(), "upload", "fonts")
/* GET home page. */
//'w.Write([]byte(`{"version": " + BackendVersion + ", "config": {"enableTranslate":  + strconv.FormatBool(EnableTranslate) + }}))'
router.get('/server_info', function (req, res, next) {
  res.json({
    version: config["version"],
    config: {
      enableTranslate: false
    }
  })
});

router.post('/font_upload', function (req, res, next) {
  if (req.files === null) {
    return res.status(400).json({ msg: 'no file uploaded' });
  }

  const file = req.files.file;
  const file_name = "userdefine_" + file.name
  const file_path = path.join(FONTS_DIR, file_name)
  file.mv(file_path, err => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/upload/fonts/${file_name}` });
  });

});



router.get('/fonts_list', function (req, res, next) {
  fs.readdir(FONTS_DIR, (err, files) => {
    if (!files) return res.json([])
    let res_arr = []
    files.forEach(e => {
      res_arr.push({
        url: `/upload/fonts/${e}`,
        name: e.replace(".ttf", "")
      })
    })
    res.json(res_arr)
  })
});


router.get('/version', function (req, res, next) {
  return res.json({ version: config.version })
});
module.exports = router;
