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
      status:200,
      messsage: "Información de la empresa recuperada con éxito!",
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
        productImgKey: req.file.key
      };
      // Operations on db
      const result=await Company.newProduct(args);
      // response
      return res
        .status(200)
        .json({
          status:200,
          message: `El producto: ${args.productName}, fue creado satisfactoriamente :)`,
      });
    }else{
      return res.status(500).json({ status:500, message: 'Fallo en la carga de la imágen del producto :(' });
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
        productImgKey: req.file.key
      };
      // Operations on db
      const result=await Company.editProduct(args);
      // response
      return res
        .status(200)
        .json({
          status:200,
          message: `El producto: ${args.productName}, fue actualizado satisfactoriamente :)`,
      });
    }else{
      let args = {
        productId:req.body.productId,
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productDescription:req.body.productDescription,
        productImg:undefined,
        productImgKey: undefined,
        productStock:req.body.productStock,
      };
      // Operations on db
      const result=await Company.editProduct(args);
      // response
      return res
        .status(200)
        .json({
          status:200,
          message: `El producto: ${args.productName}, fue actualizado satisfactoriamente :)`,
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
      status:200,
      message: `El producto: ${args.productId}, fue eliminado satisfactoriamente :)`,
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
        comboImgKey: req.file.key
      };
      // Operations on db
      const result=await Company.newCombo(args);
      // response
      return res
        .status(200)
        .json({
          status:200,
          message: `El combo: ${args.comboName}, fue creado satisfactoriamente :)`,
      });
    }else{
      return res.status(500).json({status:500, message: 'Fallo en la carga de la imágen del combo :(' });
    }
  });
};

module.exports.editCombo = async (req, res, next) => {
  upload.single('img')(req, res, async (err) => {
    if(req.file !== undefined){
      let args = {
        comboId:req.body.comboId,
        comboName:req.body.comboName,
        comboPrice:req.body.comboPrice,
        comboDescription:req.body.comboDescription,
        comboImg:req.file.location,
        comboStock:req.body.productStock,
        comboImgKey: req.file.key
      };
      // Operations on db
      const result=await Company.editCombo(args);
      // response
      return res
        .status(200)
        .json({
          status:200,
          message: `El combo: ${args.comboName}, fue actualizado satisfactoriamente :)`,
      });
    }else{
      let args = {
        comboId:req.body.comboId,
        comboName:req.body.comboName,
        comboPrice:req.body.comboPrice,
        comboDescription:req.body.comboDescription,
        comboImg:undefined,
        comboStock:req.body.productStock,
        comboImgKey: undefined
      };
      // Operations on db
      const result=await Company.editCombo(args);
      // response
      return res
        .status(200)
        .json({
          status:200,
          message: `El combo: ${args.comboName}, fue actualizado satisfactoriamente :)`,
      });
    }
  });
};

module.exports.deleteCombo = async (req, res, next) => {
  let args = {
    comboId:req.body.comboId,
  };
  // Operations on db
  const result=await Company.deleteCombo(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: `El combo: ${args.comboId}, fue eliminado satisfactoriamente :)`,
  });
};

// Get top 5 most selled products
module.exports.getMostSelledProducts = async (req, res, next) => {
  let args = {
    companyId:req.body.companyId,
  };
  // Operations on db
  const result=await Company.getMostSelledProducts(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: "Top 5 de los productos más vendidos obtenido con éxito",
      companyData:result,
  });
};

// Get all orders associated to the company
module.exports.getAllCompanyOrders = async (req, res, next) => {
  let args = {
    companyId:req.body.companyId,
  };
  // Operations on db
  const result=await Company.getAllCompanyOrders(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: "Pedidos gestionados por esta empresa recuperados con éxito!!",
      companyData:result,
  });
};

// Approve orders
module.exports.approveOrder = async (req, res, next) => {
  let args = {
    orderId:req.body.orderId,
  };
  // Operations on db
  const result=await Company.approveOrder(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: `El pedido No.: ${args.orderId}, fue aprobado satisfactoriamente :)`,
  });
};


// Get all waiting orders associated to the company
module.exports.getAllWaitingCompanyOrders = async (req, res, next) => {
  let args = {
    companyId:req.body.companyId,
  };
  // Operations on db
  const result=await Company.getAllWaitingCompanyOrders(args);
  // response
  return res
    .status(200)
    .json({
      status:200,
      message: "Pedidos en espera de aprobación por esta empresa recuperados con éxito!!",
      companyData:result,
  });
};
