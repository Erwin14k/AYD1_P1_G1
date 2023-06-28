import React, { useState } from "react";
import { Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import ModalProduct from "./ModalProduct";

const CardProduct = ({ img, nombre, precio, tipo, elemento }) => {
   

   return (
      <>
         <Card
            sx={{
               maxWidth: 345,
               display: "inline-block",
               margin: "0 8px",
               marginTop: "15px",
            }}
         >
            <CardMedia component="img" height="150" image={img} />
            <CardContent>
               <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  height={60}
               >
                  {nombre}
               </Typography>
               <Typography variant="body2" color="text.secondary" width={345}>
                  Q{precio}
               </Typography>
            </CardContent>
            <CardActions>
               <Button size="small">Agrear al carrito</Button>
               {/* <Button size="small" onClick={handleOpen}>Ver</Button> */}
               <ModalProduct/>
            </CardActions>
         </Card>
      </>
   );
};

export default CardProduct;
