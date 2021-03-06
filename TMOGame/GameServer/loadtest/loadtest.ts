import { Room, Client, DataChange } from "colyseus.js";

export function requestJoinOptions (this: Client, i: number) {
    return {};
}

export function onJoin(this: Room) {
    this.listen("players/" + this.sessionId, (change: DataChange) => {
        // console.log("CHANGE PLAYER", change);
        if (change.operation === "add") {


        } else if (change.operation === "remove") {
            clearTimeout(changeDirectionTimeout);
            this.leave();
        }
    }, true);

    console.log(this.sessionId, "joined.");
}

export function onMessage(this: Room, message) {
    // console.log(this.sessionId, "received:", message);
}

export function onLeave(this: Room) {
    console.log(this.sessionId, "left.");
}

export function onError(this: Room, err) {
    // console.log(this.sessionId, "!! ERROR !!", err.message);
}

export function onStateChange(this: Room, state) {
    // console.log(this.sessionId, "new state:", state);
}