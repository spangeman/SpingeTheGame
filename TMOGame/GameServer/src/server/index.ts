import http from "http";
import express from "express";
import path from "path";
import basicAuth from "express-basic-auth";
import { monitor } from "@colyseus/monitor";

import { Server } from "colyseus";
import { ArenaRoom } from "./rooms/ArenaRoom";

export const port = Number(process.env.PORT || 2567);
export const endpoint = "localhost";

const app = express();
const gameServer = new Server({
  server: http.createServer(app)
});

gameServer.define("arena", ArenaRoom);

// add colyseus monitor
const auth = basicAuth({ users: { 'admin': 'admin' }, challenge: true });
app.use("/colyseus", auth, monitor());

gameServer.listen(port);
console.log(`Listening on http://${endpoint}:${port}`);
