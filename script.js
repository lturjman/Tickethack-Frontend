
// fetch("http://localhost:3000/api/message")
//   .then((response) => response.json())
//   .then((data) => console.log(data.message))
//   .catch((error) => console.error("Erreur :", error));


  // appel de la route trip pour récupérer la liste des trips
 /* document.querySelector('#search-button').addEventListener('click', () => {
    fetch("http://localhost:3000/trips/search", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        departure: document.querySelector('#departure').value,
        arrival: document.querySelector('#arrival').value
      })
    })
    .then(response => response.json())
    .then(data => {
      listeHoraires(data);
    })
    .catch(error => {
      console.error('Erreur :', error);
    });
  });*/

  const dataRecup =[
    {"_id":"10","departure":"Lyon","arrival":"Bruxelles","date":{"$date":"2025-03-11T12:04:49.884Z"},"price":57},
    {"_id":"11","departure":"Bruxelles","arrival":"Paris","date":{"$date":"2025-03-11T12:10:34.257Z"},"price":140},
    {"_id":"12","departure":"Marseille","arrival":"Lyon","date":{"$date":"2025-03-11T12:48:08.556Z"},"price":58},
    {"_id":"13","departure":"Bruxelles","arrival":"Lyon","date":{"$date":"2025-03-11T12:53:57.862Z"},"price":117},
    {"_id":"14","departure":"Paris","arrival":"Bruxelles","date":{"$date":"2025-03-11T12:58:04.974Z"},"price":92}
  ]

  document.querySelector('#search-button').addEventListener('click', () => {
    

    //listeHoraires(dataRecup);
    //return;

    const departure = document.querySelector('#departure').value;
    const arrival = document.querySelector('#arrival').value;
    const date = document.querySelector('#trip-date').value;
  
    if (!departure || !arrival || !date) {
      console.error("Tous les champs doivent être renseignés.");
      return;
    }
  
    // Construction manuelle de la query string avec encodage
    // localhost:3000/trips/search?departure=Paris&arrival=bruxelles&date=2025-03-11
    const queryString = `?departure=${encodeURIComponent(departure)}&arrival=${encodeURIComponent(arrival)}&date=${encodeURIComponent(date)}`;
    const url = `http://localhost:3000/trips/search${queryString}`;
    
    fetch(url, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          console.log("Erreur1")
          throw new Error("Erreur lors de la récupération des données");

        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        listeHoraires(data);
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  });
  
  

function listeHoraires(data) {
  let sHTML = ''

  for (let i = 0; i < data.trips.length; i++) {
    // on crée une ligne de liste, avec un intitulé, un bouton, et un id de dataset 
    sHTML += `<li id="trip-${data[i]._id}">
  ${data.trips[i].departure} > ${data.trips[i].arrival} à ${getHoursAndMinutes(data.trips[i].date)} : 
  <span class="price">${data[i].price} €</span>
  <button class="book-btn" data-id="${data[i]._id}">Book</button>
</li>`;

  }
  document.querySelector('#results').innerHTML = sHTML
  

  console.log(data);
}

function getHoursAndMinutes(dateInput) {
  // Si la date est dans un objet avec la clé "$date", on l'extrait
  const dateStr = (dateInput && typeof dateInput === 'object' && dateInput.$date)
    ? dateInput.$date
    : dateInput;
  
  const dateObj = new Date(dateStr);
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}


document.querySelector('#results').addEventListener('click', function(event) {
  // Vérifier si l'élément cliqué est un bouton avec la classe "book-btn"
  if (event.target.matches('.book-btn')) {
    const tripId = event.target.dataset.id;
    console.log("Réserver le trajet avec l'id :", tripId);
    // Placez ici la logique pour traiter la réservation
  }
});

