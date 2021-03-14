import webpush from "../services/webPush.js";

class WebPushController {
  pushSubscription = null;

  async subscribeUser(req, res) {
    try {
      this.pushSubscription = req.body;
      res.status(200).json({ status: "ok", detail: "Subscribed successfully" });
    } catch (err) {
      console.log("[ERROR]", err.message);
      res.status(500).json({
        status: "error",
        detail: err.message
      });
    }
  }

  async pushNotification(req, res) {
    try {
      const payload = JSON.stringify({
        title: "My notification",
        message: "Hello World"
      });
      await webpush.sendNotification(this.pushSubscription, payload);
      res.status(200).json({ status: "ok", detail: "Notification sent" });
    } catch (err) {
      console.log("[ERROR]", err.message);
      res.status(500).json({ status: "error", detail: err.message });
    }
  }
}

const controller = new WebPushController();
console.log(controller);

export default controller;
