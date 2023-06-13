const mysql = require('mysql2');
const mysqlConfig = require('../config/config');

let pool;

// Initialize the database
module.exports.start = async () => {
    pool = mysql.createPool(mysqlConfig.mysqlConfig);
};

// Clos the database
module.exports.close = async () => {
    if (pool) {
        await pool.end();
    }
};

module.exports.pool = async (statement, binds = []) => {
    try {
        // Create a promisified version of the pool
        const promisePool = pool.promise();
        const [rows] = await promisePool.execute(statement, binds);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
