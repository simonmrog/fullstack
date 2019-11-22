document.addEventListener ("DOMContentLoaded", () => {

  const appButton = document.querySelector ("#app-button");
  const result = document.querySelector ("#result");

  const getRequest = async (url) => {
    req = "x=1&y=0"
    url = url + req;
    let response = await fetch ();
    let data = await response.json ();
    return (data);
  }

  appButton.addEventListener ("click", async () => {
    const apiURL = "http://localhost:5000/api/app/";

    getRequest (apiURL)
    .then ((file) => {
      console.log (file)
      result.innerHTML = file;
      console.log ("Sucessful Request");
    });
  });

});