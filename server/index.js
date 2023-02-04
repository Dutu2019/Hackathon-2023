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
    origin: ["http://localhost:3000", "http://10.2.10.51:3000"],
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

app.get("/getPosition", (req, res) => {
  if (!req.session.position) {
    let position = [
      { id: 1, name: "rook", color: "W", tile: "A1" },
      { id: 2, name: "rook", color: "W", tile: "H1" },
      { id: 3, name: "knight", color: "W", tile: "B1" },
      { id: 4, name: "knight", color: "W", tile: "G1" },
      { id: 5, name: "bishop", color: "W", tile: "C1" },
      { id: 6, name: "bishop", color: "W", tile: "F1" },
      { id: 7, name: "king", color: "W", tile: "D1" },
      { id: 8, name: "queen", color: "W", tile: "E1" },
      { id: 9, name: "pawn", color: "W", tile: "A2" },
      { id: 10, name: "pawn", color: "W", tile: "B2" },
      { id: 11, name: "pawn", color: "W", tile: "C2" },
      { id: 12, name: "pawn", color: "W", tile: "D2" },
      { id: 13, name: "pawn", color: "W", tile: "E2" },
      { id: 14, name: "pawn", color: "W", tile: "F2" },
      { id: 15, name: "pawn", color: "W", tile: "G2" },
      { id: 16, name: "pawn", color: "W", tile: "H2" },
      { id: 17, name: "rook", color: "B", tile: "A8" },
      { id: 18, name: "rook", color: "B", tile: "H8" },
      { id: 19, name: "knight", color: "B", tile: "B8" },
      { id: 20, name: "knight", color: "B", tile: "G8" },
      { id: 21, name: "bishop", color: "B", tile: "C8" },
      { id: 22, name: "bishop", color: "B", tile: "F8" },
      { id: 23, name: "king", color: "B", tile: "D8" },
      { id: 24, name: "queen", color: "B", tile: "E8" },
      { id: 25, name: "pawn", color: "B", tile: "A7" },
      { id: 26, name: "pawn", color: "B", tile: "B7" },
      { id: 27, name: "pawn", color: "B", tile: "C7" },
      { id: 28, name: "pawn", color: "B", tile: "D7" },
      { id: 29, name: "pawn", color: "B", tile: "E7" },
      { id: 30, name: "pawn", color: "B", tile: "F7" },
      { id: 31, name: "pawn", color: "B", tile: "G7" },
      { id: 32, name: "pawn", color: "B", tile: "H7" },
    ];
    req.session.position = position;
    res.status(200).send(position);
  } else {
    res.status(200).send(req.session.position);
  }
});

app.listen(3001, "10.2.10.51", () => {
  console.log("Server listening");
});
