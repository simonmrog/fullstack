class Settings {
  ENVIRONMENT = process.env.ENVIRONMENT || "dev";
  PORT = process.env.PORT || 3000;
  PUBLIC_VAPID_KEY = process.env.PUBLIC_VAPID_KEY;
  PRIVATE_VAPID_KEY = process.env.PRIVATE_VAPID_KEY;
}

export default new Settings();
