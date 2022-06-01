const express = require("express");
const { Schema } = require("mongoose");
const bread = require("../models/bread");
const breads = express.Router();
const baker = require("../models/baker.js");

// INDEX
breads.get("/", async (req, res) => {
  const foundBakers = await baker.find();
  const foundBreads = await bread.find().limit(2);
  res.render("index", {
    breads: foundBreads,
    bakers: foundBakers,
    title: "Index Page",
  });
});

// NEW
breads.get("/new", (req, res) => {
  baker.find().then((foundBakers) => {
    res.render("new", {
      bakers: foundBakers,
    });
  });
  //res.render("New");
});

// DELETE
breads.delete("/:id", (req, res) => {
  bread.findOneAndDelete(req.params.id).then((deleteBread) => {
    res.status(303).redirect("/breads");
  });
});

// SHOW
breads.get("/:id", (req, res) => {
  bread
    .findById(req.params.id)
    .then((foundBread) => {
      res.render("show", {
        bread: foundBread,
      });
    })
    .catch((err) => {
      res.send("404");
    });
});

// CREATE
breads.post("/", (req, res) => {
  if (req.body.image) {
    req.body.image = undefined;
  }
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  bread.create(req.body);
  res.redirect("/breads");
});

// UPDATE
breads.put("/:id", (req, res) => {
  if (req.body.hasGluten === "on") {
    req.body.hasGluten = true;
  } else {
    req.body.hasGluten = false;
  }
  bread
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updateBread) => {
      console.log(updateBread);
      res.redirect(`/breads/${req.params.id}`);
    });
  //bread[req.params.id] = req.body
});

// EDIT
breads.get("/:id/edit", (req, res) => {
  bread.findById(req.params.id).then((foundBread) => {
    res.render("edit", {
      bread: foundBread,
    });
  });
});

module.exports = breads;
