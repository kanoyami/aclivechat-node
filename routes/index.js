var express = require('express');
var router = express.Router();
/* GET home page. */
//'w.Write([]byte(`{"version": " + BackendVersion + ", "config": {"enableTranslate":  + strconv.FormatBool(EnableTranslate) + }}))'
router.get('/server_info', function (req, res, next) {
  res.json({
    version: "0.2.26-rev-ll",
    config: {
      enableTranslate: false
    }
  })
});

module.exports = router;
