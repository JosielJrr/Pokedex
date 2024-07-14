// Objeto para armazenar métodos relacionados à API do Pokémon
const pokeApi = {};

// Converte os detalhes do Pokémon da API para uma instância da classe Pokemon
function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();    // Cria uma nova instância da classe Pokemon
    pokemon.number = pokeDetail.id;   // Define o número do Pokémon
    pokemon.name = pokeDetail.name;   // Define o nome do Pokémon

    // Extrai os tipos do Pokémon e define o primeiro tipo como o principal
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;            // Define todos os tipos do Pokémon
    pokemon.type = type;              // Define o tipo principal do Pokémon

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;  // Define a URL da foto do Pokémon

    return pokemon;  // Retorna o objeto Pokémon criado
}

// Obtém os detalhes de um Pokémon a partir da URL fornecida
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)               // Faz uma requisição HTTP para obter os detalhes do Pokémon
        .then((response) => response.json()) // Converte a resposta para JSON
        .then(convertPokeApiDetailToPokemon); // Converte os detalhes em uma instância da classe Pokemon
}

// Obtém uma lista de Pokémons com base no offset e limite fornecidos
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;  // Cria a URL para a requisição

    return fetch(url)                        // Faz uma requisição HTTP para obter a lista de Pokémons
        .then((response) => response.json()) // Converte a resposta para JSON
        .then((jsonBody) => jsonBody.results) // Obtém a lista de Pokémons da resposta JSON
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))  // Mapeia cada Pokémon para obter seus detalhes
        .then((detailRequests) => Promise.all(detailRequests)) // Faz requisições paralelas para obter os detalhes de todos os Pokémons
        .then((pokemonsDetails) => pokemonsDetails); // Retorna a lista completa de detalhes dos Pokémons
}
