function socket(HTTPSServer) {
  // Random byte generator
  const crypto = require("crypto");

  // Sockets
  const io = require("socket.io")(HTTPSServer, {
    cors: {
      credentials: true,
      origin: ["http://10.2.10.51:3000", "https://server.queteck.com:3000"],
    },
  });

  // Waiting list
  let waitingList = [];

  // io Paths
  io.on("connection", (socket) => {
    console.log("io connection with", socket.id, socket.handshake.address);
    var cookie = socket.handshake.session || socket.request.session;

    // On user disconnect
    socket.on("disconnect", () => {
      console.log(`${socket.id} has disconnected`)
      if (waitingList.includes(socket)) waitingList = [];
    });

    // User clickes on play
    socket.on("play", () => {
      // Fix cookie not updating
      console.log(cookie);

      // Checks if someone is in waiting room
      if (waitingList.length != 0) {
        // Pairs users in rooms
        let room = crypto.randomBytes(20).toString("hex");
        waitingList[0].join(room);
        waitingList[0].request.session.room = room;

        socket.join(room);
        socket.request.session.room = room;
        io.to(room).emit("match found");
        waitingList = [];
      } else {
        // Puts client in a waiting room
        waitingList.push(socket);
      }

      // Handles moves from client
      socket.on("handleMove", (position, move) => {
        let draggedPiece = position.find((piece) => {
          return piece.id == move.pieceId;
        });
        let tilePiece = position.find((piece) => {
          return piece.tile == move.tileId;
        });

        position.map((piece, index) => {
          // Checks if legal move (not done yet)
          let legalMove;
          if (piece.tile == move.tileId && piece.id != move.pieceId) {
            position.splice(index, 1);
          }

          // Executes the move
          if (piece.id == move.pieceId) {
            piece.tile = move.tileId;
          }
        });
        io.to(socket.request.session.room).emit("updatePos", position);
      });
    });
  });
}
module.exports = { socket };
