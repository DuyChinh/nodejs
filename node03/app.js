var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require("express-ejs-layouts")
var session = require("express-session");
var flash = require("connect-flash");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require("./routes/auth");
const passport = require("passport");
const {User} = require('./models/index');
const passportLocal = require("./passports/passport.local");
const passportGoogle = require("./passports/passport.google");
const authMiddleware = require("./middlewares/auth.middleware");
const guestMiddleware = require("./middlewares/guest.middleware");
// const authMiddleware2 = require("./middlewares/api/auth.middleware");
const apiRouter = require("./routes/api");
const cors = require("cors");

var app = express();
var whitelist = ["http://example1.com", "http://example2.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
 
// app.use(cors(corsOptions));

app.use(
  session({
    secret: "dc",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use("local", passportLocal);
passport.use("google", passportGoogle);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  //Read data from api
  const user = await User.findByPk(id);
  done(null, user);
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", cors(), apiRouter);

app.use("/auth", guestMiddleware ,authRouter);
app.use(authMiddleware);
// app.use(authMiddleware2);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );




module.exports = app;
