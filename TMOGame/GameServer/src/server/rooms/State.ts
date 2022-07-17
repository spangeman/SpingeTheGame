import { generateId } from "colyseus";
import { Schema, type, MapSchema, filterChildren } from "@colyseus/schema";

import { Entity } from "./Entity";
import { Player } from "./Player";

export class State extends Schema {


  @type({ map: Entity })
  entities = new MapSchema<Entity>();

  initialize () {

  }

  createPlayer(sessionId: string) {
    this.entities.set(sessionId, new Player().assign({
      x: 200,
      y: 200
    }));
  }

  update() {

  }
}
