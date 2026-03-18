import { Server } from "socket.io"


let connections = {}
let messages = {}
let timeOnline = {}
let roomUsers = {}
let roomMediaStates = {}

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });


    io.on("connection", (socket) => {

        console.log("SOMETHING CONNECTED")

        socket.on("join-call", (path, username) => {

            if (connections[path] === undefined) {
                connections[path] = []
            }
            connections[path].push(socket.id)

            if (roomUsers[path] === undefined) {
                roomUsers[path] = {}
            }
            roomUsers[path][socket.id] = username || "Guest"

            if (roomMediaStates[path] === undefined) {
                roomMediaStates[path] = {}
            }
            if (roomMediaStates[path][socket.id] === undefined) {
                roomMediaStates[path][socket.id] = { video: true, audio: true }
            }

            timeOnline[socket.id] = new Date();

            // connections[path].forEach(elem => {
            //     io.to(elem)
            // })

            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path], roomUsers[path], roomMediaStates[path])
            }

            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            }

        })

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender) => {

            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {


                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }

        })

        socket.on("media-state", (state) => {
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {
                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                }, ["", false]);

            if (found === true) {
                if (roomMediaStates[matchingRoom] === undefined) {
                    roomMediaStates[matchingRoom] = {}
                }
                roomMediaStates[matchingRoom][socket.id] = {
                    video: !!state?.video,
                    audio: !!state?.audio
                };

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("media-state", socket.id, roomMediaStates[matchingRoom][socket.id]);
                })
            }
        })

        socket.on("disconnect", () => {

            var diffTime = Math.abs(timeOnline[socket.id] - new Date())

            var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)


                        if (connections[key].length === 0) {
                            delete connections[key]
                            delete roomUsers[key]
                            delete roomMediaStates[key]
                        } else if (roomUsers[key] !== undefined) {
                            delete roomUsers[key][socket.id]
                            if (roomMediaStates[key] !== undefined) {
                                delete roomMediaStates[key][socket.id]
                            }
                        }
                    }
                }

            }


        })


    })


    return io;
}
