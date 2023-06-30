import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
   Typography,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   TextField,
} from "@mui/material";
import swal from "sweetalert";
import Rating from "@mui/material/Rating";

import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ModalBaseRating = ({ order_id,getPedidos }) => {
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

      await swal({
         title: "Querido Usuario",
         text: "Pedido calificado con exito",
         icon: "success",
         button: true,
      });
      setOpen(false);
      getPedidos();
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
