const PokemonRepository = require("../repositories/pokemon-repository")

class BattleService {
    #pokemonRepo;

    constructor(datasource) {
        this.#pokemonRepo = new PokemonRepository(datasource);
    }

    Battle = async(pokemonAId, pokemonBId) => {
        const pokemonA = await this.#pokemonRepo.GetById(pokemonAId);
        const pokemonB = await this.#pokemonRepo.GetById(pokemonBId);
        
        const epicBattleArray = [];
        
        for (let index = 0; index < pokemonA.nivel; index++) {
            epicBattleArray.push(pokemonA.id);
        }

        for (let index = 0; index < pokemonB.nivel; index++) {
            epicBattleArray.push(pokemonB.id);
        }

        const vencedor = epicBattleArray[Math.floor(Math.random()*epicBattleArray.length)] === pokemonAId ? pokemonA : pokemonB;
        const perdedor = vencedor.id === pokemonAId ? pokemonB : pokemonA;
        vencedor.nivel++;
        perdedor.nivel--;

        await this.#pokemonRepo.UpdateNivel(vencedor.id, vencedor.nivel);
        
        if (perdedor.nivel) {
            await this.#pokemonRepo.UpdateNivel(perdedor.id, perdedor.nivel);
        } else {
            await this.#pokemonRepo.Delete(perdedor.id);
        }
        return {vencedor, perdedor};
    }
}

module.exports = BattleService;