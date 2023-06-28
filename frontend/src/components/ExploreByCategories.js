import React from "react";
import {
   Typography
} from "@mui/material";

import Card from "@mui/material/Card";
   
const ExploreByCategories = ({handleChangeCategory,category}) => {


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
                  valor : "Entradas"
               },
               {
                  tipo: "Platos Fuertes",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/pizza.png",
                  valor : "Platos Fuertes"
               },
               {
                  tipo: "Postres",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/dessert.png",
                  valor : "Postres"
               },
               {
                  tipo: "Bebidas",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png",
                  valor : "Bebidas"
               },
               {
                  tipo: "Medicamento",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/pharmacy-v2.png",
                  valor: "Medicamento"
               },
               {
                  tipo: "Producto Básico",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/convenience.png",
                  valor : "Producto Básico"
               },
               {
                  tipo: "Ver todos",
                  img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/deals.png",
                  valor : ""
               },
            ].map((card, index) => (
               <Card
                  key={`Ex${index}`}
                  style={{
                     display: "inline-block",
                     margin: "0 8px",
                     width: "150px",
                     backgroundColor: category === card.valor  ? "#f50057" : "#fff",
                  }}
                  onClick={() => handleChangeCategory(card.valor)}
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
