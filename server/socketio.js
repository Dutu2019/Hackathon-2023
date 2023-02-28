function socket(HTTPSServer, session) {
  // Sockets
  const io = require("socket.io")(HTTPSServer, {
    cors: {
      credentials: true,
      origin: ["http://10.2.10.51:3000", "https://server.queteck.com:3000"],
    },
  });

  // io Middleware
  const socketSession = require("express-socket.io-session");
  const sharedSession = socketSession(session, { autoSave: true });
  io.use(sharedSession);

  // Waiting list
  let waitingList = [];
  // io Paths

  io.on("connection", (socket) => {
    console.log("io connection with", socket.id, socket.handshake.address);
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
      io.emit("updatePos", position);
    });
  });
}
module.exports = { socket };
