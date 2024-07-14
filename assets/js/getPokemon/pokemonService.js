class PokemonService {
    // Construtor para inicializar a URL base da API
    constructor() {
        this._baseUrl = 'https://pokeapi.co/api/v2/';
    }

    // Método para obter os dados de um Pokémon específico pelo nome
    getItem(name) {
        return fetch(`${this._baseUrl}pokemon/${name}`)
            .then(response => response.json())
            .then(data => data);
    }

    // Método para obter a lista dos primeiros 151 Pokémons
    getList() {
        return fetch(`${this._baseUrl}pokemon?limit=151`)
            .then(response => response.json())
            .then(data => data);
    }
}
