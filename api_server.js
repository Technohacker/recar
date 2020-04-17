const express = require("express");

const config = require("./config.json");

module.exports = function () {
    const app = express();

    app.use(require("morgan")("dev"));
    app.use(require("cors")());

    // Client side
    app.use("/racer", express.static("client"));

    // Server
    app.get("/control/start", (req, res) => {
        res.send({
            gameId: 123456,
            relays: [`ws://${config.server_ip}:${config.server_port}`],
            secureRelays: [`wss://${config.server_ip}:${config.server_port}`],
        });
    });

    app.post("/control/register", (req, res) => {
        res.send({});
    });

    app.get("/control/join", (req, res) => {
        res.send({
            relay: `wss://${config.server_ip}:${config.server_port}`
        });
    });

    return app;
}