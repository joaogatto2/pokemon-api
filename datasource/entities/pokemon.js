const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Pokemon",
    tableName: "pokemons",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        tipo: {
            type: "varchar",
        },
        treinador: {
            type: "varchar",
        },
        nivel: {
            type: "int",
        },
    },
});