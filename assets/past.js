let sectionPast = document.getElementById("section-past")
let check = document.getElementById("checkpoint")
let search = document.getElementById("searchBox")





let eventPast;
fetch(`https://mindhub-xj03.onrender.com/api/amazing`)
  .then(data => data.json())
  .then(data => {
    eventPast = data.events.filter(dato => data.currentDate > dato.date);
    renderTemplate(loadcards(eventPast), sectionPast);
    const noRepeat = Array.from(new Set(filterCategory(eventPast)));
    renderTemplate(generarCheck(noRepeat), check);
    search.addEventListener('input', crossFilter);
    check.addEventListener('change', crossFilter);

  })
  .catch(err => console.log(err))




function templateCard(card) {
  return `<article class="card">
              <img src="${card.image} " class=" img-card" alt="${card.name}">
              <div class="card-body">
                <h5 class="card-title">${card.name} </h5>
                <p class="card-text">${card.description} </p>
              </div>
              <div class="precio-compra">
                <p>Price : usd ${card.price}</p>
                <a href="./details.html?id=${card._id}" class="btn btn-primary">Details</a>
              </div>
          </article>`
}




function loadcards(list) {
  let template = ""
  for (let infoCard of list) {
    template += templateCard(infoCard)
  }
  return template

}




/*---------------------check point / serch -----------------*/






//funcion para filtrar por categoria
function filterCategory(lista) {
  const categoryEvents = lista.map(events => events.category);
  return categoryEvents
}




//funcion para generar los check
function generarCheck(categories) {
  let checkbox = ''
  categories.forEach(opcion => {
    checkbox += `<div class="form-check form-check-inline">
                <label class="form-check-label" >
                <input class="form-check-input inlineCheckbox1" type="checkbox"  value="${opcion}">
                ${opcion}
                </label>
                </div>`
  });
  return checkbox
}
// inner para pasar los check a pantalla





//funcion de filtro para el check
function filterCheck(listEvents) {
  let checkbuttons = Array.from(document.querySelectorAll(".form-check-input"))
  let listValue = checkbuttons.filter(event => event.checked).map(click => click.value.toLowerCase())
  let filtered = listEvents.filter(event => listValue.includes(event.category.toLowerCase()));
  if (filtered.length === 0) {
    return listEvents
  } else {
    return filtered
  }

}





//funcion del search para filtrar por nombre de pelicula
function searchEvents(inputBusqueda, listEvents) {
  const filterEvents = listEvents.filter(events => {
    return events.name.toLowerCase().startsWith(inputBusqueda.value.toLowerCase())
  })

  return filterEvents
}





function crossFilter(evento) {

  const filtradosPorBusqueda = searchEvents(search, eventPast)
  const filtradosPorCheck = filterCheck(filtradosPorBusqueda)
  if (filtradosPorCheck.length === 0) {
    let alert = `<h2 class="alert">WAS NOT FOUND</H2>`
    renderTemplate(alert, sectionPast)
  } else {
    renderTemplate(loadcards(filtradosPorCheck), sectionPast)
  }
}


function renderTemplate(template, ubicacion) {
  ubicacion.innerHTML = template
}



