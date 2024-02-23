const express = require('express');
const { specs, swaggerUi } = require('./swagger');
const pokemonsRouter = require('./routes/pokemons');
const dataSource = require('./datasource/datasource');
const PokemonService = require('./services/pokemon-service');
const BattleService = require('./services/battle-service');
const batalharRouter = require('./routes/batalhar');

dataSource.initialize()
  .then(() => {
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.use(async (req, res, next) => {
      req.pokemonService = new PokemonService(dataSource);
      req.battleService = new BattleService(dataSource);
      next();
    });

    app.use('/pokemons', pokemonsRouter);
    app.use('/batalhar', batalharRouter);
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
});