const Company = require("../models/company");
const upload = require('../utils/multerS3').upload;


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
  upload.single('img')(req, res, async (err) => {
    if(req.file !== undefined){
      let args = {
        companyId: req.body.companyId,
        productType:req.body.productType,
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productDescription:req.body.productDescription,
        productImg:req.file.location,
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
    }else{
      return res.status(500).json({ message: 'Img upload failed' });
    }
  });
};

module.exports.editProduct = async (req, res, next) => {
  upload.single('img')(req, res, async (err) => {
    if(req.file !== undefined){
      let args = {
        productId:req.body.productId,
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productDescription:req.body.productDescription,
        productImg:req.file.location,
        productStock:req.body.productStock,
      };
      // Operations on db
      const result=await Company.editProduct(args);
      // response
      return res
        .status(200)
        .json({
          message: `The product: ${args.productName}, was edited successfully!!`,
      });
    }else{
      let args = {
        productId:req.body.productId,
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productDescription:req.body.productDescription,
        productImg:undefined,
        productStock:req.body.productStock,
      };
      // Operations on db
      const result=await Company.editProduct(args);
      // response
      return res
        .status(200)
        .json({
          message: `The product: ${args.productName}, was edited successfully!!`,
      });
    }
  });
};

module.exports.deleteProduct = async (req, res, next) => {
  let args = {
    productId:req.body.productId,
  };
  // Operations on db
  const result=await Company.deleteProduct(args);
  // response
  return res
    .status(200)
    .json({
      message: `The product: ${args.productId}, was deleted successfully!!`,
  });
};


module.exports.newCombo = async (req, res, next) => {
  upload.single('img')(req, res, async (err) => {
    if(req.file !== undefined){
      let args = {
        companyId: req.body.companyId,
        comboName:req.body.comboName,
        comboPrice:req.body.comboPrice,
        comboDescription:req.body.comboDescription,
        comboImg:req.file.location,
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
    }else{
      return res.status(500).json({ message: 'Img upload failed' });
    }
  });
};