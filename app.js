/*
 * @Date: 2020-12-20 21:41:22
 * @LastEditors: kanoyami
 * @LastEditTime: 2020-12-20 22:03:46
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const history = require('connect-history-api-fallback');
const index = require("./routes/index")
const expressWs = require('express-ws');
const fileUpload = require('express-fileupload')
const opn  = require("./utils/auto_open")
const messageHandler = require("./handler/message");
const init = require("./init")

const __CONF__ = require("./config/config.json");
const __PORT__ = __CONF__["serverPort"];
const __UPLOAD_FIFES__ = path.join(process.cwd(),"upload")
//启动配置
init.startup()

const app = express();

app.use(express.json());
app.use( fileUpload() );
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", index);
app.use(history());
expressWs(app)

app.ws('/chat', function (ws, req) {
  ws.on('message', messageHandler.bind(ws))
})
app.use("/upload",express.static(__UPLOAD_FIFES__));
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err)
  res.status(err.status || 500);
  res.json('error');
});


app.listen(__PORT__);
console.log(`App start on ${__PORT__} of version ${__CONF__["version"]}` )
console.log("get high performance!")
console.log(`打开浏览器，进入http://localhost:${__PORT__}/`)
console.log("今天令荷在阳台。")
opn(`http://localhost:${__PORT__}/`)