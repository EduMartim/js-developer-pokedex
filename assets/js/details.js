const pokemonDetailsContainer = document.getElementById("pokemonDetails");

function renderPokemonDetails(pokemon) {
  const html = `
    <h2>${pokemon.name}</h2>
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <p>Ability: ${pokemon.ability}</p>
    <img src="${pokemon.photo}" alt="${pokemon.name}">
    `;
    pokemonDetailsContainer.innerHTML = html;
  }
  
  function fetchPokemonDetails(pokemonId) {
    pokeApi
    .getPokemonDetail(pokemonId)
    .then((pokemon) => renderPokemonDetails(pokemon))
    .catch((error) => console.log(error));
  }


