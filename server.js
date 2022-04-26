//====================
//  Variables
//====================

const express = require('express');
const PORT = 4000;
const app = express();
const methodOverride = require('method-override');
const catalogController = require('./controllers/catalog_controller');
const reviewController = require('./controllers/review_controller');

app.set('view engine', 'ejs');

//====================
//  middleware
//====================

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//routers
app.use('/catalog', catalogController);
// app.use('/review', reviewController);

//local host Port Setup

app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`))


