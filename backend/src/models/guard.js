const { pool } = require("../utils/db");

module.exports.verifyUserToken = ({ USER_TOKEN }) => {
  const SQL_SELECT_USER = `SELECT 
                            user_id AS "userId", 
                            user_email AS "userEmail",
                            user_password AS "userPassword",
                            user_name AS "userName",
                            user_surname AS "userSurname"
                          FROM user
                          WHERE user_token = ?`;
  let binds=[USER_TOKEN];
  return pool(SQL_SELECT_USER, binds);
};