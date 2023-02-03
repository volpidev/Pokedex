const namePokemon = document.querySelector('.namepokemon');
const numberPokemon = document.querySelector('.numberpokemon');
const imgPokemon = document.querySelector('.imgPokemon');

const form = document.querySelector('.form');
const input = document.querySelector('.inputsearch');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {

    namePokemon.innerHTML = 'Loading...';
    numberPokemon.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
    imgPokemon.style.display = 'block';
    namePokemon.innerHTML = data.name;
    numberPokemon.innerHTML = data.id;
    imgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id
    } else {
        imgPokemon.style.display = 'none';
        namePokemon.innerHTML = 'Not Found :(';
        numberPokemon.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon('1');