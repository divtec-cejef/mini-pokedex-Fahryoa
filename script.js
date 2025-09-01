/**
 * Exercice : Mini Pokédex
 * @author Yoan Fahrni
 * @since 26.08.2025
 */

'use strict';

// Couleur par défaut pour les types de Pokémon non définis
const DEFAULT_COLOR = '#ccc';

const pokemonEl = document.querySelector("div.pokemon-container");

const searchBar = document.querySelector('#search-bar');

const typeFilter = document.querySelector('#type-filter');

const sorteOrdre = document.querySelector('#sort-order');

const prevBtn = document.querySelector('#prece-btn');

const nextBtn = document.querySelector('#suiv-btn');

const pageInfo = document.querySelector('#page-info');

const itemsPerPage = 10;

let currentPage = 1;

let totalPages = 1;

searchBar.addEventListener('input', filterAndSortPokemons);

typeFilter.addEventListener('change', filterAndSortPokemons);

sorteOrdre.addEventListener('change', filterAndSortPokemons);

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        filterAndSortPokemons(); // Re-filtrer et afficher la page correcte
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        filterAndSortPokemons();
    }
});

// Couleurs pour chaque type de Pokémon
const typeColors = {
    'Électrique': '#FFD700',
    'Plante': '#78C850',
    'Poison': '#A040A0',
    'Feu': '#F08030',
    'Eau': '#6890F0',
    'Normal': '#A8A878',
    'Fée': '#EE99AC',
    'Spectre': '#705898',
    'Combat': '#C03028',
    'Vol': '#A890F0',
    'Glace': '#98D8D8',
    'Roche': '#B8A038',
    'Sol': '#E0C068',
    'Psy': '#F85888'
};

// Tableau d'objets représentant les Pokémon
const pokemons = [
    { name: 'Pikachu', type: 'Électrique', level: 35, img: 'pikachu.png' },
    { name: 'Bulbizarre', type: 'Plante,Poison', level: 15, img: 'bulbizarre.png' },
    { name: 'Salamèche', type: 'Feu', level: 20, img: 'salameche.png' },
    { name: 'Carapuce', type: 'Eau', level: 10, img: 'carapuce.png' },
    { name: 'Rondoudou', type: 'Normal,Fée', level: 25, img: 'rondoudou.png' },
    { name: 'Ectoplasma', type: 'Spectre,Poison', level: 45, img: 'ectoplasma.png' },
    { name: 'Évoli', type: 'Normal,Combat', level: 22, img: 'evoli.png' },
    { name: 'Dracaufeu', type: 'Feu,Vol', level: 50, img: 'dracaufeu.png' },
    { name: 'Florizarre', type: 'Plante,Poison', level: 55, img: 'florizarre.png' },
    { name: 'Tortank', type: 'Eau', level: 52, img: 'tortank.png' },
    { name: 'Mélofée', type: 'Fée', level: 18, img: 'melofee.png' },
    { name: 'Raichu', type: 'Électrique', level: 40, img: 'raichu.png' },
    { name: 'Magicarpe', type: 'Eau', level: 5, img: 'magicarpe.png' },
    { name: 'Lokhlass', type: 'Eau,Glace', level: 35, img: 'lokhlass.png' },
    { name: 'Onix', type: 'Roche,Sol', level: 30, img: 'onix.png' },
    { name: 'Ronflex', type: 'Normal', level: 45, img: 'ronflex.png' },
    { name: 'Mewtwo', type: 'Psy', level: 70, img: 'mewtwo.png' }
];

function generatePokemonCardHTML(pokemon) {

        let type = pokemon.type.split(",");
        let typeAfficher = type.join(" / ");
        let backgroundColor;

    if (type.length >= 2) {
        const color1 = typeColors[type[0].trim()] || DEFAULT_COLOR;
        const color2 = typeColors[type[1].trim()] || DEFAULT_COLOR;
        backgroundColor = `linear-gradient(to right, ${color1} 50%, ${color2} 50%)`;
    } else {
        backgroundColor = typeColors[type[0].trim()] || DEFAULT_COLOR;
    }

        let cartePokemon = `<div class="pokemon-card" style="background: ${backgroundColor};">
        <img src= "images/${pokemon.img}" alt=${pokemon.name}>
        <h2>${pokemon.name}</h2>
        <div>Type: ${typeAfficher}</div> 
        <div>Niveau: ${pokemon.level}</div>
    </div>`;

    return cartePokemon
}

function displayPokemons(pokemonListe = pokemons) {

    pokemonEl.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    totalPages = Math.ceil(pokemonListe.length / itemsPerPage);

    const pokemonsAAfficher = pokemonListe.slice(startIndex, endIndex);

    for (let pokemon of pokemonsAAfficher) {
        pokemonEl.innerHTML += generatePokemonCardHTML(pokemon);
    }

    if (pokemonEl.innerHTML.length <= 0) {
        pokemonEl.innerHTML += "Texte très amusant ! "
    }

    updatePaginationControls();

}

function filterAndSortPokemons() {
    const searchValue = searchBar.value.toLowerCase();
    const selectedType = typeFilter.value;
    const ordre = sorteOrdre.value;

    let filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchValue)
    );

    if (selectedType !== "") {
        filteredPokemons = filteredPokemons.filter(pokemon =>
            pokemon.type.split(',').map(t => t.trim()).includes(selectedType)
        );
    }

    switch (ordre) {
        case 'name-asc':
            filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredPokemons.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'level-asc':
            filteredPokemons.sort((a, b) => a.level - b.level);
            break;
        case 'level-desc':
            filteredPokemons.sort((a, b) => b.level - a.level);
            break;
    }

    displayPokemons(filteredPokemons);
}

function updatePaginationControls() {
    pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

displayPokemons();


