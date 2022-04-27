const express = require("express");
const router = express.Router();
const db = require("../models");

//====================
//  ROUTES
//====================

//Index Route ---->

router.get("/", async (req, res, next) => {
  try {
    const catalog = await db.Catalog.find({});
    const context = { catalog };

    console.log(catalog);

    return res.render("index.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

//New Route ---->

router.get("/new", (req, res) => {
  res.render("new.ejs");
});

//Create Route ---->

router.post("/", async (req, res, next) => {
  try {
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
    return res.render("edit.ejs", { catalog: updatedCatalog });
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});

//Update Route ----->

router.put("/:id", async (req, res, next) => {
  try {
    const updateCatalog = await db.Catalog.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    return res.redirect(`${req.params.id}`);
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
    const context = { catalogItem: foundCatalog };
    res.render("show.ejs", context);
  } catch (error) {
    console.log(error);
    req.error = error;
    return next();
  }
});



module.exports = router;
