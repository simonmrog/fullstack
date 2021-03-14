import webpush from "web-push";

import config from "../config.js";

webpush.setVapidDetails(
  "mailto:simonmrog@gmail.com",
  config.PUBLIC_VAPID_KEY,
  config.PRIVATE_VAPID_KEY
);

export default webpush;
