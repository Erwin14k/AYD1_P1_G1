const db = require("../utils/db");

module.exports.hashPassword = ({ adminEmail }) => {
  const SQL_HASH_PASSWORD = `SELECT admin_password FROM admin WHERE admin_email = ?`;
  const binds = [adminEmail];
  return db.pool(SQL_HASH_PASSWORD, binds);
};

// Verify admin status
module.exports.verifyStatus = async (adminEmail) => {
  const bindings = [adminEmail];
  const SQL_SELECT_CATEGORY = `SELECT 
                                admin_status AS "adminStatus"
                                FROM admin
                                WHERE admin_email = ?`;
  return await db.pool(SQL_SELECT_CATEGORY, bindings);
};

// Login as admin
module.exports.login = ({ adminEmail, adminPassword }) => {
  const updateAdminDataStatement = `UPDATE admin
                          SET admin_token = api_token(CONCAT(DATE_FORMAT(NOW(), '%d-%m-%Y %H:%i:%s'), ?))
                          WHERE admin_email = ?`;

  const selectAdminDataStatement = `SELECT admin_token,admin_name,admin_email,admin_id FROM admin WHERE admin_email = ?`;
  const binds = [adminPassword, adminEmail];
  return db
    .pool(updateAdminDataStatement, binds)
    .then(() => db.pool(selectAdminDataStatement, [adminEmail]))
    .then((results) => {
      // Login token for admin
      const adminToken = results[0].admin_token;
      const adminName = results[0].admin_name;
      const adminEmail = results[0].admin_email;
      const adminId = results[0].admin_id;
      return [adminToken, adminName, adminEmail, adminId];
    });
};

// Admin info
module.exports.info = ({ adminId }) => {
  // db querys

  // Admin principal data
  const selectAdminDataStatement = `SELECT admin_token,admin_name,admin_email,admin_id
  FROM admin WHERE admin_id = ?`;
  // Collecting all delivery Men with a 'Waiting' status
  const selectAdminDeliveryMenStatement = `SELECT delivery_man_id,delivery_man_name,delivery_man_surname,
  delivery_man_email,delivery_man_phone,delivery_man_department,delivery_man_municipality,delivery_man_license_type,
  delivery_man_transport,delivery_man_status,delivery_man_resume
  FROM delivery_man WHERE admin_id = ? AND delivery_man_status= ?`;
  // Collecting all companies with a 'Waiting' status
  const selectAdminCompaniesStatement = `SELECT company_id,company_name,company_description,company_category,
  company_email,company_department,company_municipality,company_address,company_status,company_file
  FROM company WHERE admin_id = ? AND company_status= ?`;
  // bindings
  const binds = [adminId];
  const infoBinds = [adminId, "Waiting"];
  // Info collected
  let dataCollected = [];
  return (
    db
      .pool(selectAdminDataStatement, binds)
      // Admin principal data
      .then((results) => {
        const adminId = results[0].admin_id;
        const adminToken = results[0].admin_token;
        const adminName = results[0].admin_name;
        const adminEmail = results[0].admin_email;

        dataCollected = [
          {
            adminId: adminId,
            adminToken: adminToken,
            adminName: adminName,
            adminEmail: adminEmail,
          },
        ];
      })
      .then(() => db.pool(selectAdminDeliveryMenStatement, infoBinds))
      // Delivery Man waiting for a response
      .then((results) => {
        dataCollected.push({ deliveryMenWating: results });
      })
      .then(() => db.pool(selectAdminCompaniesStatement, infoBinds))
      // Comapanies waiting for a response
      .then((results) => {
        dataCollected.push({ CompaniesWaiting: results });
        return dataCollected;
      })
  );
};

// Admin delivery_men requests
module.exports.deliveryManRequest = ({ deliveryManId, deliveryManStatus }) => {
  // verify the status of the request
  const status = deliveryManStatus === "Approved" ? "Active" : "Declined";
  const updateDeliveryManStatusStatemnet = `UPDATE delivery_man
                          SET delivery_man_status = ?
                          WHERE delivery_man_id = ?`;
  // bindings
  const binds = [status, deliveryManId];
  return db.pool(updateDeliveryManStatusStatemnet, binds);
};

// Admin company requests
module.exports.companyRequest = ({ companyId, companyStatus }) => {
  // verify the status of the request
  const status = companyStatus === "Approved" ? "Active" : "Declined";
  const updateCompanyStatusStatemnet = `UPDATE company
                          SET company_status = ?
                          WHERE company_id = ?`;
  // bindings
  const binds = [status, companyId];
  return db.pool(updateCompanyStatusStatemnet, binds);
};

// Disable a client
module.exports.disableClient = ({ userId }) => {
  // Update status statement
  const updateUserStatusStatemnet = `UPDATE user
                          SET user_status = ?
                          WHERE user_id = ?`;
  // bindings
  const binds = ["Disabled", userId];
  return db.pool(updateUserStatusStatemnet, binds);
};

