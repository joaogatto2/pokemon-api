const {describe, it, expect, beforeAll} = require('@jest/globals');
const datasource = require('../../datasource/datasource');
const BattleService = require('../../services/battle-service');
const PokemonService = require('../../services/pokemon-service');

const pokemonService = new PokemonService(datasource);

const battleService = new BattleService(datasource);

beforeAll(() => {
    if (!datasource.isInitialized) {
        return datasource.initialize();
    }
});

describe('BattleService', () => {
    it('should increase the level of the winner and decrease the level of the loser', async () => {        
        const pokemonAModel = {
            nivel: 5,
            tipo: 'charizard',
            treinador: 'Ash'
        };
        const pokemonA = await datasource.getRepository('Pokemon').save(pokemonAModel);
        const pokemonBModel = {
            nivel: 3,
            tipo: 'pikachu',
            treinador: 'Ash'
        };
        const pokemonB = await datasource.getRepository('Pokemon').save(pokemonBModel);
        const pokemons = {};
        pokemons[pokemonA.id.toString()] = pokemonA;
        pokemons[pokemonB.id.toString()] = pokemonB;
  
        const result = await battleService.Battle(pokemonA.id, pokemonB.id);


        const pokemonVencedor = await pokemonService.GetById(result.vencedor.id);
        const pokemonPerdedor = await pokemonService.GetById(result.perdedor.id);
        expect(pokemonVencedor.nivel).toBe(pokemons[pokemonVencedor.id.toString()].nivel + 1);
        expect(pokemonPerdedor.nivel).toBe(pokemons[pokemonPerdedor.id.toString()].nivel - 1);
    });
    
    it('should delete the pokemon if its level is 0', async () => {        
        const pokemonAModel = {
            nivel: 1,
            tipo: 'charizard',
            treinador: 'Ash'
        };
        const pokemonA = await datasource.getRepository('Pokemon').save(pokemonAModel);
        const pokemonBModel = {
            nivel: 1,
            tipo: 'pikachu',
            treinador: 'Ash'
        };
        const pokemonB = await datasource.getRepository('Pokemon').save(pokemonBModel);
        const pokemons = {};
        pokemons[pokemonA.id.toString()] = pokemonA;
        pokemons[pokemonB.id.toString()] = pokemonB;
  
        const result = await battleService.Battle(pokemonA.id, pokemonB.id);


        const pokemonVencedor = await pokemonService.GetById(result.vencedor.id);
        const pokemonPerdedor = await pokemonService.GetById(result.perdedor.id);
        expect(pokemonVencedor.nivel).toBe(2);
        expect(pokemonPerdedor).toBeNull();
    });
});