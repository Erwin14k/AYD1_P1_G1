import React from "react";
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

const ContentProducts = ({ productos, combos }) => {
   function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
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
               <Card
                  key={index}
                  sx={{
                     maxWidth: 345,
                     display: "inline-block",
                     margin: "0 8px",
                  }}
               >
                  <CardMedia
                     sx={{ height: 140 }}
                     image={product.product_img}
                     title="green iguana"
                  />
                  <CardContent>
                     <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{
                           whiteSpace: "normal",
                           height: "3.6rem",
                           overflow: "hidden",
                        }}
                     >
                        {product.product_name}
                     </Typography>
                     <Typography
                        variant="h7"
                        color="text.secondary"
                        style={{
                           whiteSpace: "normal",
                           // height: "6rem",
                           overflow: "hidden",
                        }}
                     >
                        Q{product.product_price}
                     </Typography>
                  </CardContent>
                  <CardActions>
                     <Button size="small">Agrear al carrito</Button>
                     <Button size="small">Ver</Button>
                  </CardActions>
               </Card>
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
            {combos.slice(-5).map((combos, index) => (
               <Card
                  key={index}
                  sx={{
                     maxWidth: 345,
                     display: "inline-block",
                     margin: "0 8px",
                  }}
               >
                  <CardMedia
                     sx={{ height: 140 }}
                     image={combos.combo_img}
                     title="green iguana"
                  />
                  <CardContent>
                     <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{
                           whiteSpace: "normal",
                           height: "3.6rem",
                           overflow: "hidden",
                        }}
                     >
                        {combos.combo_name}
                     </Typography>
                     <Typography
                        variant="h7"
                        color="text.secondary"
                        style={{
                           whiteSpace: "normal",
                           // height: "6rem",
                           overflow: "hidden",
                        }}
                     >
                        Q{combos.combo_price}
                     </Typography>
                  </CardContent>
                  <CardActions>
                     <Button size="small">Agrear al carrito</Button>
                     <Button size="small">Ver</Button>
                  </CardActions>
               </Card>
            ))}
         </div>

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
                  <Card
                     key={index}
                     sx={{
                        maxWidth: 345,
                        display: "inline-block",
                        margin: "0 8px",
                     }}
                  >
                     <CardMedia
                        sx={{ height: 140 }}
                        image={product.product_img}
                        title="green iguana"
                     />
                     <CardContent>
                        <Typography
                           gutterBottom
                           variant="h5"
                           component="div"
                           style={{
                              whiteSpace: "normal",
                              height: "3.6rem",
                              overflow: "hidden",
                           }}
                        >
                           {product.product_name}
                        </Typography>
                        <Typography
                           variant="h7"
                           color="text.secondary"
                           style={{
                              whiteSpace: "normal",
                              // height: "6rem",
                              overflow: "hidden",
                           }}
                        >
                           Q{product.product_price}
                        </Typography>
                     </CardContent>
                     <CardActions>
                        <Button size="small">Agrear al carrito</Button>
                        <Button size="small">Ver</Button>
                     </CardActions>
                  </Card>
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
               .map((combos, index) => (
                  <Card
                     key={index}
                     sx={{
                        maxWidth: 345,
                        display: "inline-block",
                        margin: "0 8px",
                     }}
                  >
                     <CardMedia
                        sx={{ height: 140 }}
                        image={combos.combo_img}
                        title="green iguana"
                     />
                     <CardContent>
                        <Typography
                           gutterBottom
                           variant="h5"
                           component="div"
                           style={{
                              whiteSpace: "normal",
                              height: "3.6rem",
                              overflow: "hidden",
                           }}
                        >
                           {combos.combo_name}
                        </Typography>
                        <Typography
                           variant="h7"
                           color="text.secondary"
                           style={{
                              whiteSpace: "normal",
                              // height: "6rem",
                              overflow: "hidden",
                           }}
                        >
                           Q{combos.combo_price}
                        </Typography>
                     </CardContent>
                     <CardActions>
                        <Button size="small">Agrear al carrito</Button>
                        <Button size="small">Ver</Button>
                     </CardActions>
                  </Card>
               ))}
         </div>
      </>
   );
};

export default ContentProducts;
