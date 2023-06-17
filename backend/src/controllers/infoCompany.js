const Company = require("../models/company");



module.exports.companyInfo = async (req, res, next) => {
  let args = {
    companyId: req.body.companyId,
  };
  // Operations on db
  const result=await Company.info(args);
  // response
  return res
    .status(200)
    .json({
      messsage: "Data Successfully",
      companyData:result,
  });
};



module.exports.newProduct = async (req, res, next) => {
  let args = {
    companyId: req.body.companyId,
    productType:req.body.productType,
    productName:req.body.productName,
    productPrice:req.body.productPrice,
    productDescription:req.body.productDescription,
    productImg:req.body.productImg,
    productNumberOfSales:req.body.productNumberOfSales,
    productStock:req.body.productStock,
  };
  // Operations on db
  const result=await Company.newProduct(args);
  // response
  return res
    .status(200)
    .json({
      message: `The product: ${args.productName}, was created successfully!!`,
  });
};


module.exports.newCombo = async (req, res, next) => {
  let args = {
    companyId: req.body.companyId,
    comboName:req.body.comboName,
    comboPrice:req.body.comboPrice,
    comboDescription:req.body.comboDescription,
    comboImg:req.body.comboImg,
    comboNumberOfSales:req.body.comboNumberOfSales,
    comboStock:req.body.comboStock,
  };
  // Operations on db
  const result=await Company.newCombo(args);
  // response
  return res
    .status(200)
    .json({
      message: `The Combo: ${args.comboName}, was created successfully!!`,
  });
};