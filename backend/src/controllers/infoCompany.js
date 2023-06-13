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