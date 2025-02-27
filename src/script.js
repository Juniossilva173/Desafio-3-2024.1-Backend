const pokemonName = document.getElementById("pokemon-name");
const pokemonImage = document.getElementById("pokemon-image");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");

let currentPokemonId = 1;
const totalPokemon = 1026;

async function fetchPokemon(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar Pokémon");
        }
        const data = await response.json();
        updatePokedex(data);
    } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
    }
}

function updatePokedex(data) {
    pokemonName.textContent = data.name.toUpperCase();
    pokemonImage.src = data.sprites.front_default;
    pokemonImage.alt = data.name;
}

prevButton.addEventListener("click", () => {
    currentPokemonId = currentPokemonId === 1 ? totalPokemon - 1 : currentPokemonId - 1;
    fetchPokemon(currentPokemonId);
});

nextButton.addEventListener("click", () => {
    currentPokemonId = currentPokemonId === totalPokemon - 1 ? 1 : currentPokemonId + 1;
    fetchPokemon(currentPokemonId);
});

fetchPokemon(currentPokemonId);
