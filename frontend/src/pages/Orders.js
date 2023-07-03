import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import NavBarModule from "../static/NavBar/NavBarModule";
import {
   Typography,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
/*    TextField, */
   Radio,
   RadioGroup,
   FormControlLabel,
   FormControl,
   FormLabel,
   Button,
} from "@mui/material";
import moment from "moment";
import ModalBaseRating from "../components/ModalBaseRating";
import ModalOrden from "../components/ModalOrden";
import Cookie from "cookie-universal";
const cookies = Cookie();

function Orders({ noUrl }) {
   const [orders, setOrders] = useState([]);
   const [value, setValue] = useState("Todos");
   const [showOrders, setShowOrders] = useState([]);

   const handleChange = (event) => {
      setValue(event.target.value);

      if (event.target.value === "Todos") {
         setShowOrders(orders);
      } else {
         setShowOrders(
            orders.filter((order) => order.order_status === event.target.value)
         );
      }
   };

   const getPedidos = () => {
      const crr_user = cookies.get("crr_user");

      //console.log("====pedidos====");
      fetch(`http://localhost:4200/user/get-all-orders`, {
         method: "GET",
         headers: {
            Authorization: `Bearer ${crr_user.data[0].authToken}`,
         },
      })
         .then((response) => response.json())
         .then((data) => {
            console.log("===pedidos===", data);
            //console.log("Datos pedidos", data.UserData[0].orders);
            // console.log("Datos pedidos", data.UserData[0].orders[0]);
            
           
            setOrders(data.UserData);
            setShowOrders(data.UserData);
         })
         .catch((error) => {
            // Handle any errors that occur during the request
            console.error("Error:", error);
         });
   };

   useEffect(() => {
      getPedidos();
   }, []);

   return (
      <div style={{ width: "90%", margin: "auto", marginTop: "8%" }}>
         <NavBar customContend={<NavBarModule noUrl={noUrl} />} />

         <div>
            <Typography variant="h5" gutterBottom>
               Pedidos
            </Typography>
            <br />
            <FormControl>
               <FormLabel id="demo-radio-buttons-group-label">
                  Filtrar por:
               </FormLabel>

               <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="5"
                  name="radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                  row
               >
                  <FormControlLabel
                     value="Esperando"
                     control={<Radio />}
                     label="Esperando"
                  />
                  <FormControlLabel
                     value="Entregado"
                     control={<Radio />}
                     label="Entregado"
                  />
                  <FormControlLabel
                     value="Calificado"
                     control={<Radio />}
                     label="Calificado"
                  />
                  <FormControlLabel
                     value="Todos"
                     control={<Radio />}
                     label="Todos"
                  />
               </RadioGroup>
            </FormControl>
            <br /> <br />
            <TableContainer component={Paper} style={{marginBottom:"2%"}}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Fecha Generada</TableCell>
                        <TableCell align="right">Empresa</TableCell>
                        <TableCell align="right">Estado</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Acción</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {showOrders.map((orden, index) => (
                        <TableRow key={`PP${index}`}>
                           <TableCell align="right">{orden.order_id}</TableCell>

                           <TableCell align="right">
                              {moment(orden.order_date).format(
                                 "DD/MM/YYYY HH:mm"
                              )}
                           </TableCell>

                           <TableCell align="right">
                              {orden.company_name}
                           </TableCell>

                           <TableCell align="right">
                              {orden.order_status}
                           </TableCell>

                           <TableCell align="right">
                              {orden.order_total}
                           </TableCell>

                           <TableCell align="right">

                           {orden.order_status === "Entregado" && (
                                 <ModalBaseRating
                                    order_id={orden.order_id}
                                    delivery_id={orden.delivery_man_id}
                                    getPedidos={getPedidos}

                                  
                                 />
                              )}

                                 <ModalOrden items={orden.items}   total={orden.order_total} tipo={0} comision={orden.order_commission}/>

                             
                           </TableCell>

                          

                        </TableRow>
                     ))}

                     {/* <TableRow>
                        <TableCell colSpan={6} align="right">
                           <Button variant="outlined" color="success">
                              Confirmar Orden
                           </Button>
                        </TableCell>
                     </TableRow> */}

                  </TableBody>
               </Table>
            </TableContainer>
         </div>
      </div>
   );
}

export default Orders;
