const {describe, it, expect, beforeAll} = require('@jest/globals');
const PokemonService = require('../../services/pokemon-service');
const datasource = require('../../datasource/datasource');

const pokemonService = new PokemonService(datasource);

beforeAll(() => {
    if (!datasource.isInitialized) {
        return datasource.initialize();
    }
});

describe('PokemonService', () => {
    it('should create a new pokemon with valid type and trainer', async () => {
        const tipo = "charizard";
        const treinador = "Ash";
    
        const result = await pokemonService.Create(tipo, treinador);
    
        expect(result).toBeDefined();
        expect(result.tipo).toBe(tipo);
        expect(result.treinador).toBe(treinador);
    });

    it('should throw an error when trying to create a new pokemon with invalid type', async () => {
        const tipo = "digimon";
        const treinador = "Ash";
    
        await expect(pokemonService.Create(tipo, treinador)).rejects.toThrow('Tipo de pokemon invalido');
    });
    it('should create a new pokemon with valid type and trainer', async () => {
        const tipo = "charizard";
        const treinador = "Ash";
    
        await pokemonService.Create(tipo, treinador);
        const result = await pokemonService.Get();

        expect(result).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
    });

    it('should get a pokemon by id and verify it is the correct one', async () => {
        const tipo = "charizard";
        const treinador = "Ash";
    
        const pokemon = await pokemonService.Create(tipo, treinador);
        const result = await pokemonService.GetById(pokemon.id);

        expect(result).toBeDefined();
        expect(result).toEqual(pokemon);
    });
    it('should update the trainer of a pokemon and verify it was updated', async () => {
        const tipo = "charizard";
        const treinador = "Ash";
        const updatedTreinador = "Misty";
  
        const newPokemon = await pokemonService.Create(tipo, treinador);
  
        await pokemonService.UpdateTreinador(newPokemon.id, updatedTreinador);
        const updatedPokemon = await pokemonService.GetById(newPokemon.id);
  
        expect(updatedPokemon.treinador).toBe(updatedTreinador);
    });

    it('should delete a pokemon and verify it was deleted', async () => {
        const tipo = "charizard";
        const treinador = "Ash";
        const createdPokemon = await pokemonService.Create(tipo, treinador);
  
        await pokemonService.Delete(createdPokemon.id);
        const deletedPokemon = await pokemonService.GetById(createdPokemon.id);
  
        expect(deletedPokemon).toBeNull();
    });
});