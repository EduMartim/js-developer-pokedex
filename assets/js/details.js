//----busca o pokemon aleatório na API-----//
const urlApi = "https://pokeapi.co/api/v2/pokemon";
const pokemonElement = document.querySelector("div.pokemon"); // seleciona a div pokemon lá do html

const random = () => Math.floor(Math.random() * 150);

const getAbilities = (abilities) => abilities.map((item) => item.ability.name);

const createAbilities = (abilities) =>
  abilities.reduce((acc, item) => (acc += `<li>${item}</li>`), "");

// aqui esta sendo injetado o html que estava na div pokemon
const createPokemon = ({ image, id, name, abilities, weight, height }) => {
  pokemonElement.innerHTML = `
    <div class="pokemon__wrapperImage"><img src="${image}" class="pokemon__image" alt="pokemon ${name}" /></div>
      <div class="pokemon__info">
        <h1>Details</h1>
        <h2 class="pokemon__name">
          #${id}
          ${name}
        </h2>
        <h3>Abilities:</h3>
          <ul class="pokemon__details">${createAbilities(abilities)}</ul>
          <ul><h3>Weight: ${weight} </h3></ul>
          <ul><h3>Height: ${height}</h3></ul>
      </div>
  `;
};

const getPokemon = () =>
  fetch(`${urlApi}/${random()}`)
    .then((response) => response.json())
    .then(
      ({
        id,
        name,
        sprites: {
          other: {
            dream_world: { front_default: image },
          },
        },
        height,
        weight,
        abilities,
      }) => {
        const pokemonSelected = {
          id,
          name,
          image,
          height,
          weight,
          abilities: getAbilities(abilities),
        };
        createPokemon(pokemonSelected);
      }
    );

getPokemon();

/*
const pokemon__features = ({ height, weight }) => {
  pokemonElement.innerHTML = `
  <div class="pokemon__features">
  <h2>Details</h2>
    <p class="pokemon__height">Height: ${height}</p>
    <p class="pokemon__weight">Weight: ${weight}</p>
  </div>
  `;
};

const getPokemonFeatures = () =>
  fetch(`${urlApi}/${random()}`)
    .then((response) => response.json())
    .then(({ height, weight }) => {
      const pokemonSelected = {
        height,
        weight,
      };
      pokemon__features(pokemonSelected);
    });

getPokemonFeatures();
*/
