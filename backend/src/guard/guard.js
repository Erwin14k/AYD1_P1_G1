const Guard = require("../models/guard");


const guard = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  const TOKEN = req.headers.authorization.split("Bearer ")[1];


  // If the token belongs to the admin
  try {
    const args = { TOKEN };
    const rows = await Guard.verifyAdminToken(args);
    if (rows.length > 0) {
      // Verify if the admin is active
      if(rows[0].adminStatus==="Active"){
        req.body.adminId = rows[0].adminId;
        return next();
      }else{
        return res.status(403).json({
          message: "Unauthorized",
        });
      }
      
    }
  } catch (error) {
    console.log(error);
  }

  // If the token belongs to a user
  try {
    const args = { TOKEN };
    const rows = await Guard.verifyUserToken(args);
    if (rows.length > 0) {
      // Verify if the user is active
      if(rows[0].userStatus==="Active"){
        req.body.userId = rows[0].userId;
        return next();
      }else{
        return res.status(403).json({
          message: "Unauthorized",
        });
      }
      
    }
  } catch (error) {
    console.log(error);
  }

  // If the token belongs to a delivery man
  try {
    const args = { TOKEN };
    const rows = await Guard.verifyDeliveryManToken(args);
    if (rows.length > 0) {
      // Verify if the delivery_man is active
      if(rows[0].deliveryManStatus==="Active"){
        req.body.deliveryManId = rows[0].deliveryManId;
        return next();
      }else{
        return res.status(403).json({
          message: "Unauthorized",
        });
      }
      
    }
  } catch (error) {
    console.log(error);
  }

  // If the token belongs to a company
  try {
    const args = { TOKEN };
    const rows = await Guard.verifyCompanyToken(args);
    if (rows.length > 0) {
      // Verify if the company is active
      if(rows[0].companyStatus==="Active"){
        req.body.companyId = rows[0].companyId;
        return next();
      }else{
        return res.status(403).json({
          message: "Unauthorized",
        });
      }
      
    }
  } catch (error) {
    console.log(error);
  }

  return res.status(403).json({
    message: "Unauthorized",
  });
};

module.exports = guard;