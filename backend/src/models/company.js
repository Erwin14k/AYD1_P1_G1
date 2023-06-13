const db = require('../utils/db');


module.exports.hashPassword = ({ companyEmail }) => {
  const SQL_HASH_PASSWORD = `SELECT company_password FROM company WHERE company_email = ?`;
	const binds = [companyEmail];
  return db.pool(SQL_HASH_PASSWORD, binds);
};

// Registering a new company on the db
module.exports.register = async (companyName, companyDescription,companyCategory, companyEmail,
                                companyPassword,companyDepartment,companyMunicipality,companyAddress) => {
  const statement = `INSERT INTO company (company_name, company_description, company_category, company_email,
                      company_password,company_department,company_municipality,company_address,company_status,admin_id) 
                      VALUES (?,?,?,?,?,?,?,?,?,?)`;
  const binds = [companyName,companyDescription,companyCategory,companyEmail,companyPassword,
                companyDepartment,companyMunicipality,companyAddress,'Waiting',-1];
  return(await db.pool(statement, binds));
};


// Verify email existence
module.exports.existEmail = async ( companyEmail ) => {
  const bindings = [companyEmail];
  const SQL_SELECT_CATEGORY = `SELECT company_id AS "companyId"
                                FROM company
                                WHERE company_email = ?`;
  return (await db.pool(SQL_SELECT_CATEGORY, bindings));
};

// Verify company status
module.exports.verifyStatus = async ( companyEmail ) => {
  const bindings = [companyEmail];
  const SQL_SELECT_CATEGORY = `SELECT 
                                company_status AS "companyStatus"
                                FROM company
                                WHERE company_email = ?`;
  return (await db.pool(SQL_SELECT_CATEGORY, bindings));
};

// Login as a Company
module.exports.login = ({ companyEmail, companyPassword }) => {
  const updateCompanyDataStatement = `UPDATE company
                          SET company_token = api_token(CONCAT(DATE_FORMAT(NOW(), '%d-%m-%Y %H:%i:%s'), ?))
                          WHERE company_email = ?`;

  const selectCompanyDataStatement = `SELECT company_token,company_name,company_description,company_category,company_id,company_status FROM company WHERE company_email = ?`;
  const binds = [companyPassword, companyEmail];
  return db.pool(updateCompanyDataStatement, binds)
    .then(() => db.pool(selectCompanyDataStatement, [companyEmail]))
    .then(results => {
			// Login token for company
      const companyToken = results[0].company_token;
			const companyName=results[0].company_name;
			const companyDescription=results[0].company_description;
			const companyCategory=results[0].company_category;
			const companyId=results[0].company_id;
      const companyStatus=results[0].company_status;
      return [companyToken,companyName,companyDescription,companyCategory,companyId,companyStatus];
    });
};

// Company info
module.exports.info = ({ companyId }) => {
	// db querys
  const selectCompanyDataStatement = `SELECT company_token,company_name,company_description,
  company_category,company_email,company_department,company_municipality,company_address,company_status,
  company_id FROM company WHERE company_id = ?`;
	const selectCompanyProductsStatement = `SELECT product_id,company_id,product_type,product_name,
  product_price,product_description,product_img
  FROM product WHERE company_id = ?`;
	const selectCompanyFilesStatement = `SELECT company_document_id,company_id,company_document_name,
  company_document_description,company_document_file 
  FROM company_document WHERE company_id = ?`;
  const binds = [companyId];
	let dataCollected=[];
  return db.pool(selectCompanyDataStatement, binds)
		// Company principal data
		.then(results=>{
      const companyId=results[0].company_id;
			const companyToken = results[0].company_token;
			const companyDescription=results[0].company_description;
			const companyCategory=results[0].company_category;
			const companyEmail=results[0].company_email;
			const companyDepartment=results[0].company_department;
      const companyMunicipality=results[0].company_municipality;
      const companyAddress=results[0].company_address;
      const companyStatus=results[0].company_status;
      dataCollected= [{
				companyId:companyId,
				companyToken: companyToken,
				companyDescription:companyDescription,
				companyCategory:companyCategory,
				companyEmail: companyEmail,
        companyDepartment:companyDepartment,
        companyMunicipality:companyMunicipality,
        companyAddress:companyAddress,
        companyStatus:companyStatus,
			}];
		})
    .then(() => db.pool(selectCompanyProductsStatement, binds))
		// Company products
		.then(results=>{
			dataCollected.push({"companyProducts":results});
		})
		.then(() => db.pool(selectCompanyFilesStatement, binds))
		// Company files
    .then(results => {
			dataCollected.push({"companyFiles":results});
      return dataCollected;
    });
};

