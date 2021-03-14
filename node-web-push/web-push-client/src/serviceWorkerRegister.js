import axios from "axios";

export default async function serviceWorkerRegister() {
  const register = await navigator.serviceWorker.register(
    `${process.env.PUBLIC_URL}/service-worker.js`,
    { scope: "/" }
  );
  console.log("Service worker registered successfully");

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.REACT_APP_PUBLIC_VAPID_KEY
  });

  await axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/subscription`,
    subscription
  );
  console.log("Subscribed successfully");
}
