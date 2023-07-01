const db = require('../utils/db');


module.exports.hashPassword = ({ deliveryManEmail }) => {
  const SQL_HASH_PASSWORD = `SELECT delivery_man_password FROM delivery_man WHERE delivery_man_email = ?`;
	const binds = [deliveryManEmail];
  return db.pool(SQL_HASH_PASSWORD, binds);
};

// Registering a new delivery_man on the db
module.exports.register = async (deliveryManName, deliveryManSurname,deliveryManEmail, deliveryManPassword,
  deliveryManPhone,deliveryManDepartment,deliveryManMunicipality,deliveryManLicenseType,deliveryManTransport,
  deliveryManResume,deliveryManResumeKey) => {
  const statement = `INSERT INTO delivery_man (delivery_man_name, delivery_man_surname, delivery_man_email, delivery_man_password,
                      delivery_man_phone,delivery_man_department,delivery_man_municipality,delivery_man_license_type,
                      delivery_man_transport,delivery_man_status,delivery_man_rating,delivery_man_resume,admin_id,delivery_man_resume_key) 
                      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const binds = [deliveryManName,deliveryManSurname,deliveryManEmail,deliveryManPassword,deliveryManPhone,
    deliveryManDepartment,deliveryManMunicipality,deliveryManLicenseType,deliveryManTransport,
    'Waiting',0.00,deliveryManResume,-1,deliveryManResumeKey];
  return(await db.pool(statement, binds));
};


// Verify email existence
module.exports.existEmail = async ( deliveryManEmail ) => {
  const bindings = [deliveryManEmail];
  const SQL_SELECT_CATEGORY = `SELECT delivery_man_id AS "deliveryManId"
                                FROM delivery_man
                                WHERE delivery_man_email = ?`;
  return (await db.pool(SQL_SELECT_CATEGORY, bindings));
};

// Verify delivery_man status
module.exports.verifyStatus = async ( deliveryManEmail ) => {
  const bindings = [deliveryManEmail];
  const SQL_SELECT_CATEGORY = `SELECT 
                                delivery_man_status AS "deliveryManStatus"
                                FROM delivery_man
                                WHERE delivery_man_email = ?`;
  return (await db.pool(SQL_SELECT_CATEGORY, bindings));
};

// Login as a Delivery_Man
module.exports.login = ({ deliveryManEmail, deliveryManPassword }) => {
  const updateDeliveryManDataStatement = `UPDATE delivery_man
                          SET delivery_man_token = api_token(CONCAT(DATE_FORMAT(NOW(), '%d-%m-%Y %H:%i:%s'), ?))
                          WHERE delivery_man_email = ?`;

  const selectDeliveryManDataStatement = `SELECT delivery_man_token,delivery_man_name,delivery_man_surname,delivery_man_email,delivery_man_id FROM delivery_man WHERE delivery_man_email = ?`;
  const binds = [deliveryManPassword, deliveryManEmail];
  return db.pool(updateDeliveryManDataStatement, binds)
    .then(() => db.pool(selectDeliveryManDataStatement, [deliveryManEmail]))
    .then(results => {
			// Login token for delivery_man
      const deliveryManToken = results[0].delivery_man_token;
			const deliveryManName=results[0].delivery_man_name;
			const deliveryManSurname=results[0].delivery_man_surname;
			const deliveryManEmail=results[0].delivery_man_email;
			const deliveryManId=results[0].delivery_man_id;
      return [deliveryManToken,deliveryManName,deliveryManSurname,deliveryManEmail,deliveryManId];
    });
};

// Delivery_Man info
module.exports.info = ({ deliveryManId }) => {
	// db querys
  const selectdeliveryManDataStatement = `SELECT delivery_man_token,delivery_man_name,delivery_man_surname,
  delivery_man_email,delivery_man_phone,delivery_man_department,delivery_man_municipality,delivery_man_license_type,
  delivery_man_transport,delivery_man_status,delivery_man_rating,delivery_man_resume,delivery_man_id
  FROM delivery_man WHERE delivery_man_id = ?`;
	const selectDeliveryManOrdersStatement = `SELECT order_id,coupon_id,delivery_man_id,user_id,user_address_id,order_status
  order_date,order_total FROM _order WHERE delivery_man_id = ?`;
	const selectDeliveryManRatingsStatement = `SELECT delivery_man_rating_id,delivery_man_id,rating,
  order_id FROM delivery_man_rating WHERE delivery_man_id = ?`;
  const binds = [deliveryManId];
	let dataCollected=[];
  return db.pool(selectdeliveryManDataStatement, binds)
		// Delivery_Man principal data
		.then(results=>{
      const deliveryManId=results[0].delivery_man_id;
			const deliveryManToken = results[0].delivery_man_token;
			const deliveryManName=results[0].delivery_man_name;
			const deliveryManSurname=results[0].delivery_man_surname;
			const deliveryManEmail=results[0].delivery_man_email;
			const deliveryManPhone=results[0].delivery_man_phone;
      const deliveryManDepartment=results[0].delivery_man_department;
      const deliveryManMunicipality=results[0].delivery_man_municipality;
      const deliveryManLicenseType=results[0].delivery_man_license_type;
      const deliveryManTransport=results[0].delivery_man_transport;
      const deliveryManStatus=results[0].delivery_man_status;
      const deliveryManRating=results[0].delivery_man_rating;
      const deliveryManResume=results[0].delivery_man_resume;
			
      dataCollected= [{
				deliveryManId:deliveryManId,
				deliveryManToken: deliveryManToken,
				deliveryManName:deliveryManName,
				deliveryManSurname:deliveryManSurname,
				deliveryManEmail: deliveryManEmail,
        deliveryManPhone:deliveryManPhone,
        deliveryManDepartment:deliveryManDepartment,
        deliveryManMunicipality:deliveryManMunicipality,
        deliveryManLicenseType:deliveryManLicenseType,
        deliveryManTransport:deliveryManTransport,
        deliveryManStatus:deliveryManStatus,
        deliveryManRating:deliveryManRating,
        deliveryManResume:deliveryManResume,
			}];
		})
    .then(() => db.pool(selectDeliveryManRatingsStatement, binds))
		// Delivery Man Ratings
		.then(results=>{
			dataCollected.push({"deliveryManRatings":results});
		})
		.then(() => db.pool(selectDeliveryManOrdersStatement, binds))
		// Delivery Man Orders
    .then(results => {
			dataCollected.push({"deliveryManOrders":results});
      return dataCollected;
    });
};


// Registering a change address request associated to a delivery man
module.exports.changeAddress = async ({deliveryManId,newDepartment,newMunicipality, changeDescription}) => {
  const changeAddressStatement = `INSERT INTO delivery_man_change_address (delivery_man_id, new_department, 
  new_municipality, change_description,status,admin_id) 
  VALUES (?,?,?,?,?,?)`;
//bindings
  const binds = [deliveryManId,newDepartment,newMunicipality,changeDescription,"Waiting",-1];
  return(await db.pool(changeAddressStatement, binds));
};


// Get all orders associated to the delivery_man
module.exports.getAllDeliveryManOrders = async ({deliveryManId}) => {
	// db querys
  // Collecting the orders
	const selectDeliveryManOrdersStatement = `SELECT order_id,delivery_man_id,user_id,
  company_id,order_status,order_date,order_total,order_commission,
  getCompanyName(company_id) AS company_name,getDeliveryManName(delivery_man_id) AS delivery_man_name,
  getClientName(user_id) AS user_name
  FROM _order WHERE delivery_man_id = ?`;
  // bindings
  const binds = [deliveryManId];
  // Info collected
	let dataCollected=[];
  const results = await db.pool(selectDeliveryManOrdersStatement, binds);
  dataCollected.push({ "orders": results });
  return dataCollected;
};


// Select an order to deliver
module.exports.selectAnOrderToDeliver = async ({orderId,deliveryManId}) => {
  const updateOrderStatement = `UPDATE _order SET order_status = ?, delivery_man_id = ? WHERE order_id = ?`;
  // bindings
  const binds = ["En camino",deliveryManId,orderId];
  return await db.pool(updateOrderStatement, binds);
};

// Deliver an order
module.exports.deliverOrder = async ({orderId}) => {
  const updateOrderStatement = `UPDATE _order SET order_status = ? WHERE order_id = ?`;
  // bindings
  const binds = ["Entregado",orderId];
  return await db.pool(updateOrderStatement, binds);
};


// Get all avaliable orders
module.exports.getAllAvaliableOrders = async ({deliveryManId}) => {
	// db querys
  // Obtain the devliery man department
  const departmentStatement=`SELECT getDeliveryManDepartment(?) AS deliveryManDepartment`
  const departmentBinds=[deliveryManId];
  const department = await db.pool(departmentStatement, departmentBinds);
  // Collecting the orders
	const selectDeliveryManOrdersStatement = `SELECT order_id,user_id,
  company_id,order_status,order_date,order_total,order_commission,
  getCompanyName(company_id) AS company_name,getClientName(user_id) AS user_name,order_department
  FROM _order WHERE order_department = ?`;
  // bindings
  const binds = [department];
  // Info collected
	let dataCollected=[];
  const results = await db.pool(selectDeliveryManOrdersStatement, binds);
  dataCollected.push({ "orders": results });
  return dataCollected;
};
