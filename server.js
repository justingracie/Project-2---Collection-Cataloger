//====================
//  Variables
//====================

const express = require('express');
const PORT = 4000;
const app = express();
const methodOverride = require('method-override');

// const catalogController = require('./controllers/catalog_controller');
// const reviewController = require('./controllers/review_controller');
const controllers = require('./controllers')


require('./config/db.connection');
app.set('view engine', 'ejs');
//====================
//  middleware
//====================

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//routers

app.use('/catalog', controllers.catalog);
// app.use('/review', controllers.reviews);


//local host Port Setup

app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`))
