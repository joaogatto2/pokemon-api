const datasource = require("../datasource/datasource");

class PokemonRepository {
    #datasource;
    constructor(datasource) {
        this.#datasource = datasource;
    }

    Create = async (tipo, treinador) => {
        const pokemon = {
            nivel: 1,
            tipo: tipo,
            treinador: treinador
        };
        return await this.#datasource.getRepository('Pokemon').save(pokemon);
    }
    
    Get = async () => {
        return await this.#datasource.getRepository('Pokemon').find();
    }
    
    GetById = async (id) => {
        return await this.#datasource.getRepository('Pokemon').findOneBy({id});
    }

    UpdateTreinador = async (id, treinador) => {
        await this.#datasource.getRepository('Pokemon').update(+id, {treinador});
    }
    
    UpdateNivel = async (id, nivel) => {
        await this.#datasource.getRepository('Pokemon').update(+id, {nivel});
    }
    
    Delete = async (id) => {
        await this.#datasource.getRepository('Pokemon').delete(id);
    }
}

module.exports = PokemonRepository;