import Pusher from "pusher";

import config from "../config.js";

const pusher = new Pusher({
  appId: config.pusherAppId,
  key: config.pusherKey,
  secret: config.pusherSecret,
  cluster: "us2",
  useTLS: true
});


export default pusher;