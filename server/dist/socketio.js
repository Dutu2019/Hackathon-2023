// Random byte generator
import crypto from "crypto";
import { Server } from "socket.io";
export default function socket(HTTPSServer) {
    // Sockets
    const io = new Server(HTTPSServer, {
        cors: {
            credentials: true,
            origin: [
                "http://localhost:3000",
                "http://10.2.10.51:3000",
                "http://24.105.118.62:3000",
                "http://server.queteck.com:3000",
            ],
        },
    });
    // Waiting list
    let waitingList = [];
    // Active games
    let gameRooms = [];
    // Socketio cookie
    // session: {
    //   user: {name, lastName, username, email, isAuth},
    //   isPlaying,
    //   currGame: room
    // }
    let session;
    // io Paths
    io.on("connection", (socket) => {
        console.log("io connection with", socket.id, socket.handshake.address);
        // On user disconnect
        socket.on("disconnect", () => {
            console.log(`${socket.id} has disconnected`);
            if (waitingList.includes(socket))
                waitingList = [];
        });
        // User clickes on play
        socket.on("play", () => {
            // Checks if someone is in waiting room
            if (waitingList.length != 0) {
                // Pairs users in rooms
                let room = crypto.randomBytes(20).toString("hex");
                gameRooms.push(room);
                waitingList[0].join(room);
                socket.join(room);
                io.to(room).emit("match found");
                waitingList = [];
            }
            else {
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
            });
        });
    });
    // Set/change cookie
    io.engine.on("headers", (headers, req) => { });
}
//# sourceMappingURL=socketio.js.map