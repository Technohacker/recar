const https = require("https");
const { readFileSync } = require("fs");

const config = require("./config.json");

const api = require("./api_server")();

const server = https.createServer({
    cert: readFileSync("./ssl/server.cert"),
    key: readFileSync("./ssl/server.key")
}, api);

const mem = require("./mem_db");
const wss = require("./ws_server")(server, mem);

server.listen(config.server_port, () => console.log(`Racer server listening on https://${config.server_ip}:${config.server_port}`));
