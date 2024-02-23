const typeorm = require("typeorm")

module.exports = new typeorm.DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [require("./entities/pokemon")],
    synchronize: true,
});