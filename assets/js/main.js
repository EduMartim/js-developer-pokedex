const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function renderPokemons() {
  const pokemonList = document.getElementById("pokemon-list");
  pokemonList.innerHTML = "";

  pokemons.forEach((pokemon) => {
    const li = document.createElement("li");
    li.classList.add("pokemon", ...pokemon.types);
    li.dataset.pokemonId = pokemon.number;
    li.innerHTML = `
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
              <ol class="types">
                  ${pokemon.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}
              </ol>
              <img src="${pokemon.photo}" alt="${pokemon.name}">
          </div>
      `;

    li.addEventListener("click", () => fetchPokemonDetails(pokemon.number));

    pokemonList.appendChild(li);
  });
}

function convertPokemonToLi(pokemon) {
  return `
      <li class="pokemon ${pokemon.type}" data-pokemon-id="${pokemon.number}">
          <span class="name">${pokemon.name}</span>
          <span class="number">#${pokemon.number}</span>

          <div class="detail">
              <ol class="types">
                  ${pokemon.types
                    .map((type) => `<li class="type ${type}">${type}</li>`)
                    .join("")}
              </ol>

              <img src="${pokemon.photo}"
                   alt="${pokemon.name}">
          </div>
      </li>
  `;
}

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;

    // Evento de clique aos elementos <li> dos Pokémon
    const pokemonElements = document.querySelectorAll(".pokemon");
    pokemonElements.forEach((pokemonElement) => {
      pokemonElement.addEventListener("click", showPokemonDetails);
    });
  });
}

// Função para exibir os detalhes do Pokémon
function showPokemonDetails(event) {
  const pokemonId = event.currentTarget.dataset.pokemonId;

  // Redirecionando para a página de detalhes do Pokémon, passando o ID como parâmetro
  window.location.href = `details.html?id=${pokemonId}`;
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNextPage = offset + limit;

  if (qtdRecordsWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});
