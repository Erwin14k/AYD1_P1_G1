import React from "react";
import {
   Typography
} from "@mui/material";

import Card from "@mui/material/Card";
   
const ExploreByCategories = () => {


   return (
      <>
         <Typography
            variant="h6"
            component="div"
            style={{ fontWeight: "bold", fontSize: "2rem" }}
         >
            Explorar por categoría
         </Typography>

         <div
            style={{
               overflowX: "scroll",

               marginTop: "15px",
               marginBottom: "15px",
            }}
         >
            {[
               {
                  tipo: "Entradas",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/fastfood.png",
               },
               {
                  tipo: "Platos Fuertes",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/pizza.png",
               },
               {
                  tipo: "Postres",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/dessert.png",
               },
               {
                  tipo: "Bebidas",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png",
               },
               {
                  tipo: "Medicamento",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/pharmacy-v2.png",
               },
               {
                  tipo: "Producto Básico",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/convenience.png",
               },
            ].map((card, index) => (
               <Card
                  key={index}
                  style={{
                     display: "inline-block",
                     margin: "0 8px",
                     width: "150px",
                  }}
               >
                  <div className="d-flex flex-column align-items-center">
                     <img src={card.img} alt="Logo" width="50" />
                     <span className="text-center"> {card.tipo}</span>
                  </div>
               </Card>
            ))}
         </div>
      </>
   );
};

export default ExploreByCategories;
