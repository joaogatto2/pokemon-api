const express = require('express');
const batalharRouter = express.Router();

/**
 * @swagger
 * /batalhar/{pokemonAId}/{pokemonBId}:
 *   post:
 *     summary: Realiza uma batalha entre pokemons
 *     parameters:
 *       - in: path
 *         name: pokemonAId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: pokemonBId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {vencedor: {id: 1, nivel: 2, tipo: "pikachu", treinador: "nome treinador1"}, perdedor: {id: 2, nivel: 0, tipo: "charizard", treinador: "nome treinador2"}}
 *       400:
 *         description: Error response
 */
batalharRouter.post('/:pokemonAId/:pokemonBId', async (req, res) => {
  try {
    res.json(await req.battleService.Battle(req.params.pokemonAId, req.params.pokemonBId));
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = batalharRouter;