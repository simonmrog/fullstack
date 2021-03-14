import webPush from "../services/webPush.js";
import express from "express";
const { Router } = express;

import WebPushController from "../controllers/webPush.js";

const pushRouter = Router();

pushRouter.post("/subscription", WebPushController.subscribeUser.bind(WebPushController));
pushRouter.post("/push_notification", WebPushController.pushNotification.bind(WebPushController));

export default pushRouter
