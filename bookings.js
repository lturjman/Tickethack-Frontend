
// on veut revenir a l'index si on clique sur le titre
document.querySelector('#title').addEventListener('click',()=>{
    window.location.assign('./index.html')
})


function remplirPanier(){
    let itemsUL = document.querySelector('#cart-items')
    itemsUL.innerHTML = ''

    fetch('http://localhost:3000/bookings').then(data=>data.json()).then(books=>{
        itemsUL.innerHTML = `<li>
          <span>TRAJET</span>
          <span>HORAIRE</span>
          <span>TARIF</span>
          <span>DEPART</span>
        </li>`    
    
        for(let i=0;i<books.length;i++){     
            // on extrait le trip en cours
            let curbook = books[i].trip

            console.log("le trip en cours est :",i,curbook)
            
            let curLI = `<li>
          <span>${curbook.departure} &gt; ${curbook.arrival}</span>
          <span>Départ le ${formatDate(curbook.date)}</span>
          <span>${curbook.price} €</span>
          <button class="remove-btn" data-cartId= ${curbook._id}>X</button>
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
