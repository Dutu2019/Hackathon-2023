const db = require("./db");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://172.29.1.18:3000"],
  })
);
app.use(
  expressSession({
    key: "session",
    secret: "Hackathon2023",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;

    const QUERY = `SELECT * from accounts where email='${email}'`;
    db.query(QUERY, (err, result) => {
      if (err) {
        res.sendStatus(500);
        console.log(err);
      } else {
        if (result.length) {
          result.forEach((result) => {
            bcrypt.compare(password, result.password).then((value) => {
              if (value) {
                req.session.isAuth = true;
                req.session.user = {
                  firstName: result.firstName,
                  lastName: result.lastName,
                  username: result.username,
                  email: result.email,
                };
                res.status(200).send({
                  firstName: result.firstName,
                  lastName: result.lastName,
                  username: result.username,
                  email: result.email,
                  auth: true,
                });
              } else res.status(401).send("Incorrect password");
            });
          });
        } else res.status(401).send("Incorrect email");
      }
    });
  } else res.status(400).send("Please fill all the fields");
});

app.post("/sign-up", async (req, res) => {
  if (
    req.body.firstName &&
    req.body.lastName &&
    req.body.username &&
    req.body.email &&
    req.body.password
  ) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const QUERY =
        "insert into accounts(firstName, lastName, username, email, password) values (?, ?, ?, ?, ?)";
      db.query(
        QUERY,
        [
          req.body.firstName,
          req.body.lastName,
          req.body.username,
          req.body.email,
          hashedPassword,
        ],
        (err, result) => {
          if (err) {
            res.status(409).send("Email already exists");
          } else res.status(200).send("Account successfully created");
        }
      );
    } catch (e) {
      res.status(500).send("Server error");
    }
  } else res.status(400).send("Please fill all the fields");
});

app.get("/getSessionInfo", (req, res) => {
  if (req.session.user) {
    res.send({
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      username: req.session.user.username,
      email: req.session.user.email,
      auth: true,
    });
  } else {
    res.sendStatus(204);
  }
});

app.get("/messages", (req, res) => {
  if (req.session.user) {
    let QUERY = "select * from messages";
    db.query(QUERY, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).send(result);
      }
    });
  }
});

app.post("/postMessages", (req, res) => {
  if (req.session.user) {
    const message = req.body.message;
    let QUERY = "insert into messages(user, message) values (?, ?)";
    db.query(QUERY, [req.session.user.username, message], (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

app.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.clearCookie("session");
        res.sendStatus(200);
      }
    });
  }
});

app.listen(3001, "172.29.1.18", () => {
  console.log("Server listening");
});
