const { pool } = require("../utils/db");

module.exports.verifyUserToken = ({ TOKEN }) => {
  const SQL_SELECT_USER = `SELECT 
                            user_id AS "userId", 
                            user_email AS "userEmail",
                            user_password AS "userPassword",
                            user_name AS "userName",
                            user_surname AS "userSurname",
                            user_status AS "userStatus"
                          FROM user
                          WHERE user_token = ?`;
  let binds=[TOKEN];
  return pool(SQL_SELECT_USER, binds);
};

module.exports.verifyDeliveryManToken = ({ TOKEN }) => {
  const SQL_SELECT_USER = `SELECT 
                            delivery_man_id AS "deliveryManId", 
                            delivery_man_email AS "deliveryManEmail",
                            delivery_man_password AS "deliveryManPassword",
                            delivery_man_name AS "deliveryManName",
                            delivery_man_surname AS "deliveryManSurname",
                            delivery_man_status AS "deliveryManStatus"
                          FROM delivery_man
                          WHERE delivery_man_token = ?`;
  let binds=[TOKEN];
  return pool(SQL_SELECT_USER, binds);
};

module.exports.verifyCompanyToken = ({ TOKEN }) => {
  const SQL_SELECT_USER = `SELECT 
                            company_id AS "companyId", 
                            company_email AS "companyEmail",
                            company_password AS "companyPassword",
                            company_description AS "company_description",
                            company_category AS "companyCategory",
                            company_status AS "companyStatus"
                          FROM company
                          WHERE company_token = ?`;
  let binds=[TOKEN];
  return pool(SQL_SELECT_USER, binds);
};