const { Server } = require("ws");

function generateCode(){
    let random_string = '';
    let random_ascii;
    let ascii_low = 65;
    let ascii_high = 90;

    for(let i = 0; i < 5; i++) {
        random_ascii = Math.floor(Math.random() * (ascii_high - ascii_low)) + ascii_low;
        random_string += String.fromCharCode(random_ascii);
    }
    return random_string;
}

module.exports = function (server, mem) {
    const wss = new Server({
        clientTracking: true,
        server
    });

    wss.broadcast = (sockets, message) => {
        sockets.forEach(w => w.send(JSON.stringify(message)));
    }

    const requests = {
        time_sync(req) {
            return {
                _socketio_type: "time_sync_response",
                time: req.time,
                serverTime: Date.now()
            };
        },
        keep_alive(req) {
            return {
                _socketio_type: "keep_alive_response",
                time: req.time,
                serverTime: Date.now()
            };
        },
        create_game(req, ws) {
            let code = "";
            for (; !mem.addNewRace(code); code = generateCode()) {}

            mem.addPlayerToRace(code, req.id, req.agent, req.scrn, ws);

            let race = mem.getRace(code);
            let sockets = mem.getRaceSockets(code);

            wss.broadcast(sockets, {
                _socketio_type: "join_game_update",
                players: race.players
            });

            return {
                _socketio_type: "create_game_response",
                code
            };
        },
        join_game(req, ws) {
            let race = mem.getRace(req.code);

            if (race) {
                mem.addPlayerToRace(req.code, req.id, req.agent, req.scrn, ws);

                race = mem.getRace(req.code);
                let sockets = mem.getRaceSockets(req.code);                

                wss.broadcast(sockets, {
                    _socketio_type: "join_game_update",
                    players: race.players
                });

                race._socketio_type = "join_game_response";
                race.success = true;
                race.playing = false;
                return race;
            }
            return {
                _socketio_type: "join_game_response",
                success: false,
                code: req.code
            };
        },
        exit_lobby(req) {
            let race = mem.getRace(req.code);
            if (race) {
                // Remove
            }
            return {
                _socketio_type: "force_restart_all"
            };
        },
        edit_player(req) {
            mem.editPlayerName(req.code, req.player, req.name);

            let race = mem.getRace(req.code);
            let sockets = mem.getRaceSockets(req.code);

            wss.broadcast(sockets, {
                _socketio_type: "join_game_update",
                players: race.players
            });

            return {};
        },
        sound_update(req) {
            req._socketio_type = "sound_update_received";
            req.serverTime = Date.now();
            req.startTime = req.startTime || Date.now();

            let sockets = mem.getRaceSockets(req.code) || [];

            wss.broadcast(sockets, req);
            return {};
        },
        start_game(req) {
            mem.resetRace(req.code);

            mem.setRaceTrack(req.code, req.track);
            let sockets = mem.getRaceSockets(req.code);

            wss.broadcast(sockets, {
                _socketio_type: "game_starting",
                track: req.track
            });
            return {};
        },
        track_ready(req) {
            mem.incrementTrackReady(req.code);
            let race = mem.getRace(req.code);
            let sockets = mem.getRaceSockets(req.code);

            if (race.tracksReady == race.players.length) {
                wss.broadcast(sockets, {
                    _socketio_type: "all_tracks_ready",
                    serverTime: Date.now()
                });
            }
            return {};
        },
        player_ready(req) {
            mem.incrementPlayerReady(req.code);
            let race = mem.getRace(req.code);
            let sockets = mem.getRaceSockets(req.code);

            if (race.playersReady == race.players.length) {
                wss.broadcast(sockets, {
                    _socketio_type: "match_ready",
                    serverTime: Date.now()
                });
            }
            return {};
        },
        ready_set_go(req) {
            mem.incrementReadySetGo(req.code);
            let race = mem.getRace(req.code);
            let sockets = mem.getRaceSockets(req.code);

            if (race.readySetGo == race.players.length) {                
                wss.broadcast(sockets, {
                    _socketio_type: "ready_set_go_begin",
                    serverTime: Date.now()
                });
            }
            return {};
        },
        match_update(req) {
            req._socketio_type = "match_update_received";
            req.serverTime = Date.now();

            let race = mem.getRace(req.code);
            let sockets = mem.getRaceSockets(req.code);
            switch (req._type) {
                case "get_lobby_positions":
                    if (race.finished.length === race.players.length) {
                        wss.broadcast(sockets, {
                            _socketio_type: "match_update_received",
                            _type: "send_lobby_positions",
                            serverTime: Date.now(),
                            positions: race.finished
                        });
                    } else {
                        wss.broadcast(sockets, {
                            _socketio_type: "match_update_received",
                            _type: "send_lobby_positions",
                            serverTime: Date.now()
                        });
                    }
                    return {};
                }
            wss.broadcast(sockets, req);
            return {};
        },
        player_finished(req) {
            mem.markFinished(req.code, req.player, req.lap_time, req.color);
            let race = mem.getRace(req.code);
            let sockets = mem.getRaceSockets(req.code);

            if (race.finished.length === race.players.length) {
                wss.broadcast(sockets, {
                    _socketio_type: "player_finished_response",
                    serverTime: Date.now(),
                    finished: race.finished,
                    complete: true
                });
                wss.broadcast(sockets, {
                    _socketio_type: "game_ended",
                    disconnect: false
                });
                wss.broadcast(sockets, {
                    _socketio_type: "match_update_received",
                    _type: "send_lobby_positions",
                    serverTime: Date.now(),
                    positions: race.finished
                });
            } else {
                wss.broadcast(sockets, {
                    _socketio_type: "player_finished_response",
                    serverTime: Date.now(),
                    finished: race.finished,
                    complete: false
                });
            }
            return {};
        }
    };

    wss.on("connection", ws => {
        console.log("Connected");
    
        ws.on("message", message => {
            let req = JSON.parse(message);
            if (req._socketio_type !== "time_sync" && req._socketio_type !== "keep_alive") {
                console.log("received: %s", message);
            }

            if (requests[req._socketio_type]) {
                let res = requests[req._socketio_type](req, ws);
                ws.send(JSON.stringify(res));
            }
        });
    });

    return wss;
}
