const PokemonRepository = require("../repositories/pokemon-repository")

class PokemonService {
    #pokemonRepo;

    constructor(datasource) {
        this.#pokemonRepo = new PokemonRepository(datasource);
    }
    
    Create = async (tipo, treinador) => {
        if (!["charizard", "mewtwo", "pikachu"].includes(tipo)) {
            throw new Error('Tipo de pokemon invalido');
        }
        return await this.#pokemonRepo.Create(tipo, treinador);
    }

    Get = async () => {
        return await this.#pokemonRepo.Get();
    }
    
    GetById = async (id) => {
        return await await this.#pokemonRepo.GetById(id);
    }

    UpdateTreinador = async (id, treinador) => {
        await this.#pokemonRepo.UpdateTreinador(id, treinador);
    }
    
    Delete = async (id) => {
        await this.#pokemonRepo.Delete(id);
    }
}

module.exports = PokemonService;