const express = require("express");
const app = express();
const port = process.env.PORT || 3409;
const story = require("./story.json");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

app.get("/", (req, res) => {
  res.render("home", { home: story.home });
});

app.get("/forward1", (req, res) => {
  res.render("forward1", { forward1: story.forward1 });
});

app.get("/forward2/:item", (req, res) => {
  res.render("forward2", { forward2: story.forward2, item: req.params.item });
});

app.get("/winner/:ending", (req, res) => {
  res.render("winner");
});

app.get("/loser/:ending", (req, res) => {
  res.render("loser");
});

app.get("/ultimateloser/:ending", (req, res) => {
  res.render("ultimateloser");
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
