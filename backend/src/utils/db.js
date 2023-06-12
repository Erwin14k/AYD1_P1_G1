const mysql = require('mysql2');
const mysqlConfig = require('../config/config');

let pool;

// Inicializar la base de datos
module.exports.start = async () => {
    pool = mysql.createPool(mysqlConfig.mysqlConfig);
};

// Cerrar la base de datos
module.exports.close = async () => {
    if (pool) {
        await pool.end();
    }
};

module.exports.pool = async (statement, binds = []) => {
    try {
        const promisePool = pool.promise(); // Crear una versión promisificada del pool

        const [rows] = await promisePool.execute(statement, binds);

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
