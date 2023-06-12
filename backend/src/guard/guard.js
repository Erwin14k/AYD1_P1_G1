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
  const USER_TOKEN = req.headers.authorization.split("Bearer ")[1];
  try {
    const args = { USER_TOKEN };
    const rows = await Guard.verifyUserToken(args);
    if (rows.length > 0) {
      req.body.userId = rows[0].userId;
      return next();
    }
  } catch (error) {
    console.log(error);
  }
  return res.status(403).json({
    message: "Unauthorized",
  });
};

module.exports = guard;