document.addEventListener ("DOMContentLoaded", (event) => {

  const button = document.querySelector ("#run-button");
  const apiContent = document.querySelector ("#api-content");

  button.addEventListener ("click", () => {
    const apiUrl = "http://0.0.0.0:5000/api/hello";

    let response = fetch (apiUrl)
    .then ((response) => response.json ())
    .then ((object) => apiContent.innerHTML = object.data)
    .catch ((err) => console.log (err));
  });

});