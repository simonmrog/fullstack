import * as PusherPushNotifications from "@pusher/push-notifications-web";

class BeamClient {
  userId = null;
  beamsClient = null;
  beamsTokenProvider = null;
  
  constructor(userId) {
    this.userId = userId;
    this.beamsClient = new PusherPushNotifications.Client({
      instanceId: process.env.REACT_APP_INSTANCE_ID
    });
    this.beamsTokenProvider = new PusherPushNotifications.TokenProvider({
      url: process.env.REACT_APP_BEAMS_AUTH_URL,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  async start() {
    try {
      await this.beamsClient.start();
      await this.beamsClient.setUserId(this.userId, this.beamsTokenProvider);
      console.log("Successfully registered and subscribed!");
    } catch (err) {
      console.error("[ERROR]", err.message);
    }
  }

  async stop() {
    try {
      await this.beamsClient.stop();
      console.log("Successfully stopped");
    } catch (err) {
      console.error("[ERROR]", err.message);
    }
  }
}

export default BeamClient;
