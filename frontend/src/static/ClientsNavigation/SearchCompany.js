import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardProduct from "../../components/CardProduct";

const SearchCompany = ({ companys, company, products, combos }) => {
   const [crrCompany, setCrrCompany] = useState(undefined);
   const [productosMostrar, setProductosMostrar] = useState(products);
   const [combosMostrar, setCombosMostrar] = useState(combos);

   const [amountStartP, setAmountStartP] = useState(0);
   const [amountEndP, setAmountEndP] = useState(6);

   const [amountStartC, setAmountStartC] = useState(0);
   const [amountEndC, setAmountEndC] = useState(6);

   const getArrP = () => {
      const arr = [];
      for (let i = 1; i <= Math.ceil(productosMostrar.length / 6); i++) {
         arr.push(i);
      }
      return arr;
   };

   const handleChangePageP = (event) => {
      event.preventDefault();
      setAmountEndP(event.target.value * 6 + 6);
      setAmountStartP(event.target.value * 6);
   };

   const handleChangePageC = (event) => {
      event.preventDefault();
      setAmountEndC(event.target.value * 6 + 6);
      setAmountStartC(event.target.value * 6);
   };

   const getArrC = () => {
      const arr = [];
      for (let i = 1; i <= Math.ceil(combosMostrar.length / 6); i++) {
         arr.push(i);
      }
      return arr;
   };

   const handleChangeCompany = (companySearch) => {
      setCrrCompany(companySearch);
      setProductosMostrar(
         companySearch === undefined
            ? products
            : products.filter(
                 (product) => product.company_id === companySearch.company_id
              )
      );
      setCombosMostrar(
         companySearch === undefined
            ? combos
            : combos.filter(
                 (combo) => combo.company_id === companySearch.company_id
              )
      );
   };

   const ShowCompanys = companys.filter((companyE) => {
      return companyE.company_category === company;
   });

   useEffect(() => {
      setCrrCompany(undefined);
   }, [company]);

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

               <Card
                  sx={{
                     width: "100%",
                     display: "inline-block",
                     marginTop: "15px",
                  }}
               >
                  <CardContent>
                     <Typography
                        variant="h8"
                        component="div"
                        style={{ fontWeight: "bold", fontSize: "1rem" }}
                     >
                        {crrCompany.company_category}
                     </Typography>

                     <Typography
                        variant="h8"
                        component="div"
                        style={{ fontWeight: "bold", fontSize: "1rem" }}
                     >
                        {crrCompany.company_description}
                     </Typography>

                     <Typography
                        variant="h8"
                        component="div"
                        style={{ fontWeight: "bold", fontSize: "1rem" }}
                     >
                        {crrCompany.company_department} ||{" "}
                        {crrCompany.company_municipality}
                     </Typography>

                     <Typography
                        variant="h8"
                        component="div"
                        style={{ fontWeight: "bold", fontSize: "1rem" }}
                     >
                        {crrCompany.company_address}
                     </Typography>
                  </CardContent>
                  {/*<CardActions>
                      <Button
                        size="small"
                        onClick={() => handleChangeCompany(company)}
                     >
                        Ver Productos
                     </Button> 
                  </CardActions>*/}
               </Card>

               <Typography
                  variant="h8"
                  component="div"
                  style={{
                     fontWeight: "bold",
                     fontSize: "1.7rem",
                     marginTop: "50px",
                  }}
               >
                  Productos:
               </Typography>

               <div
                  style={{
                     marginTop: "15px",
                     marginBottom: "15px",
                  }}
               >
                  {productosMostrar.map(
                     (product, index) =>
                        index >= amountStartP &&
                        index < amountEndP && (
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
                        )
                  )}
               </div>

               <br />
               <br />
               <center>
                  {getArrP().map((header, index) => (
                     <Button
                        key={`Bx${index}`}
                        variant="outlined"
                        style={{ marginLeft: "10px" }}
                        value={index}
                        onClick={handleChangePageP}
                     >
                        {index + 1}
                     </Button>
                  ))}
               </center>

               <Typography
                  variant="h8"
                  component="div"
                  style={{ fontWeight: "bold", fontSize: "1.7rem" }}
               >
                  Combos:
               </Typography>

               <div
                  style={{
                     marginTop: "15px",
                     marginBottom: "15px",
                  }}
               >
                  {combosMostrar.map(
                     (combo, index) =>
                        index >= amountStartC &&
                        index < amountEndC && (
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

               <br />
               <br />
               <center>
                  {getArrC().map((header, index) => (
                     <Button
                        key={`Bx${index}`}
                        variant="outlined"
                        style={{ marginLeft: "10px" }}
                        value={index}
                        onClick={handleChangePageC}
                     >
                        {index + 1}
                     </Button>
                  ))}
               </center>
            </>
         )}
      </>
   );
};

export default SearchCompany;
