//====================
//  Variables
//====================

const express = require('express');
const PORT = 4000;
const app = express();
const methodOverride = require('method-override');
const session =require('express-session');
const MongoStore = require('connect-mongo')
const controllers = require('./controllers')
const navLinks = require('./navLinks')

require('./config/db.connection');
app.set('view engine', 'ejs');
//====================
//  middleware
//====================

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(
    session({
        store: MongoStore.create({mongoUrl: process.env.MONGODB_URI }),
        secret: process.env.MYSECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000*60*60*24*7*2},
    }),
);
app.use('/', controllers.auth);
app.use('/catalog', controllers.catalog);

app.use(function (req, res, next){
    res.locals.user = req.session.currentUser;
    console.log(res.locals);
    next();
});
app.use(navLinks);

//local host Port Setup

//About page router---->

app.get('/about', (req, res) => {
    res.render('about.ejs');
  });

app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`))
