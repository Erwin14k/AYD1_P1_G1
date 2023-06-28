const db = require("../utils/db");

module.exports.hashPassword = ({ userEmail }) => {
  const SQL_HASH_PASSWORD = `SELECT user_password FROM user WHERE user_email = ?`;
  const binds = [userEmail];
  return db.pool(SQL_HASH_PASSWORD, binds);
};

// Registering a new user on the db
module.exports.register = async (
  userEmail,
  userPassword,
  userName,
  userSurname
) => {
  const statement = `INSERT INTO user (user_email, user_password, user_name, user_surname,user_status,admin_id) 
										VALUES (?, ?, ?, ?, ?, ?)`;
  const binds = [userEmail, userPassword, userName, userSurname, "Active", -1];
  await db.pool(statement, binds);
  const userId = await db.pool("SELECT LAST_INSERT_ID() as user_id");
  userId=userId[0].user_id;
  const couponStatement = `INSERT INTO coupon (coupon_code, coupon_status, user_id) 
										VALUES (generateCoupon(), ?, ?)`;
  const couponBinds = [ "Active",userId ];
  await db.pool(couponStatement, couponBinds);
  return "Registered";
};

// Verify email existence
module.exports.existEmail = async (userEmail) => {
  const bindings = [userEmail];
  const SQL_SELECT_CATEGORY = `SELECT 
                                    user_id AS "userId"
                                    FROM user
                                    WHERE user_email = ?`;
  return await db.pool(SQL_SELECT_CATEGORY, bindings);
};

// Verify user status
module.exports.verifyStatus = async (userEmail) => {
  const bindings = [userEmail];
  const SQL_SELECT_CATEGORY = `SELECT 
                                user_status AS "userStatus"
                                FROM user
                                WHERE user_email = ?`;
  return await db.pool(SQL_SELECT_CATEGORY, bindings);
};

// Login as a User
module.exports.login = ({ userEmail, userPassword }) => {
  const updateUserDataStatement = `UPDATE user
                          SET user_token = api_token(CONCAT(DATE_FORMAT(NOW(), '%d-%m-%Y %H:%i:%s'), ?))
                          WHERE user_email = ?`;
  const selectUserDataStatement = `SELECT user_token,user_name,user_surname,user_email,user_id FROM user WHERE user_email = ?`;
  const binds = [userPassword, userEmail];
  return db
    .pool(updateUserDataStatement, binds)
    .then(() => db.pool(selectUserDataStatement, [userEmail]))
    .then((results) => {
      // Login token for users
      const userToken = results[0].user_token;
      const userName = results[0].user_name;
      const userSurname = results[0].user_surname;
      const userEmail = results[0].user_email;
      const userId = results[0].user_id;
      return [userToken, userName, userSurname, userEmail, userId];
    });
};

// User info
module.exports.info = async ({ userId }) => {
  // db querys
  const selectUserDataStatement = `SELECT user_token,user_name,user_surname,user_email,user_id,user_status FROM user WHERE user_id = ?`;
  const selectUserPaymentMethodsStatement = `SELECT user_payment_method_id,card_type,card_number FROM user_payment_method WHERE user_id = ?`;
  const selectUserAddressStatement = `SELECT user_address_id,department,municipality,address FROM user_address WHERE user_id = ?`;
  const selectUserCoupon = `SELECT coupon_id,coupon_code FROM coupon WHERE user_id = ? AND coupon_status = 'Active'`;
  const binds = [userId];
  // Verify if the user has an active coupon
  const couponData=await db.pool(selectUserCoupon, binds);
  var couponCode='';
  var couponId=-1;
  if (couponData[0]){
    couponCode=couponData[0].coupon_code;
    couponId=couponData[0].coupon_id;
  }
  let dataCollected = [];
  return (
    db
      .pool(selectUserDataStatement, binds)
      // User principal data
      .then((results) => {
        const userToken = results[0].user_token;
        const userName = results[0].user_name;
        const userSurname = results[0].user_surname;
        const userEmail = results[0].user_email;
        const userId = results[0].user_id;
        const userStatus = results[0].user_status;
        if (couponCode!=='' && couponId!=-1){
          dataCollected = [
            {
              userId: userId,
              userEmail: userEmail,
              userName: userName,
              userSurname: userSurname,
              authToken: userToken,
              userStatus: userStatus,
              couponCode:couponCode,
              couponId:couponId,
            },
          ];
        }else{
          dataCollected = [
            {
              userId: userId,
              userEmail: userEmail,
              userName: userName,
              userSurname: userSurname,
              authToken: userToken,
              userStatus: userStatus,
            },
          ];
        }
        
      })
      .then(() => db.pool(selectUserPaymentMethodsStatement, binds))
      // User payment methods data
      .then((results) => {
        dataCollected.push({ paymentMethods: results });
      })
      .then(() => db.pool(selectUserAddressStatement, binds))
      // User addresses data
      .then((results) => {
        dataCollected.push({ userAddresses: results });
        return dataCollected;
      })
  );
};

// Get all products
module.exports.getAllProducts = async () => {
  // db querys
  // Collecting all products
  const selectAllProducts = `SELECT product_id,product_type,product_name,
  product_price,product_description,product_img,product_number_of_sales,product_stock,
  getCompanyName(company_id) AS company_name, company_id
  FROM product`;
  // bindings
  const binds = [];
  // Info collected
  let dataCollected = [];
  const results = await db.pool(selectAllProducts, binds);
  dataCollected.push({ products: results });
  return dataCollected;
};

// Get all combos
module.exports.getAllCombos = async () => {
  // db querys
  // Collecting all combos
  const selectAllCombos = `SELECT combo_id,combo_name,combo_price,
  combo_description,combo_img,combo_number_of_sales,combo_stock,
  getCompanyName(company_id) AS company_name,company_id
  FROM combo`;
  // bindings
  const binds = [];
  // Info collected
  let dataCollected = [];
  const results = await db.pool(selectAllCombos, binds);
  dataCollected.push({ products: results });
  return dataCollected;
};

// Get all orders associated to the company
module.exports.getAllUserOrders = async ({ userId }) => {
  // db querys
  // Collecting the orders
  const selectUserOrdersStatement = `SELECT order_id,delivery_man_id,user_id,
  company_id,order_status,order_date,order_total,order_commission,
  getCompanyName(company_id) AS company_name,getDeliveryManName(delivery_man_id) AS delivery_man_name,
  getClientName(user_id) AS user_name
  FROM _order WHERE user_id = ?`;
  // bindings

  // console.log(userid);
  const binds = [userId];
  // Info collected
  let dataCollected = [];
  const results = await db.pool(selectUserOrdersStatement, binds);
  dataCollected.push({ orders: results });
  return dataCollected;
};

// Get All companies
module.exports.getAllCompanies = async () => {
  // db querys
  // Collecting all companies
  const selectCompaniesStatement = `SELECT company_id,company_name,company_description,company_category,
  company_email,company_department,company_municipality,company_address,company_status,company_file
  FROM company WHERE admin_id = ? AND company_status = ?`;
  // bindings
  const binds = [-1, "Active"];
  // Info collected
  let dataCollected = [];
  const results = await db.pool(selectCompaniesStatement, binds);
  dataCollected.push({ companies: results });
  return dataCollected;
};
