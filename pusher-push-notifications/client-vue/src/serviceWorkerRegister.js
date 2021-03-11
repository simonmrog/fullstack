export default function serviceWorkerRegister() {
  const swPath = `${process.env.BASE_URL}service-worker.js`;

  console.log(swPath);

  if ("serviceWorker" in navigator && process.env.NODE_ENV !== "production") {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register(swPath).then(() => {
        console.log("Service worker registered");
      });
    });
  }
}
