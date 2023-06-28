import React from "react";
import {
   Typography
} from "@mui/material";

import CardProduct from "../../components/CardProduct";

const ContentProducts = ({ productos, combos }) => {
   function shuffleArray(array) {
      const _array = [...array]
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
               <CardProduct  key={`PP${index}`}
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
               <CardProduct key={`CC${index}`}
               id={combo.combo_id}
               description={combo.combo_description}
               img={combo.combo_img}
               nombre={combo.combo_name}
               precio={combo.combo_price}
               tipo={2}
               elemento = {combo}
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
                  <CardProduct  key={`Pi${index}`}
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
                  <CardProduct key={`Ci${index}`}
                  id={combo.combo_id}
                  description={combo.combo_description}
                  img={combo.combo_img}
                  nombre={combo.combo_name}
                  precio={combo.combo_price}
                  tipo={2}
                  elemento = {combo}
               />
                 
               ))} 
         </div>
      </>
   );
};

export default ContentProducts;
