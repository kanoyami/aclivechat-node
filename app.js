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
const __PORT__ = 3378;
const messageHandler = require("./handler/message");


const app = express();
app.use(express.json());
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(history());
expressWs(app)
app.ws('/chat', function (ws, req) {
  ws.on('message', messageHandler.bind(ws))
})
app.use("/", index);
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
  res.status(err.status || 500);
  res.json('error');
});


app.listen(__PORT__);
console.log("App start on " + __PORT__ )
console.log("get high performance!")
console.log(`打开浏览器，进入http://localhost:${__PORT__}/`)
console.log("今天令荷在阳台。")