// Obtém o elemento de seleção pelo seu ID
const elSelect = document.getElementById('select-options');

// Define os valores nos elementos HTML com os dados do Pokémon ou valores padrão
function setValues(pokemon) {
    const elPokemonName = document.getElementById("pokemon-name");
    const elPokemonAbilities = document.getElementById("pokemon-abilities");
    const elPokemonHeight = document.getElementById("pokemon-height");
    const elPokemonWeight = document.getElementById("pokemon-weight");
    const elPokemonExperience = document.getElementById("pokemon-experience");
    const elPokemonImage = document.getElementById("pokemon-image");

    elPokemonName.innerHTML = pokemon ? pokemon.name : '-';
    elPokemonAbilities.innerHTML = pokemon ? pokemon.abilities : '-';
    elPokemonHeight.innerHTML = pokemon ? pokemon.height : '-';
    elPokemonWeight.innerHTML = pokemon ? pokemon.weight : '-';
    elPokemonExperience.innerHTML = pokemon ? pokemon.baseExperience : '-';
    elPokemonImage.setAttribute('src', pokemon ? pokemon.image : 'https://via.placeholder.com/250x250');
}

// Obtém os dados do Pokémon selecionado e atualiza a interface com os dados recebidos
function getValues(value) {
    const service = new PokemonService();
    service.getItem(value).then(response => {
        const { name, abilities, height, weight, base_experience, sprites } = response;
        const pokemon = new Pokemon(name, abilities, height, weight, base_experience, sprites);
        setValues(pokemon);
    });
}

// Adiciona opções ao elemento de seleção com os nomes dos Pokémons
function setOptions(options) {
    options.map(option => {
        elSelect.add(new Option(option.name, option.name), null);
    });
}

// Carrega a lista de Pokémons da API e preenche o elemento de seleção com essas opções
function loadPokemon() {
    const service = new PokemonService();
    service.getList().then(response => {
        const results = response.results;
        setOptions(results);
    });
}

// Adiciona um ouvinte de evento para mudanças na seleção, chama getValues ou setValues dependendo da seleção
elSelect.addEventListener('change', (event) => {
    const value = event.target.value;
    value ? getValues(value) : setValues();
});

// Carrega a lista inicial de Pokémons ao carregar a página
loadPokemon();
