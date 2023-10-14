const express = require("express");
const router = express.Router();

// Database
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.use(authToken);

router.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;

    try {
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
                  const token = jwt.sign(
                    {
                      firstName: result.firstName,
                      lastName: result.lastName,
                      username: result.username,
                      email: result.email,
                      auth: true,
                    },
                    process.env.JWT_SECRET
                  );
                  res.cookie("jwt", token);
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
    } catch (err) {
      res.sendStatus(500);
    }
  } else res.status(400).send("Please fill all the fields");
});

router.post("/sign-up", async (req, res) => {
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

router.get("/logout", (req, res) => {
  console.log("Yes1");
  if (req.user) {
    console.log("yes");
    res.clearCookie("jwt");
  }
  res.sendStatus(200);
});

router.get("/getSessionInfo", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.sendStatus(204);
  }
});

function authToken(req, res, next) {
  if (req.cookies.jwt) {
    jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.send(err);
      req.user = user;
    });
  }
  next();
}

module.exports = router;
