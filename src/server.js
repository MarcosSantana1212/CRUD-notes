const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//Initializations
const app = express();
require('./config/passport');

//Settings

app.set('port', process.env.PORT || 4000);

app.set('views', path.join(__dirname,'views')); //usar path.join() para ser multiplatforma, señalar carpeta 'views'

app.engine('.hbs',engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.set('views'), 'layouts'),
    partialsDir: path.join(app.set('views'), 'partials'),
    extname: '.hbs' 
}));

app.set('view engine','.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req,res, next)  => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use(require('./routes/index.routes.js'));
app.use(require('./routes/notes.routes.js'));
app.use(require('./routes/users.routes.js'));

//Static Files
app.use(express.static(path.join(__dirname,'public')));

module.exports = app;