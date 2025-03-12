
// on veut revenir a l'index si on clique sur le titre
document.querySelector('#title').addEventListener('click',()=>{
    window.location.assign('./index.html')
})


function remplirPanier(){
    let itemsUL = document.querySelector('#cart-items')
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

// on la déclenche au chargement de la page
remplirPanier()

function formatDate(dateString) {
    return moment(dateString).locale('fr').format('D MMMM YYYY à HH[h]mm');
}

// pour afficher un texte basé sur la date
function dateDelai(dateSource) {
    let maintenant = moment(); // Temps actuel
    let dateDepart = moment(dateSource); // Convertir dateSource en Moment.js

    if (dateDepart.isBefore(maintenant)) {
        // Train déjà parti
        let diff = moment.duration(maintenant.diff(dateDepart));
        return `Gone ${diff.hours()} hours & ${diff.minutes()} min. before`;
    } else {
        // Train dans le futur
        let diff = moment.duration(dateDepart.diff(maintenant));
        return `Departure in ${diff.hours()} hours & ${diff.minutes()} mins.`;
    }
}
