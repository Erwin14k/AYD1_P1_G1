const db = require('../utils/db');


module.exports.hashPassword = ({ userEmail }) => {
  const SQL_HASH_PASSWORD = `SELECT user_password FROM user WHERE user_email = ?`;
	const binds = [userEmail];
  return db.pool(SQL_HASH_PASSWORD, binds);
};
// Registering a new user on the db
module.exports.register = async (userEmail, userPassword, userName, userSurname) => {
  const statement = `INSERT INTO user (user_email, user_password, user_name, user_surname) 
										VALUES (?, ?, ?, ?)`;
  const binds = [userEmail,userPassword,userName,userSurname];
  return(await db.pool(statement, binds));
};




module.exports.existEmail = async ( userEmail ) => {
  const bindings = [userEmail];
  const SQL_SELECT_CATEGORY = `SELECT 
                                    user_id AS "userId"
                                    FROM user
                                    WHERE user_email = ?`;
  return (await db.pool(SQL_SELECT_CATEGORY, bindings));
};

// Login as a User
module.exports.login = ({ userEmail, userPassword }) => {
  const updateUserDataStatement = `UPDATE user
                          SET user_token = api_token(CONCAT(DATE_FORMAT(NOW(), '%d-%m-%Y %H:%i:%s'), ?))
                          WHERE user_email = ?`;

  const selectUserDataStatement = `SELECT user_token,user_name,user_surname,user_email,user_id FROM user WHERE user_email = ?`;
  const binds = [userPassword, userEmail];
  return db.pool(updateUserDataStatement, binds)
    .then(() => db.pool(selectUserDataStatement, [userEmail]))
    .then(results => {
			// Login token for users
      const userToken = results[0].user_token;
			const userName=results[0].user_name;
			const userSurname=results[0].user_surname;
			const userEmail=results[0].user_email;
			const userId=results[0].user_id;
      return [userToken,userName,userSurname,userEmail,userId];
    });
};

// User info
module.exports.info = ({ userId }) => {
	// db querys
  const selectUserDataStatement = `SELECT user_token,user_name,user_surname,user_email,user_id FROM user WHERE user_id = ?`;
	const selectUserPaymentMethodsStatement = `SELECT user_payment_method_id,card_type,card_number FROM user_payment_method WHERE user_id = ?`;
	const selectUserAddressStatement = `SELECT user_address_id,department,municipality,address FROM user_address WHERE user_id = ?`;
  const binds = [userId];
	let dataCollected=[];
  return db.pool(selectUserDataStatement, binds)
		// User principal data
		.then(results=>{
			const userToken = results[0].user_token;
			const userName=results[0].user_name;
			const userSurname=results[0].user_surname;
			const userEmail=results[0].user_email;
			const userId=results[0].user_id;
			
      dataCollected= [{
				userId:userId,
				userEmail: userEmail,
				userName:userName,
				userSurname:userSurname,
				authToken: userToken,
			}];
		})
    .then(() => db.pool(selectUserPaymentMethodsStatement, binds))
		// User payment methods data
		.then(results=>{
			dataCollected.push({"paymentMethods":results});
		})
		.then(() => db.pool(selectUserAddressStatement, binds))
		// User addresses data
    .then(results => {
			dataCollected.push({"userAddresses":results});
      return dataCollected;
    });
};

