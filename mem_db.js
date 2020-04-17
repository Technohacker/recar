module.exports = {
    races: {},
    sockets: {},
    addNewRace(code) {
        if (!code || this.races[code]) {
            return false;
        }
        this.races[code] = {
            players: [],
            playing: false,
            track: "",
            tracksReady: 0,
            playersReady: 0,
            readySetGo: 0,
            finished: []
        };
        this.sockets[code] = [];
        return true;
    },
    addPlayerToRace(code, id, agent, scrn, socket) {
        if (!this.races[code]) {
            return false;
        }
        this.races[code].players.push({
            id,
            agent,
            scrn,
            color: this.races[code].players.length,
            name: "NEW"
        });
        this.sockets[code].push(socket);
        return true;
    },
    editPlayerName(code, player, name) {
        if (!this.races[code]) {
            return false;
        }
        this.races[code].players[player].name = name;
        return true;
    },
    setRaceTrack(code, track) {
        if (!this.races[code]) {
            return false;
        }
        this.races[code].track = track;
        return true;
    },
    incrementTrackReady(code) {
        if (!this.races[code]) {
            return false;
        }
        this.races[code].tracksReady += 1;
        return true;
    },
    incrementPlayerReady(code) {
        if (!this.races[code]) {
            return false;
        }
        this.races[code].playersReady += 1;
        return true;
    },
    incrementReadySetGo(code) {
        if (!this.races[code]) {
            return false;
        }
        this.races[code].readySetGo += 1;
        return true;
    },
    markFinished(code, player, lap_time, color) {
        if (!this.races[code]) {
            return false;
        }
        this.races[code].finished.push({
            player,
            lap_time,
            color
        });
        return true;
    },
    getRace(code) {
        return this.races[code];
    },
    getRaceSockets(code) {
        return this.sockets[code];
    },
    resetRace(code) {
        if (!this.races[code]) {
            return false;
        }
        this.races[code].track = "";
        this.races[code].tracksReady = 0;
        this.races[code].playersReady = 0;
        this.races[code].readySetGo = 0;
        this.races[code].finished = [];
        return true;
    }
}