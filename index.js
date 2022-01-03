const express = require("express");
const app = express();
const session = require("express-session");
const morgan = require("morgan");
const port = process.env.PORT || 3409;
const story = require("./story.json");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "random string",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

const valid_users = [
  { username: "nmuta", password: "nmuta" },
  { username: "hayden", password: "hayden" },
  { username: "cooper", password: "cooper" },
];

app.get("/", (req, res) => {
  let badLogin = false;
  if (req.query.reason == "invalid_login") {
    badLogin = true;
  }
  res.render("index", { username: req.session.username, badLogin: badLogin });
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  userValid = valid_users.find((user) => {
    return user.username == username && user.password == password;
  });
  if (userValid) {
    req.session.username = req.body.username;
    req.session.password = req.body.password;
    res.redirect("/home");
  } else {
    req.session.destroy(() => {});
    res.redirect("/?reason=invalid_login");
  }
});

app.get("/home", (req, res) => {
  const username = req.session.username;
  const password = req.session.password;
  userValid = valid_users.find((user) => {
    return user.username == username && user.password == password;
  });
  if (userValid) {
    res.render("home", { home: story.home, username: req.session.username });
  } else {
    res.redirect("/?reason=invalid_login");
  }
});

app.get("/forward1", (req, res) => {
  const username = req.session.username;
  const password = req.session.password;
  userValid = valid_users.find((user) => {
    return user.username == username && user.password == password;
  });
  if (userValid) {
    res.render("forward1", {
      forward1: story.forward1,
      username: req.session.username,
    });
  } else {
    res.redirect("/?reason=invalid_login");
  }
});

app.get("/forward2/:item", (req, res) => {
  const username = req.session.username;
  const password = req.session.password;
  userValid = valid_users.find((user) => {
    return user.username == username && user.password == password;
  });
  if (userValid) {
    res.render("forward2", {
      forward2: story.forward2,
      item: req.params.item,
      username: req.session.username,
    });
  } else {
    res.redirect("/?reason=invalid_login");
  }
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
