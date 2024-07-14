class Pokemon {
    // Construtor para inicializar as propriedades do Pokémon
    constructor(name, abilities, height, weight, baseExperience, sprites) {
        this._name = name;
        this._abilities = abilities;
        this._height = height;
        this._weight = weight;
        this._baseExperience = baseExperience;
        this._sprites = sprites;
    }

    get name() {
        return this._capitalize(this._name);
    }

    get abilities() {
        return this._abilitiesFilter(this._abilities);
    }

    get height() {
        return this._height;
    }

    get weight() {
        return this._weight;
    }

    get baseExperience() {
        return `${this._baseExperience}/1000`;
    }

    get image() {
        return this._sprites.front_default;
    }

    // Método privado para capitalizar a primeira letra de um valor
    _capitalize(value) {
        return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
    }

    // Método privado para formatar as habilidades, capitalizando cada habilidade
    _abilitiesFilter(abilities) {
        return abilities.map(item => ` ${this._capitalize(item.ability.name)}`);
    }
}
