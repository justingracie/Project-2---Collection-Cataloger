const express = require('express');
const router = express.Router();
const db = require('../models')

//====================
//  ROUTES
//====================

//Index Route ---->

router.get('/', async (req, res, next)=>{
    try{
        const catalog = await db.Catalog.find({});
        const context = {catalog};
        return res.render('index.ejs', context);

    }catch(error){
        console.log(error);
        req.error = error;
        return next();

    }
})

//New Route ---->

router.get('/', (req, res)=>{
    res.render('new.ejs');
});

//Create Route ---->

router.post('/', async (req, res, next)=>{
    try{
        const createdCatalog = await db.Catalog.create(req.body);
        res.redirect('/catalog');
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }

});

// Edit route---->

router.get('/:id/edit', async (req, res, next)=>{
    try{
        const updatedCatalog = await db.Catalog.findById(req.params.id);
        return res.render('edit.ejs', {catalog: updatedCatalog});
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
});

//Update Route ----->

// router.put('/:id', async (req, res, next)=>{
//     try{
        
//     }
// })