const { Server } = require("ws");

const requests = {
    time_sync() {
        return {
            _socketio_type: "time_sync_response",
            time: Date.now()
        };
    },
    create_game(req) {
        return {
            _socketio_type: "create_game_response",
            code: "ABCDE"
        }
    },
    join_game(req) {
        return {
            _socketio_type: "join_game_response",
            code: "ABCDE"
        }
    }
};

module.exports = function (server) {
    const wss = new Server({ server });

    wss.on("connection", ws => {
        console.log("Connected");
    
        ws.on("message", message => {
            console.log("received: %s", message);
            let req = JSON.parse(message);

            if (requests[req._socketio_type]) {
                let res = requests[req._socketio_type](req);
                ws.send(JSON.stringify(res));
            }
        });
    });
}
