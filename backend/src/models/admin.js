const db = require('../utils/db');


module.exports.hashPassword = ({ adminEmail }) => {
  const SQL_HASH_PASSWORD = `SELECT admin_password FROM admin WHERE admin_email = ?`;
	const binds = [adminEmail];
  return db.pool(SQL_HASH_PASSWORD, binds);
};



// Verify admin status
module.exports.verifyStatus = async ( adminEmail ) => {
  const bindings = [adminEmail];
  const SQL_SELECT_CATEGORY = `SELECT 
                                admin_status AS "adminStatus"
                                FROM admin
                                WHERE admin_email = ?`;
  return (await db.pool(SQL_SELECT_CATEGORY, bindings));
};


// Login as admin
module.exports.login = ({ adminEmail, adminPassword }) => {
  const updateAdminDataStatement = `UPDATE admin
                          SET admin_token = api_token(CONCAT(DATE_FORMAT(NOW(), '%d-%m-%Y %H:%i:%s'), ?))
                          WHERE admin_email = ?`;

  const selectAdminDataStatement = `SELECT admin_token,admin_name,admin_email,admin_id FROM admin WHERE admin_email = ?`;
  const binds = [adminPassword, adminEmail];
  return db.pool(updateAdminDataStatement, binds)
    .then(() => db.pool(selectAdminDataStatement, [adminEmail]))
    .then(results => {
			// Login token for admin
      const adminToken = results[0].admin_token;
			const adminName=results[0].admin_name;
			const adminEmail=results[0].admin_email;
			const adminId=results[0].admin_id;
      return [adminToken,adminName,adminEmail,adminId];
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
  const infoBinds=[adminId,"Waiting"]
  // Info collected
	let dataCollected=[];
  return db.pool(selectAdminDataStatement, binds)
		// Admin principal data
		.then(results=>{
      const adminId=results[0].admin_id;
			const adminToken = results[0].admin_token;
			const adminName=results[0].admin_name;
			const adminEmail=results[0].admin_email;
			
      dataCollected= [{
				adminId:adminId,
				adminToken: adminToken,
				adminName:adminName,
				adminEmail:adminEmail,
			}];
		})
    .then(() => db.pool(selectAdminDeliveryMenStatement, infoBinds))
		// Delivery Man waiting for a response
		.then(results=>{
			dataCollected.push({"deliveryMenWating":results});
		})
		.then(() => db.pool(selectAdminCompaniesStatement, infoBinds))
		// Comapanies waiting for a response
    .then(results => {
			dataCollected.push({"CompaniesWaiting":results});
      return dataCollected;
    });
};


// Admin delivery_men requests
module.exports.deliveryManRequest = ({ deliveryManId, deliveryManStatus }) => {
  // verify the status of the request
  const status=deliveryManStatus==="Approved"?"Active":"Declined";
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
  const status=companyStatus==="Approved"?"Active":"Declined";
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
  const binds = ['Disabled', userId];
  return db.pool(updateUserStatusStatemnet, binds);
};

// Disable a delivery_man
module.exports.disableDeliveryMan = async ({ deliveryManId }) => {
  // Verify if the delivery_man has a pending order
  const selectDeliveryManPendingOrders = `SELECT order_id
  FROM _order WHERE delivery_man_id = ? AND order_status= ?`;
  const orderBinds=[deliveryManId,'OnTheWay'];
  const ordersResult= await db.pool(selectDeliveryManPendingOrders, orderBinds);
  // If the delivery_man has a pending order, cannot be disabled of the system.
  if(ordersResult[0].order_id){
    return "Pending";
  }
  // Update status statement
  const updateDeliveryManStatusStatemnet = `UPDATE delivery_man
                          SET delivery_man_status = ?
                          WHERE delivery_man_id = ?`;
  // bindings
  const binds = ['Disabled', deliveryManId];
  await db.pool(updateDeliveryManStatusStatemnet, binds);
  return "Disabled";
};

// Disable a company
module.exports.disableCompany = async ({ companyId }) => {
  // Verify if the company has a pending order
  const selectCompanyPendingOrders = `SELECT order_id
  FROM _order WHERE company_id = ? AND order_status= ?`;
  const orderBinds=[companyId,'OnTheWay'];
  const ordersResult= await db.pool(selectCompanyPendingOrders, orderBinds);
  // If the company has a pending order, cannot be disabled of the system.
  if(ordersResult[0].order_id){
    return "Pending";
  }
  // Update status statement
  const updateCompanyStatusStatemnet = `UPDATE company
                          SET company_status = ?
                          WHERE company_id = ?`;
  // bindings
  const binds = ['Disabled', companyId];
  await db.pool(updateCompanyStatusStatemnet, binds);
  return "Disabled";
};


// Get All clients
module.exports.getAllClients = ({ adminId }) => {
	// db querys
  // Collecting all delivery Men
	const selectAdminClientsStatement = `SELECT user_id,user_email,user_name,
  user_surname,user_status FROM user WHERE admin_id = ? AND user_status = ?`;
  // bindings
  const binds = [adminId,"Active"];
  // Info collected
	let dataCollected=[];
  return db.pool(selectAdminClientsStatement, binds)
		// Admin principal data
		.then(results=>{
      dataCollected.push({"clients":results});
      return dataCollected;
		});
};

// Get All delivery_men
module.exports.getAllDevliveryMen = ({ adminId }) => {
	// db querys
  // Collecting all delivery Men
	const selectAdminDeliveryMenStatement = `SELECT delivery_man_id,delivery_man_name,delivery_man_surname,
  delivery_man_email,delivery_man_phone,delivery_man_department,delivery_man_municipality,delivery_man_license_type,
  delivery_man_transport,delivery_man_status,delivery_man_resume
  FROM delivery_man WHERE admin_id = ? AND delivery_man_status = ?`;
  // bindings
  const binds = [adminId,"Active"];
  // Info collected
	let dataCollected=[];
  return db.pool(selectAdminDeliveryMenStatement, binds)
		// Admin principal data
		.then(results=>{
      dataCollected.push({"deliveryMen":results});
      return dataCollected;
		});
};


// Get All delivery_men
module.exports.getAllCompanies = async ({adminId}) => {
	// db querys
  // Collecting all companies
	const selectAdminCompaniesStatement = `SELECT company_id,company_name,company_description,company_category,
  company_email,company_department,company_municipality,company_address,company_status,company_file
  FROM company WHERE admin_id = ? AND company_status = ?`;
  // bindings
  const binds = [adminId,"Active"];
  // Info collected
	let dataCollected=[];
  const results = await db.pool(selectAdminCompaniesStatement, binds);
  dataCollected.push({ "companies": results });
  return dataCollected;
};


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
      (SELECT COUNT(*) FROM company WHERE company_status = 'Disabled') AS blockedCompaniesCount`
      ;
  return await db.pool(statement);
};
