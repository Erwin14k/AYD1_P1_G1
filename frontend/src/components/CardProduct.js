import React from "react";
import { Typography } from "@mui/material";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ModalProduct from "./ModalProduct";
import ModalAddItem from "./ModalAddItem";

const CardProduct = ({id,company, description,category, img, nombre, precio, tipo, elemento }) => {
   
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
                  style={{ whiteSpace: "normal", height: "3.6rem", overflow: "hidden" }}
               >
                  {nombre}
               </Typography>
               <Typography variant="body2" color="text.secondary" width={345}>
                  Q{precio}
               </Typography>
            </CardContent>
            <CardActions>
               <ModalAddItem
                  id={id} company={company} img={img} name={nombre} category={category} description={description} price={precio} elemnt={elemento}
               />
               {/* <Button size="small">Agrear al carrito</Button> */}
               {/* <Button size="small" onClick={handleOpen}>Ver</Button> */}
               <ModalProduct
                  id={id} company={company} img={img} name={nombre} category={category} description={description} price={precio} 
               />
            </CardActions>
         </Card>
      </>
   );
};

export default CardProduct;
