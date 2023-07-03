import React from "react";
import { Typography, Button } from "@mui/material";

import CardProduct from "../../components/CardProduct";

const ContentProducts = ({ productos, combos,setValue }) => {
   function shuffleArray(array) {
      const _array = [...array];
      for (let i = _array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [_array[i], _array[j]] = [_array[j], _array[i]];
      }
      return _array;
   }

   return (
      <>
         <Typography
            variant="h6"
            component="div"
            style={{ fontWeight: "bold", fontSize: "2rem" }}
         >
            Productos recientes
            <Button
               size="small"
               style={{ marginLeft: "20px" }}
               onClick={() => { setValue("1") }}
            >
               Ver Todos
            </Button>
         </Typography>

         <div
            style={{
               overflowX: "scroll",
               whiteSpace: "nowrap",
               marginTop: "15px",
               marginBottom: "15px",
            }}
         >
            {productos.slice(-5).map((product, index) => (
               <CardProduct
                  key={`PP${index}`}
                  company={product.company_name}
                  id={product.product_id}
                  description={product.product_description}
                  category={product.product_type}
                  img={product.product_img}
                  nombre={product.product_name}
                  precio={product.product_price}
                  tipo={1}
                  elemento={product}
               />
            ))}
         </div>

         <Typography
            variant="h6"
            component="div"
            style={{ fontWeight: "bold", fontSize: "2rem" }}
         >
            Combos recientes

            <Button
               size="small"
               style={{ marginLeft: "20px" }}
               onClick={() => { setValue("2") }}
            >
               Ver Todos
            </Button>
         </Typography>

         <div
            style={{
               overflowX: "scroll",
               whiteSpace: "nowrap",
               marginTop: "15px",
               marginBottom: "15px",
            }}
         >
            {combos.slice(-5).map((combo, index) => (
               <CardProduct
                  key={`CC${index}`}
                  company={combo.company_name}
                  id={combo.combo_id}
                  description={combo.combo_description}
                  img={combo.combo_img}
                  nombre={combo.combo_name}
                  precio={combo.combo_price}
                  tipo={2}
                  elemento={combo}
               />
            ))}
         </div>

         {/* <ExploreByCategories setCategoryFilter={setCategoryFilter}/> */}

         <Typography
            variant="h6"
            component="div"
            style={{ fontWeight: "bold", fontSize: "2rem" }}
         >
            Productos que te podrian interesar
            <Button
               size="small"
               style={{ marginLeft: "20px" }}
               onClick={() => { setValue("1") }}
            >
               Ver Todos
            </Button>
         </Typography>

         <div
            style={{
               overflowX: "scroll",
               whiteSpace: "nowrap",
               marginTop: "15px",
               marginBottom: "15px",
            }}
         >
            {shuffleArray(productos)
               .slice(-5)
               .map((product, index) => (
                  <CardProduct
                     company={product.company_name}
                     key={`Pi${index}`}
                     id={product.product_id}
                     description={product.product_description}
                     category={product.product_type}
                     img={product.product_img}
                     nombre={product.product_name}
                     precio={product.product_price}
                     tipo={1}
                     elemento={product}
                  />
               ))}
         </div>

         <Typography
            variant="h6"
            component="div"
            style={{ fontWeight: "bold", fontSize: "2rem" }}
         >
            Combos que te podrian interesar
            <Button
               size="small"
               style={{ marginLeft: "20px" }}
               onClick={() => { setValue("2") }}
            >
               Ver Todos
            </Button>
         </Typography>

         <div
            style={{
               overflowX: "scroll",
               whiteSpace: "nowrap",
               marginTop: "15px",
               marginBottom: "15px",
            }}
         >
            {shuffleArray(combos)
               .slice(-5)
               .map((combo, index) => (
                  <CardProduct
                     key={`Ci${index}`}
                     company={combo.company_name}
                     id={combo.combo_id}
                     description={combo.combo_description}
                     img={combo.combo_img}
                     nombre={combo.combo_name}
                     precio={combo.combo_price}
                     tipo={2}
                     elemento={combo}
                  />
               ))}
         </div>
      </>
   );
};

export default ContentProducts;
