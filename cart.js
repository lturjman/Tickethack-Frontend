
// on veut revenir a l'index si on clique sur le titre
document.querySelector('#title').addEventListener('click',()=>{
    window.location.assign('./index.html')
})


function remplirPanier(){
    let itemsUL = document.querySelector('#cart-items')
    itemsUL.innerHTML = ''

    fetch('http://localhost:3000/carts').then(data=>data.json()).then(cartitems=>{
        itemsUL.innerHTML = `<li>
          <span>TRAJET</span>
          <span>HORAIRE</span>
          <span>TARIF</span>
          <span>RETIRER</span>
        </li>`    
    
        for(let i=0;i<cartitems.length;i++){     
            // on extrait le trip en cours
            let curtrip = cartitems[i]

            console.log("le trip en cours est :",i,curtrip)
            
            let curLI = `<li>
          <span>${curtrip.trip.departure} &gt; ${curtrip.trip.arrival}</span>
          <span>Départ le ${formatDate(curtrip.trip.date)}</span>
          <span>${curtrip.trip.price} €</span>
          <button class="remove-btn" data-cartid= ${curtrip._id}>Supprimer ${curtrip._id}</button>
        </li>`
        itemsUL.innerHTML += curLI
        }
    }
    )
}

document.querySelector('#cart-items').addEventListener('click', function(event) {
    // Vérifier si l'élément cliqué est un bouton avec la classe "remove-btn"
    if (event.target.matches('.remove-btn')) {
        // on récupère le cartId qu'on a stocké dans le dataset du bouton comme attribut "data-cartId"
        let idobject = event.target.dataset.cartid
        console.log("a supprimer : " + idobject)
        // et on fetch notre demande de suppression de l'objet
        fetch(`http://localhost:3000/carts/remove/${idobject}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error("Erreur lors de la suppression du trajet");
            }
            // on doit juste recharger la page pour récupérer le panier mis à jour
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
    })



document.querySelector('#purchase-btn').addEventListener('click', function(event) {

    // on fetch tout simplement, ordre de valider le panier
    fetch(`http://localhost:3000/bookings/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartitems)
      })
    })



// on la déclenche au chargement de la page
remplirPanier()

function formatDate(dateString) {
    return moment(dateString).locale('fr').format('D MMMM YYYY à HH[h]mm');
}


