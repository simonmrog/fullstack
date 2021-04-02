export default function serviceWorkerRegister() {
  const swPath = `${process.env.PUBLIC_URL}/service-worker.js`;
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register(swPath).then(registration => {
        console.log("Service worker registered");
      });
    });
  }
}
