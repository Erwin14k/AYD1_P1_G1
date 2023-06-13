// Dependencies imports
const express = require("express");
const app = express();
const mysql = require("./utils/db");
const { server } = require("./config/config");
const cors = require("cors");
const cookies = require("cookie-parser");
const guard = require("./guard/guard");

// Routes imports
const adminRoutes =require("./routes/admin");
const infoAdminRoutes = require("./routes/infoAdmin");
const userRoutes =require("./routes/user");
const infoUserRoutes = require("./routes/infoUser");
const deliveryManRoutes=require('./routes/deliveryMan');
const infoDeliveryManRoutes = require("./routes/infoDeliveryMan");
const companyRoutes=require('./routes/company');
const infoCompanyRoutes = require("./routes/infoCompany");
const invalidRoutes =require ("./routes/404");

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(cookies());
app.use(express.json());
app.use(adminRoutes);
app.use(userRoutes);
app.use(deliveryManRoutes);
app.use(companyRoutes);
app.use(guard);
app.use(infoAdminRoutes);
app.use(infoUserRoutes);
app.use(infoDeliveryManRoutes);
app.use(infoCompanyRoutes);
app.use(invalidRoutes);

// DB start
mysql
  .start()
  .then(() => {
    console.log("Mysql database connected!");
    app.listen(server.port, () => {
      console.log(`Server running on port: ${server.port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });