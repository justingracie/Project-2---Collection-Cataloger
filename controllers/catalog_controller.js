const express = require("express");
const router = express.Router();
const db = require("../models");
//====================
//  ROUTES
//====================

//Index Route ---->

router.get("/", async (req, res, next) => {
  try {
      console.log(req.session);
    const catalog = await db.Catalog.find({});
    const context = { 
        catalog: catalog, 
        user: req.session.currentUser,
        routes: req.session.authRoutes,
    };


    return res.render("index.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

//New Route ---->

router.get("/new", (req, res) => {
 
  const context = {
      user: req.session.currentUser,
      routes: req.session.authRoutes,
  }
  if(req.session.currentUser){
      res.render("new.ejs", context);
    }else{
      return res.redirect('/login');
    }
});

//Create Route ---->

router.post("/", async (req, res, next) => {
  try {
      let songs = req.body.trackList.split(', ');
      req.body.trackList = songs;
      const createdCatalog = await db.Catalog.create(req.body);

    res.redirect("/catalog");
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

// Edit route---->

router.get("/:id/edit", async (req, res, next) => {
  try {
    const updatedCatalog = await db.Catalog.findById(req.params.id);
    const context = {
        user: req.session.currentUser,
        routes: req.session.authRoutes,
        catalog: updatedCatalog 

    }
    return res.render("edit.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

//Update Route ----->

router.put("/:id", async (req, res, next) => {
  try {
    if(req.session.currentUser){
      let songs = req.body.trackList.split(',').map(str => str.trim()); // removes space at beginning and end of the string
      req.body.trackList = songs;
      const updateCatalog = await db.Catalog.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      return res.redirect(`${req.params.id}`);

    }else{
      return res.redirect('/login');
    }
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

//Show Route ----->

router.get("/:id", async (req, res, next) => {
  try {
    const foundCatalog = await db.Catalog.findById(req.params.id);
    const context = { 
        catalogItem: foundCatalog,
        user: req.session.currentUser,
        routes: req.session.authRoutes, 
    };
    res.render("show.ejs", context);

  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

//Delete/Destroy Route----->

router.delete('/:id', async (req, res, next)=>{
    try{
      if(req.session.currentUser){
        const deletedCatalog = await db.Catalog.findByIdAndDelete(req.params.id);
        res.redirect('/catalog');
      }else{
        return res.redirect('/login');
      }
    }catch(error){
      console.log(error);
      req.error = error;
      return next();
    }
});


module.exports = router;
