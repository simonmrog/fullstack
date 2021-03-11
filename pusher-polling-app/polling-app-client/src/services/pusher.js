import Pusher from "pusher-js";

Pusher.logToConsole = true;

const pusherKey = process.env.REACT_APP_PUSHER_KEY;

const pusher = new Pusher(pusherKey, {
  cluster: "us2",
  encrypted: true
});

export default pusher;