//GMA HOME

const express = require("express");
const Discord = require("discord.js");
const fetch = require("node-fetch");
const path = require("path");

const gslib = require("./lib/lbupdate");

var app = express();

app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "pages/home.html"));
});

app.get("/trials", function (req, res) {
  res.sendFile(path.join(__dirname, "pages/trials.html"));
});

app.get("/update", async function (req, res) {

    const now = Date.now()


  await gslib.update();

  res.cookie("update", "true")
  res.cookie("start", now)
  res.redirect("/")
});


app.get("/db", function (req, res) {
  res.sendFile(path.join(__dirname, "/dbs/db.json"));
});

app.get("/trialinput", function (req, res) {

  const trial = req.query.trial

  res.cookie("data", JSON.stringify(gslib.getTrial(trial)))
  res.redirect("/trial")
});

app.get("/trial", function (req, res) {
  res.sendFile(path.join(__dirname, "/pages/trial.html"));
});


app.listen(3001, () => {
  console.log("Website hosted on port 3001");
});
