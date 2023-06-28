import React, { useState, useEffect } from "react";
import {
   Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import ExploreByCategories from "./ExploreByCategories";
import CardProduct from "./CardProduct";

const SearchCustom = ({ productos, combos, value, name}) => {
   const [category, setCategory] = useState("");

   const handleChangeCategory = (categorySearch) => {
      console.log(categorySearch);
      setCategory(categorySearch);
   };

   useEffect(() => {
      console.log("useEffect category");
     
   }, [category]);
   

   var productosMostrar =  value === "3" ? productos.filter((product) => ( product.product_name.toLowerCase().includes(name.toLowerCase()) )) : productos;
   productosMostrar = category !== "" ? productosMostrar.filter((product) => ( product.product_type.toLowerCase() === category.toLowerCase() )) : productosMostrar;

   const combosMostrar = value === "4" ?  combos.filter((combo) =>combo.combo_name.toLowerCase().includes(name.toLowerCase())) : combos;
   const val = value === "1" || value === "3" ? productosMostrar.length : combosMostrar.length;
   const [amountStart, setAmountStart] = useState(0);
   const [amountEnd, setAmountEnd] = useState(6);

   const getArr = () => {
      const arr = [];
      for (let i = 1; i <=Math.ceil(val / 6); i++) {
         arr.push(i);
      }
      return arr;
   };

   const handleChangePage = (event) => {
      event.preventDefault();
      console.log(event.target.value);
      console.log(event.target.value* 6);
      console.log(event.target.value* 6 + 6);
      setAmountEnd(event.target.value * 6 + 6);
      setAmountStart(event.target.value * 6);
   };

   return (
      <>
         {value === "1" || value === "3"? <ExploreByCategories handleChangeCategory={handleChangeCategory} category={category}/> : <></> }

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
               ? productosMostrar.map(
                    (product, index) =>
                       index >= amountStart &&
                       index < amountEnd && (
                          <CardProduct  key={`PS${index}`}
                             img={product.product_img}
                             nombre={product.product_name}
                             precio={product.product_price}
                             tipo={value}
                             elemento = {product}
                          />
                       )
                 )
               : combosMostrar.map(
                    (combo, index) =>
                       index >= amountStart &&
                       index < amountEnd && (
                          <CardProduct  key={`CS${index}`}
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
               {getArr().map((header, index) => (
                  <Button key={`Bx${index}`}
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

