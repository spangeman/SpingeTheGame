import { Room, Client } from "colyseus";
import { Entity } from "./Entity";
import { State } from "./State";

interface MouseMessage {
  x: number;
  y: number;
}

export class ArenaRoom extends Room<State> {

  onCreate() {
    this.setState(new State());
    this.state.initialize();

    this.onMessage("updatePlayerPosition", (client, messageString) => {
      const message = JSON.parse(messageString)
      const entity = this.state.entities.get(client.sessionId);

      // skip dead players
      if (!entity) {
        //console.log("DEAD PLAYER ACTING...");
        return;
      }

      entity.y = message.y;
      entity.x = message.x;

      // console.log(message, { speed: entity.speed, angle: entity.angle });
    });
    
    
    this.onMessage("login", (client, messageString) => {
      const message = JSON.parse(messageString)
      const entity = this.state.entities.get(client.sessionId);

      // skip dead players
      if (!entity) {
        //console.log("DEAD PLAYER ACTING...");
        return;
      }

      entity.username = message.username;

      if(entity.username === "spange") {
        entity.colourr = 220;
        entity.colourg = 20;
        entity.colourb = 60;
      }
      else {
        entity.colourr = 25;
        entity.colourg = 25;
        entity.colourb = 112;
      }



      console.log("Logging in " + entity.username);

      // console.log(message, { speed: entity.speed, angle: entity.angle });
    });
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "JOINED");
    this.state.createPlayer(client.sessionId);
  }

  onLeave(client: Client) {
    console.log(client.sessionId, "LEFT!");
    const entity = this.state.entities[client.sessionId];

    // entity may be already dead.
    if (entity) { entity.dead = true; }
  }

}