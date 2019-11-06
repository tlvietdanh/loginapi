const uuidv4 = require('uuid/v4');

function deleteArrayItem(arr, username) {
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
        element = arr[i];
        if ((element.host && element.host === username) || (element.guest && element.guest === username)) {
            index = i;
            break;
        }
    }
    if (index !== -1) {
        arr = arr.splice(0, index).concat(arr.splice(index + 1, arr.length - 1));
    }
    return arr;
}

userOnline = []
module.exports = io => {
    io.on("connection", socket => {
        console.log('connected')
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
        socket.on('FINDING_MATCH', (username) => {
            const id = uuidv4();
            const room = userOnline.filter((el) => {
                return el.guest === ''
            });
            let check = userOnline.filter((el) => {
                return (el.host === username || el.guest === username)
            });
            while (userOnline.length > 0 && check.length > 0) {
                userOnline = deleteArrayItem(userOnline, username)
                check = userOnline.filter((el) => {
                    return (el.host === username || el.guest === username)
                });
            }
            if (userOnline.length === 0 || room.length === 0 && check.length === 0) {
                userOnline.push({
                    id: id,
                    host: username,
                    guest: ''
                });
                socket.join(id);
                console.log(username + ' is finding match');
            } else if (check.length === 0) {
                room[0].guest = username
                socket.join(room[0].id);
                // sendplayer infor:
                socket.to(room[0].id).emit('SERVER_GUEST_INFO', room[0]);
                socket.emit("SERVER_GUEST_INFO", room[0]);
            }
        });
        socket.on('STOP_FINDING_MATCH', (username) => {
            userOnline = deleteArrayItem(userOnline, username);

        });

        socket.on('CLIENT_SEND_INDEX', (res) => {
            socket.to(res.Room.id).emit("SERVER_SEND_INDEX", res.index);
        });

        socket.on('CLIENT_PLAYER_QUIT_GAME', (res) => {
            userOnline = deleteArrayItem(userOnline, res.host);
            userOnline = deleteArrayItem(userOnline, res.guest);
            socket.to(res.id).emit("SERVER_PLAYER_QUIT_GAME");
        });

        socket.on("CLIENT_SEND_MESSAGE", (req) => {
            socket.to(req.Room.id).emit("SERVER_SEND_MESSAGE", req.value);
        });

        socket.on("CLIENT_ASK_FOR_TIE_GAME", (req) => {
            socket.to(req.id).emit("SERVER_ASK_FOR_TIE_GAME");
        })
        socket.on("CLIENT_SURRENDER", (req) => {
            socket.to(req.id).emit("SERVER_SURRENDER");
        });
        socket.on("CLIENT_ASK_UNDO", (req) => {
            socket.to(req.id).emit("SERVER_ASK_UNDO");
        });
        socket.on("CLIENT_REJECT_TIE", (req) => {
            socket.to(req.id).emit("SERVER_REJECT_TIE");
        });
        socket.on("CLIENT_REJECT_UNDO", (req) => {
            socket.to(req.id).emit("SERVER_REJECT_UNDO");
        });
        socket.on("CLIENT_ACCEPT_TIE", (req) => {
            socket.to(req.id).emit("SERVER_ACCEPT_TIE");
        });
        socket.on("CLIENT_ACCEPT_UNDO", (req) => {
            socket.to(req.id).emit("SERVER_ACCEPT_UNDO");
        });

    })
};