// Disable a delivery_man
module.exports.disableDeliveryMan = async ({ deliveryManId }) => {
  // Verify if the delivery_man has a pending order
  const selectDeliveryManPendingOrders = `SELECT order_id
  FROM _order WHERE delivery_man_id = ? AND order_status= ?`;
  const orderBinds = [deliveryManId, "En camino"];
  const ordersResult = await db.pool(
    selectDeliveryManPendingOrders,
    orderBinds
  );
  // If the delivery_man has a pending order, cannot be disabled of the system.
  if (ordersResult[0]) {
    if (ordersResult[0].order_id) {
      return "Pending";
    }
  }
  // Update status statement
  const updateDeliveryManStatusStatemnet = `UPDATE delivery_man
                          SET delivery_man_status = ?
                          WHERE delivery_man_id = ?`;
  // bindings
  const binds = ["Disabled", deliveryManId];
  await db.pool(updateDeliveryManStatusStatemnet, binds);
  return "Disabled";
};

// Disable a company
module.exports.disableCompany = async ({ companyId }) => {
  // Verify if the company has a pending order
  const selectCompanyPendingOrders = `SELECT order_id
  FROM _order WHERE company_id = ? AND order_status= ?`;
  const orderBinds = [companyId, "En camino"];
  const ordersResult = await db.pool(selectCompanyPendingOrders, orderBinds);
  // If the company has a pending order, cannot be disabled of the system.
  if (ordersResult[0]) {
    if (ordersResult[0].order_id) {
      return "Pending";
    }
  }
  // Update status statement
  const updateCompanyStatusStatemnet = `UPDATE company
                          SET company_status = ?
                          WHERE company_id = ?`;
  // bindings
  const binds = ["Disabled", companyId];
  await db.pool(updateCompanyStatusStatemnet, binds);
  // Delete all products of the disabled company
  const deleteProductsStatement = `DELETE FROM product WHERE company_id = ?`;
  const productsBinds = [companyId];
  await db.pool(deleteProductsStatement, productsBinds);

  return "Disabled";
};

// Get All clients
module.exports.getAllClients = async () => {
  // db querys
  // Collecting all delivery Men
  const selectAdminClientsStatement = `SELECT user_id,user_email,user_name,
  user_surname,user_status FROM user WHERE admin_id = ? AND user_status = ?`;
  // bindings
  const binds = [-1, "Active"];
  // Info collected
  let dataCollected = [];
  const results = await db.pool(selectAdminClientsStatement, binds);
  dataCollected.push({ clients: results });
  return dataCollected;
};

// Get All delivery_men
module.exports.getAllDevliveryMen = async () => {
  // db querys
  // Collecting all delivery Men
  const selectAdminDeliveryMenStatement = `SELECT delivery_man_id,delivery_man_name,delivery_man_surname,
  delivery_man_email,delivery_man_phone,delivery_man_department,delivery_man_municipality,delivery_man_license_type,
  delivery_man_transport,delivery_man_status,delivery_man_resume
  FROM delivery_man WHERE admin_id = ? AND delivery_man_status = ?`;
  // bindings
  const binds = [-1, "Active"];
  // Info collected
  let dataCollected = [];
  const results = await db.pool(selectAdminDeliveryMenStatement, binds);
  dataCollected.push({ deliveryMen: results });
  return dataCollected;
};

// Get All companies
module.exports.getAllCompanies = async () => {
  // db querys
  // Collecting all companies
  const selectAdminCompaniesStatement = `SELECT company_id,company_name,company_description,company_category,
  company_email,company_department,company_municipality,company_address,company_status,company_file
  FROM company WHERE admin_id = ? AND company_status = ?`;
  // bindings
  const binds = [-1, "Active"];
  // Info collected
  let dataCollected = [];
  const results = await db.pool(selectAdminCompaniesStatement, binds);
  dataCollected.push({ companies: results });
  return dataCollected;
};

// Users counters by status
module.exports.getUserCounters = async () => {
  const statement = `
    SELECT
      (SELECT COUNT(*) FROM user WHERE user_status = 'Active') AS activeUserCount,
      (SELECT COUNT(*) FROM user WHERE user_status = 'Disabled') AS blockedUserCount,
      (SELECT COUNT(*) FROM delivery_man WHERE delivery_man_status = 'Active') AS activeDeliveryManCount,
      (SELECT COUNT(*) FROM delivery_man WHERE delivery_man_status = 'Waiting') AS waitingDeliveryManCount,
      (SELECT COUNT(*) FROM delivery_man WHERE delivery_man_status = 'Declined') AS declinedDeliveryManCount,
      (SELECT COUNT(*) FROM delivery_man WHERE delivery_man_status = 'Disabled') AS blockedDeliveryManCount,
      (SELECT COUNT(*) FROM company WHERE company_status = 'Active') AS activeCompaniesCount,
      (SELECT COUNT(*) FROM company WHERE company_status = 'Waiting') AS waitingCompaniesCount,
      (SELECT COUNT(*) FROM company WHERE company_status = 'Declined') AS declinedCompaniesCount,
      (SELECT COUNT(*) FROM company WHERE company_status = 'Disabled') AS blockedCompaniesCount`;
  return await db.pool(statement);
};

