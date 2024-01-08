import dotenv from "dotenv";
dotenv.config();

// Express app
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// Utilities
import fs from "fs";
import path from "path";

// HTTP libraries
import http from "http";
import bodyParser from "body-parser";
const HTTPServer = http.createServer(app);

// Database
import db from "./db.js";

// HTTP Middleware
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "http://10.2.10.51:3000",
      "http://24.105.118.62:3000",
      "http://server.queteck.com:3000",
    ],
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

import { router } from "./AuthServer.js";
app.use("/", router);

// HTTP Routes
app.get("/", (req, res) => {
  res.send("Hello this is backend :)");
});

app.get("/messages", (req, res) => {
  if (req.user) {
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
  if (req.user) {
    const message = req.body.message;
    let QUERY = "insert into messages(user, message) values (?, ?)";
    db.query(QUERY, [req.user.username, message], (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else res.sendStatus(200);
    });
  } else res.sendStatus(401);
});

app.get("/getPosition", (req, res) => {
  if (req.session.user) {
    if (!req.session.position) {
      let position = [
        { id: 1, name: "rook", color: "W", tile: "A1" },
        { id: 2, name: "rook", color: "W", tile: "H1" },
        { id: 3, name: "knight", color: "W", tile: "B1" },
        { id: 4, name: "knight", color: "W", tile: "G1" },
        { id: 5, name: "bishop", color: "W", tile: "C1" },
        { id: 6, name: "bishop", color: "W", tile: "F1" },
        { id: 7, name: "king", color: "W", tile: "E1" },
        { id: 8, name: "queen", color: "W", tile: "D1" },
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
        { id: 23, name: "king", color: "B", tile: "E8" },
        { id: 24, name: "queen", color: "B", tile: "D8" },
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
    }
    res.status(200).send(req.session.position);
  } else {
    res.sendStatus(401);
  }
});

app.post("/checkMove", (req, res) => {
  if (req.session.user) {
    if (req.session.position) {
      const move = req.body.move;
      const position = req.session.position;

      let draggedPiece = position.forEach((piece) => {
        return piece.id == move.pieceId;
      });
      let tilePiece = position.forEach((piece) => {
        return (piece.tile = move.tileId);
      });
      console.log(draggedPiece, tilePiece);
      position.map((piece, index) => {
        if (piece.tile == move.tileId && piece.id != move.pieceId) {
          position.splice(index, 1);
        }
        if (piece.id == move.pieceId) {
          piece.tile = move.tileId;
        }
      });
      req.session.position = position;
    }
    res.status(200).send(req.session.position);
  } else {
    res.sendStatus(401);
  }
});

// Socket routes
import socket from "./socketio.js";
socket(HTTPServer);

HTTPServer.listen(3001, "10.2.10.51", () => {
  console.log("Server listening");
});