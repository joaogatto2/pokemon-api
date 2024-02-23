const express = require('express');
const pokemonsRouter = express.Router();

/**
 * @swagger
 * /pokemons/:
 *   post:
 *     summary: Cria um pokemon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               treinador:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {id: 1, nivel: 1, tipo: "pikachu", treinador: "nome treinador"}
 *       400:
 *         description: Error response
 */
pokemonsRouter.post('/', async (req, res) => {
  try {
    const pokemon = await req.pokemonService.Create(req.body.tipo, req.body.treinador);
    res.json(pokemon);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /pokemons/{id}/:
 *   put:
 *     summary: Atualiza o treinador de um pokemon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               treinador:
 *                 type: string
 *     responses:
 *       204:
 *         description: Successful response
 *       400:
 *         description: Error response
 */
pokemonsRouter.put('/:id', async (req, res) => {
  try {
    if (!req.body.treinador) {
      res.status(400).send('Body sem propriedade "treinador"');
      return;
    }
    await req.pokemonService.UpdateTreinador(req.params.id, req.body.treinador);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /pokemons:
 *   get:
 *     summary: Traz a lista com todos os pokemons
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{id: 1, nivel: 1, tipo: "pikachu", treinador: "nome treinador"}]
 *       400:
 *         description: Error response
 */
pokemonsRouter.get('/', async (req, res) => {
  try {
    res.json(await req.pokemonService.Get());
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /pokemons/{id}:
 *   get:
 *     summary: Traz um pokemon através de seu id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {id: 1, nivel: 1, tipo: "pikachu", treinador: "nome treinador"}
 *       400:
 *         description: Error response
 */
pokemonsRouter.get('/:id', async (req, res) => {
  try {
    res.json(await req.pokemonService.GetById(req.params.id));
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @swagger
 * /pokemons/{id}:
 *   delete:
 *     summary: Delete um pokemon
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successful response
 *       400:
 *         description: Error response
 */
pokemonsRouter.delete('/:id', async (req, res) => {
  try {
    await req.pokemonService.Delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = pokemonsRouter;