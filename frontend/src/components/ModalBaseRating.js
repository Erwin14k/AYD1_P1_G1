import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
/* import {
   Typography,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   TextField,
} from "@mui/material"; */
import swal from "sweetalert";
import Rating from "@mui/material/Rating";

import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ModalBaseRating = ({ order_id, delivery_id, getPedidos }) => {
   const [open, setOpen] = useState(false);
   const [value, setValue] = useState(2);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const setRaiting = async () => {
      if (value === null) {
         return swal({
            title: "Querido Usuario",
            text: "Por favor, califique el pedido",
            icon: "warning",
            button: true,
         });
      }
      console.log("====Raiting====", value);

      const body = {
         deliveryManId: delivery_id,
         rating: value,
         orderId: order_id
      }
      fetch(`http://localhost:4200/user/set-order-rate`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
         },
         body: JSON.stringify(body)
      })
         .then((response) => response.json())
         .then(async (data) => {
            await swal({
               title: `Querido Usuario`,
               text: data.message,
               icon: data.status === 200 ? "success" : "error",
               button: true,
            })
            setOpen(false);
            getPedidos();
         })
         .catch((error) => {
            // Handle any errors that occur during the request
            console.error('Error:', error)
         });
   };

   const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
   };

   return (
      <>
         <Button variant="outlined" onClick={handleOpen}>
            Calificar
         </Button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
         >
            <Box sx={style}>
               <div style={{ margin: "-10%" }}>
                  <div>
                     <div className="card">
                        <center>
                           <div className="card-body">
                              <h5 className="card-title">Calificar:</h5>
                              <br />
                              <Rating
                                 name="simple-controlled"
                                 value={value}
                                 onChange={(event, newValue) => {
                                    setValue(newValue);
                                 }}
                              />
                              <br />
                              <br />
                              <Button variant="outlined" onClick={setRaiting}>
                                 Calificar
                              </Button>
                           </div>
                        </center>

                        <Button
                           variant="outlined"
                           color="error"
                           onClick={handleClose}
                        >
                           Cerrar
                        </Button>
                     </div>
                  </div>
               </div>
            </Box>
         </Modal>
      </>
   );
};

export default ModalBaseRating;
