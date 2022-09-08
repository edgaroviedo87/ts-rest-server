import { Sequelize } from "sequelize";

const db = new Sequelize('ts_nodedb', 'root', 'Mariedz1!', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

export default db;