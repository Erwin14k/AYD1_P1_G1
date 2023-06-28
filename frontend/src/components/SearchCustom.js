import React, { useState } from "react";
import {
   Paper,
   TextField,
   Typography,
   Radio,
   RadioGroup,
   FormControlLabel,
   FormControl,
   FormLabel,
} from "@mui/material";

import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import CardProduct from "./CardProduct";

const SearchCustom = ({ productos, combos, value, name }) => {
   console.log(value);

   const [amountStart, setAmountStart] = useState(0);
   const [amountEnd, setAmountEnd] = useState(6);
   const [amount, setAmount] = useState(
      value === "1" || value === "3" ? productos.length : combos.length
   );
   const headers = [];
   for (let i = 1; i <= amount / 6; i++) {
      headers.push(<h1 key={i}>{i}</h1>);
   }

   const handleChangePage = (event) => {
      event.preventDefault();
      console.log(event.target.value);
      setAmountEnd(event.target.value * 6 + 6);
      setAmountStart(event.target.value * 6);
   };

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

         <Typography
            variant="h6"
            component="div"
            style={{ fontWeight: "bold", fontSize: "2rem" }}
         >
            Productos recientes
         </Typography>

         <div
            style={{
               overflowX: "scroll",
               marginTop: "15px",
               marginBottom: "15px",
            }}
         >
            {value === "1" || value === "3"
               ? productos.map(
                    (product, index) =>
                       index > amountStart &&
                       index <= amountEnd && (
                          <CardProduct
                             img={product.product_img}
                             nombre={product.product_name}
                             precio={product.product_price}
                             tipo={value}
                             elemento = {product}
                          />
                       )
                 )
               : combos.map(
                    (combo, index) =>
                       index > amountStart &&
                       index <= amountEnd && (
                          <CardProduct
                             img={combo.combo_img}
                             nombre={combo.combo_name}
                             precio={combo.combo_price}
                             tipo={value}
                             elemento = {combo}
                          />
                       )
                 )}

            <br />
            <br />
            <center>
               {headers.map((header, index) => (
                  <Button
                     variant="outlined"
                     style={{ marginLeft: "10px" }}
                     value={index}
                     onClick={handleChangePage}
                  >
                     {index + 1}
                  </Button>
               ))}
            </center>
         </div>
      </>
   );
};

export default SearchCustom;

