import CONFIG from './config.js';

// on veut revenir a l'index si on clique sur le titre
document.querySelector('#title').addEventListener('click',()=>{
    window.location.assign('./index.html')
})

/*
function remplirPanier(){
    let itemsUL = document.querySelector('#booking-items')
    itemsUL.innerHTML = ''

    fetch('http://localhost:3000/bookings').then(data=>data.json()).then(books=>{
        itemsUL.innerHTML = ''   
    
        for(let i=0;i<books.length;i++){     
            // on extrait le trip en cours
            let curbook = books[i].trip

            console.log("le trip en cours est :",i,curbook)
            
            let curLI = `<li>
          <span>${curbook.departure} &gt; ${curbook.arrival}</span>
          <span>Départ le ${dateDelai(curbook.date)}</span>
          <span>${curbook.price} €</span>
        </li>`
        itemsUL.innerHTML += curLI
        }
    }
    )
}
*/

function remplirBookings(){
    let itemsUL = document.querySelector('#booking-items'); // Assurez-vous que l'ID est correct
    itemsUL.innerHTML = '';

    fetch(`${CONFIG.API_BASE_URL}/bookings`)
    .then(response => response.json())
    .then(books => {
        console.log("Données reçues :", books);
        itemsUL.innerHTML = '';   

        books.forEach(book => {
            let curbook = book.trip; // L'objet trip
            console.log("Le trip en cours est :", curbook);

            let curLI = `<li>
                <img src="./images/train.png" width=32 height=32>
                <span> ${curbook.departure} &gt; ${curbook.arrival}</span>
                <span>${getTrainHour(curbook.date)}</span>
                <span>${dateDelai(curbook.date)}</span>
                <span>${curbook.price} €</span>
            </li>`;

            itemsUL.innerHTML += curLI;
        });
    })
    .catch(error => console.error("Erreur lors de la récupération des bookings :", error));
}

// on la déclenche au chargement de la page
remplirBookings()

function formatDate(dateString) {
    return moment(dateString).locale('fr').format('D MMMM YYYY à HH[h]mm');
}

function getTrainHour(dateString) {
    return moment(dateString).locale('fr').format('HH[h]mm');
}


// pour afficher un texte basé sur la date
function dateDelai(dateSource) {
    let maintenant = moment(); // Temps actuel
    let dateDepart = moment(dateSource); // Convertir dateSource en Moment.js

    if (dateDepart.isBefore(maintenant)) {
        // Train déjà parti
        let diff = moment.duration(maintenant.diff(dateDepart));
        return `Gone ${diff.hours()} hours and ${diff.minutes()} min before`;
    } else {
        // Train dans le futur
        let diff = moment.duration(dateDepart.diff(maintenant));
        return `Departure in ${diff.hours()} hours and ${diff.minutes()} min`;
    }
}
