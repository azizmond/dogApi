const URL = "https://api.thedogapi.com/v1/breeds";
let breeds = [];

//Esta función trae las razas de los perros desde URL
const fetchBreeds = async (url = URL) => {
    try {
        const response = await fetch (url);
        const breeds = await response.json();
        return breeds;
    } catch (error) {
        console.error(error)
    }
};

//Muestra el mensaje de que no hay resultados
const showAlert = () => {
    document.querySelector("#alert").innerHTML = "No dogs to show / No hay perros para mostrar";
    document.querySelector("#input").disabled = true;
};

//Borra las cartas, del DOM, a las cuales se le presionó el botón de borrar
const del = (id) => {
    document.getElementById(id).remove();
    breeds = breeds.filter((breed) => breed.id != id);
    breeds.length === 0 ? showAlert() : null;
};

//Genera una carta con cada resultado
const createCard = ({id, image, name, bred_for, breed_group, temperament, origin}) => {
    const card =
    `
    <div class="col-md-4 col-12" id="${id}">
        <div class="card mt-5 ml-3">
            <img src="${image.url}"/>
            <div class="card-body">
                <h5 class="card-title">Raza: ${name}</h5>
                <p class="card-text">Criado para: ${bred_for}</p>
                <p class="card-text">Grupo de raza: ${breed_group}</p>
                <p class="card-text">Temperamento: ${temperament}</p>
                <p class="card-text">Origen: ${origin}</p>
                <button onClick="del(${id})" class="btn btn-danger btn-block">Borrar</button>
            </div>
        </div>
    </div>
    `;
    document.getElementById("apiR").insertAdjacentHTML("beforeend", card);
};

//Función encargada de buscar una raza y eliminar los rows
const findBreed = () => {
    const nameToSearch = document.querySelector("#input").value;
    const searchBreed = breeds.find((breed) => breed.name.toLowerCase() === nameToSearch.toLowerCase());
    const row = document.querySelector('#apiR');
    row.innerHTML = '';
    const card =
        `
    <div class="col-md-4 col-12" id="${searchBreed.id}">
        <div class="card mt-5 ml-3">
            <img src="${searchBreed.image.url}"/>
            <div class="card-body">
                <h5 class="card-title">Raza: ${searchBreed.name}</h5>
                <p class="card-text">Criado para: ${searchBreed.bred_for}</p>
                <p class="card-text">Grupo de raza: ${searchBreed.breed_group}</p>
                <p class="card-text">Temperamento: ${searchBreed.temperament}</p>
                <p class="card-text">Origen: ${searchBreed.origin}</p>
                <button onClick="del(${searchBreed.id})" class="btn btn-danger btn-block">Borrar</button>
            </div>
        </div>
    </div>
    `;
    document.querySelector("#apiR").insertAdjacentHTML("beforeend", card);
};

const loopBreeds = (breeds) => {
    breeds.map((breed) => createCard(breed));
};

//... carga el DOM
const start = async () => {
    document.getElementById("search").addEventListener("click",findBreed);
    breeds = await fetchBreeds();
    loopBreeds(breeds);
};

window.onload = start();