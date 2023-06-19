const db = require('../utils/db');
const { DeleteObjectCommand} = require("@aws-sdk/client-s3");
const amazonConfig = require("../config/amazonS3");

module.exports.hashPassword = ({ companyEmail }) => {
  const SQL_HASH_PASSWORD = `SELECT company_password FROM company WHERE company_email = ?`;
	const binds = [companyEmail];
  return db.pool(SQL_HASH_PASSWORD, binds);
};

// Registering a new company on the db
module.exports.register = async (companyName, companyDescription,companyCategory, companyEmail,
                                companyPassword,companyDepartment,companyMunicipality,companyAddress,companyFile,companyFileKey) => {
  const statement = `INSERT INTO company (company_name, company_description, company_category, company_email,
                      company_password,company_department,company_municipality,company_address,company_status,admin_id,company_file,company_file_key) 
                      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
  const binds = [companyName,companyDescription,companyCategory,companyEmail,companyPassword,
                companyDepartment,companyMunicipality,companyAddress,'Waiting',-1,companyFile,companyFileKey];
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
  company_id,company_file FROM company WHERE company_id = ?`;
	const selectCompanyProductsStatement = `SELECT product_id,company_id,product_type,product_name,
  product_price,product_description,product_img,product_number_of_sales,product_stock
  FROM product WHERE company_id = ?`;
	const selectCompanyCombosStatement = `SELECT combo_id,company_id,combo_name,combo_price,
  combo_description,combo_img,combo_number_of_sales,combo_stock 
  FROM combo WHERE company_id = ?`;
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
      const companyFile=results[0].company_file;
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
        companyFile:companyFile,
			}];
		})
    .then(() => db.pool(selectCompanyProductsStatement, binds))
		// Company products
		.then(results=>{
			dataCollected.push({"companyProducts":results});
		})
		.then(() => db.pool(selectCompanyCombosStatement, binds))
		// Company files
    .then(results => {
			dataCollected.push({"companyCombos":results});
      return dataCollected;
    });
};


// Registering a new product associated to the company on the db
module.exports.newProduct = async ({companyId, productType,productName, productPrice,
  productDescription,productImg,productNumberOfSales,productStock,productImgKey}) => {
  const statement = `INSERT INTO product (company_id, product_type, product_name, product_price,
    product_description,product_img,product_number_of_sales,product_stock,product_img_key) 
    VALUES (?,?,?,?,?,?,?,?,?)`;
//bindings
  const binds = [companyId,productType,productName,productPrice,productDescription,
  productImg,productNumberOfSales,productStock,productImgKey];
  return(await db.pool(statement, binds));
};


// Editing a product associated to the company on the db
module.exports.editProduct = async ({productId,productName, productPrice,
  productDescription,productImg,productStock,productImgkey}) => {

  if(productName!==undefined){
    const updateProductNameStatement = `UPDATE product SET product_name = ? WHERE product_id = ?`;
    //bindings
    const binds = [productName,productId];
    await db.pool(updateProductNameStatement, binds);
  }
  if(productPrice!==undefined){
    const updateProductPriceStatement = `UPDATE product SET product_price = ? WHERE product_id = ?`;
    //bindings
    const binds = [productPrice,productId];
    await db.pool(updateProductPriceStatement, binds);
  }
  if(productDescription!==undefined){
    const updateProductDescriptionStatement = `UPDATE product SET product_description = ? WHERE product_id = ?`;
    //bindings
    const binds = [productDescription,productId];
    await db.pool(updateProductDescriptionStatement, binds);
  }
  if(productStock!==undefined){
    const updateProductStockStatement = `UPDATE product SET product_stock = ? WHERE product_id = ?`;
    //bindings
    const binds = [productStock,productId];
    await db.pool(updateProductStockStatement, binds);
  }
  if(productImg!==undefined){
    const selectProductImgStatement = `SELECT product_img_key FROM product WHERE product_id = ?`;
    //bindings
    const selectBinds = [productId];
    const result=await db.pool(selectProductImgStatement, selectBinds);
    // Delete element from S3
    const deleteParams = {
      Bucket: amazonConfig.bucketName,
      Key: result[0].product_img_key,
    };
    const commandDelete = new DeleteObjectCommand(deleteParams);
    await s3.send(commandDelete);

    // Update img file
    const updateProductImgStatement = `UPDATE product SET product_img = ?, product_img_key = ? WHERE product_id = ?`;
    //bindings
    const binds = [productImg,productImgkey,productId];
    await db.pool(updateProductImgStatement, binds);
  }
  
};

// Deleting a product
module.exports.deleteProduct = async ({productId}) => {
  const statement = `DELETE FROM product WHERE product_id = ?`;
  // bindings
  const binds = [productId];
  return await db.pool(statement, binds);
};





// Registering a new combo associated to the company on the db
module.exports.newCombo = async ({companyId,comboName,comboPrice, comboDescription,
  comboImg,comboNumberOfSales,comboStock}) => {
  const comboStatement = `INSERT INTO combo (company_id, combo_name, combo_price, combo_description,
  combo_img,combo_number_of_sales,combo_stock) 
  VALUES (?,?,?,?,?,?,?)`;
//bindings
  const comboBinds = [companyId,comboName,comboPrice,comboDescription,comboImg,comboNumberOfSales,comboStock];
  return(await db.pool(comboStatement, comboBinds));
};

