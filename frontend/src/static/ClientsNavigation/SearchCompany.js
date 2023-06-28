import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import CardProduct from "../../components/CardProduct";
const SearchCompany = ({ companys, company, products, combos }) => {
   const [crrCompany, setCrrCompany] = useState(undefined);

   const [productosMostrar, setProductosMostrar] = useState(products);
   const [combosMostrar, setCombosMostrar] = useState(combos);

   console.log("==crrCompany", crrCompany);

   const handleChangeCompany = (companySearch) => {
      console.log(companySearch);
      setCrrCompany(companySearch);
      setProductosMostrar( companySearch === undefined ? products: products.filter((product) => product.company_id === companySearch.company_id) );
      setCombosMostrar( companySearch === undefined ? combos: combos.filter((combo) => combo.company_id === companySearch.company_id));

      //console.log("==productosMostrar", products.filter((product) => product.company_id === companySearch.company_id));
      // console.log("==", products);
      console.log("==", combos);
   };

   const ShowCompanys = companys.filter((companyE) => {
      return companyE.company_category === company;
   });

   useEffect(() => {
      setCrrCompany(undefined);
   }, [company]);

   // var productosMostrar = products.filter((product) => product.company_id === crrCompany.company_id);

   return (
      <>
         {crrCompany === undefined ? (
            ShowCompanys.map((company) => (
               <Card
                  sx={{
                     maxWidth: 170,
                     display: "inline-block",
                     margin: "0 8px",
                     marginTop: "15px",
                  }}
               >
                  <CardContent>
                     <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        height={60}
                     >
                        {company.company_name}
                     </Typography>
                     <Typography
                        variant="body2"
                        color="text.secondary"
                        style={{
                           whiteSpace: "normal",
                           height: "4rem",
                           overflow: "hidden",
                        }}
                     >
                        {company.company_description}
                     </Typography>
                  </CardContent>
                  <CardActions>
                     <Button
                        size="small"
                        onClick={() => handleChangeCompany(company)}
                     >
                        Ver Productos
                     </Button>
                  </CardActions>
               </Card>
            ))
         ) : (
            <>
               <Typography
                  variant="h6"
                  component="div"
                  style={{ fontWeight: "bold", fontSize: "2rem" }}
               >
                  {crrCompany.company_name}
                  <Button
                     size="small"
                     style={{ marginLeft: "20px" }}
                     onClick={() => handleChangeCompany(undefined)}
                  >
                     Cerrar
                  </Button>
               </Typography>

               <Typography
                  variant="h8"
                  component="div"
                  style={{ fontWeight: "bold", fontSize: "1.7rem" }}
               >
                  Productos:
               </Typography>

               <div
                  style={{
                     overflowX: "scroll",
                     marginTop: "15px",
                     marginBottom: "15px",
                  }}
               >
                  {productosMostrar.map((product, index) => (
                     <CardProduct
                        key={`PS${index}`}
                        id={product.product_id}
                        company={product.company_name}
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
                  variant="h8"
                  component="div"
                  style={{ fontWeight: "bold", fontSize: "1.7rem" }}
               >
                  Combos:
               </Typography>

               <div
                  style={{
                     overflowX: "scroll",
                     marginTop: "15px",
                     marginBottom: "15px",
                  }}
               >
                  {combosMostrar.map(
                    (combo, index) =>(
                          <CardProduct
                             key={`CS${index}`}
                             id={combo.combo_id}
                             company={combo.company_name}
                             description={combo.combo_description}
                             img={combo.combo_img}
                             nombre={combo.combo_name}
                             precio={combo.combo_price}
                             tipo={2}
                             elemento={combo}
                          />
                       )
                 )}
               </div>


            </>
         )}
      </>
   );
};

export default SearchCompany;
