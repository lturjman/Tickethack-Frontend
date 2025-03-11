fetch("http://localhost:3000/api/message")
  .then((response) => response.json())
  .then((data) => console.log(data.message))
  .catch((error) => console.error("Erreur :", error));

  