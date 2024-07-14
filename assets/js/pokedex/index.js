// Obtém os elementos HTML para a lista de Pokémons e o botão de carregar mais
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

// Define o número máximo de registros e o limite de Pokémons por carregamento
const maxRecords = 151;
const limit = 10;
let offset = 0;

// Função para carregar itens de Pokémon com base no offset e limite
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Gera o HTML para a lista de Pokémons
        const newHtml = pokemons.map((pokemon) =>
            `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>`
        ).join('');
        // Adiciona o HTML gerado à lista de Pokémons existente
        pokemonList.innerHTML += newHtml;
    });
}

// Carrega os Pokémons iniciais com offset e limite definidos
loadPokemonItens(offset, limit);

// Adiciona um ouvinte de evento ao botão para carregar mais Pokémons
loadMoreButton.addEventListener('click', () => {
    offset += limit;  // Atualiza o offset para a próxima página
    const qtdRecordWithNexPage = offset + limit;

    // Verifica se o número de registros ultrapassa o máximo permitido
    if (qtdRecordWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;  // Ajusta o limite para não ultrapassar o máximo
        loadPokemonItens(offset, newLimit);  // Carrega os Pokémons restantes
        loadMoreButton.parentElement.removeChild(loadMoreButton);  // Remove o botão de carregar mais
    } else {
        loadPokemonItens(offset, limit);  // Carrega mais Pokémons
    }
});