// Get top 5 delivery man by rating
module.exports.getTop5DeliveryManRating = async () => {
  // db querys
  // Collecting top 5
  const selectAdminTop5DeliveryMenStatement = `SELECT delivery_man_id,delivery_man_name,delivery_man_surname,
  delivery_man_email,delivery_man_phone,delivery_man_department,delivery_man_municipality,delivery_man_license_type,
  delivery_man_transport,delivery_man_status,delivery_man_resume,delivery_man_rating
  FROM delivery_man WHERE admin_id = ? ORDER BY delivery_man_rating DESC LIMIT 5`;
  // bindings
  const binds = [-1];
  // Info collected
  let dataCollected = [];
  const results = await db.pool(selectAdminTop5DeliveryMenStatement, binds);
  dataCollected.push({ deliveryMen: results });
  return dataCollected;
};

// Get top 5 most selled products
module.exports.getMostSelledProducts = async () => {
  // db querys
  // Collecting top 5
  const selectAdminMostSelledProductsMenStatement = `SELECT product_id,product_type,product_name,
  product_price,product_description,product_img,product_number_of_sales,product_stock,
  getCompanyName(company_id) AS company_name
  FROM product ORDER BY product_number_of_sales DESC LIMIT 5`;
  // bindings
  const binds = [];
  // Info collected
  let dataCollected = [];
  const results = await db.pool(
    selectAdminMostSelledProductsMenStatement,
    binds
  );
  dataCollected.push({ products: results });
  return dataCollected;
};

// Get top 5 companies by orders generated
module.exports.getTop5CompaniesOrdersGenerated = async () => {
  // db querys
  // Collecting top 5
  const selectAdminTop5CompaniesStatement = `SELECT c.company_name, (
    SELECT COUNT(*)
    FROM _order o
    WHERE o.company_id = c.company_id
    ) AS order_count
    FROM company c
    ORDER BY order_count DESC
    LIMIT 5
  `;
  // bindings
  const binds = [];
  // Info collected
  let dataCollected = [];
  const results = await db.pool(selectAdminTop5CompaniesStatement, binds);
  dataCollected.push({ companies: results });
  return dataCollected;
};

// Admin delivery_men requests
module.exports.deliveryManChangeAddressRequest = async ({
  deliveryManId,
  status,
  newDepartment,
  newMunicipality,
  changeAddressId
}) => {
  // verify the status of the request
  const petitionStatus = status === "Approved" ? "Approved" : "Declined";
  const updateChangeAddressStatemnet = `UPDATE delivery_man_change_address
                          SET status = ?
                          WHERE delivery_man_change_address_id = ?`;
  // bindings
  const binds = [status, changeAddressId];
  await db.pool(updateChangeAddressStatemnet, binds);
  // If the request is approved, the delivery man address data need an update
  if (petitionStatus === "Approved") {
    // update the delivery man information
    const updateDeliveryManAddressStatemnet = `UPDATE delivery_man
    SET delivery_man_department = ?, delivery_man_municipality = ?
    WHERE delivery_man_id = ?`;
    // update bindings
    const updateBindings = [newDepartment, newMunicipality,deliveryManId];
    await db.pool(updateDeliveryManAddressStatemnet, updateBindings);

    // Delete the delivery man change address request
    const deleteChangeAddressRequestStatement = `DELETE FROM delivery_man_change_address WHERE delivery_man_change_address_id = ?`;
    const deleteBinds = [changeAddressId];
    await db.pool(deleteChangeAddressRequestStatement, deleteBinds);
    return "Data updated"
  }
  // Delete the delivery man change address request
  const deleteChangeAddressRequestStatement = `DELETE FROM delivery_man_change_address WHERE delivery_man_change_address_id = ?`;
  const deleteBinds = [changeAddressId];
  await db.pool(deleteChangeAddressRequestStatement, deleteBinds);
  return "No changes on delivery man";
};

// Get all pending change address requests
module.exports.getAllPendingChangeAddressRequests = async () => {
  // db querys
  // Collecting all pending change address requests
  const selectAllPendingResquestsStatement = `SELECT delivery_man_change_address_id,new_department,new_municipality,
  change_description,getDeliveryManName(delivery_man_id) AS delivery_man_name ,delivery_man_id FROM delivery_man_change_address
  WHERE status = ?`;
  // bindings
  const binds = ["Waiting"];
  // Info collected
  let dataCollected = [];
  const results = await db.pool(selectAllPendingResquestsStatement, binds);
  dataCollected.push({ changeAddressRequests: results });
  return dataCollected;
};
