import CONFIG from './config.js';


document.addEventListener("DOMContentLoaded", function() {
  let today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
  document.getElementById("trip-date").value = today; // Définit la date par défaut
});


  document.querySelector('#search-button').addEventListener('click', () => {
    
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
    console.log("on search sur : " + `${CONFIG.API_BASE_URL}/trips/search${queryString}`)
    const url = `${CONFIG.API_BASE_URL}/trips/search${queryString}`;
    
    fetch(url, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          console.log("Erreur1")
          throw new Error("Erreur lors de la récupération des données");

        }
        return response.json();
      })
      .then(data => {
        if(data.trips.length > 0){
          listeHoraires(data.trips);
          document.querySelector('#picto').src = './images/train.png';
          document.querySelector('#picto-text').textContent = "It's time to book your..."
            // on a des résutlats à afficher alors on réaffiche le bloc
            document.querySelector('#results-block').style.display='flex';
            // et on masque le bloc central (qui contient le gros picto)
            document.querySelector('#center-block').style.display='none';
        }
        else
        {
          // on, a rien trouvé, alor on masque les résultats
          document.querySelector('#results-block').style.display='none';
          // et on réaffiche le bloc central (qui contient le gros picto)
          document.querySelector('#center-block').style.display='flex';

          document.querySelector('#picto').src = './images/notfound.png';
          document.querySelector('#picto-text').textContent = "No trip found."

        }
      })
      .catch(error => {
        console.error('Erreur :', error);
      });
  });
  
function listeHoraires(trips) {
  let sHTML = ''

  for (let i = 0; i < trips.length; i++) {
    // on crée une ligne de liste, avec un intitulé, un bouton, et un id de dataset 
    sHTML += `<li id="trip-${trips[i]._id}">
  ${trips[i].departure} > ${trips[i].arrival} à ${getHoursAndMinutes(trips[i].date)} : 
  <span class="price">${trips[i].price} €</span>
  <button class="book-btn" data-id="${trips[i]._id}">✚ Book </button>
</li>`;

  }
  document.querySelector('#results').innerHTML = sHTML
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

    // Effectuer la requête fetch avec la bonne syntaxe
    fetch(`${CONFIG.API_BASE_URL}/carts/add/${tripId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors de la réservation du trajet");
      }
      window.location.assign("./cart.html")
      return response.json();
      
    })
    .then(data => {
      console.log("Réponse du serveur :", data);
    })
    .catch(error => {
      console.error("Erreur :", error);
    });
  }
});



