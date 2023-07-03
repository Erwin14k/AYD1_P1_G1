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
import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ModalOrden = ({ items, total, tipo, comision }) => {
   //console.log("items", items);
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   // useEffect(() => {

   // }, [open]);

   const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      // height: '90%',
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
   };


   return (
      <>
         <Button variant="outlined" onClick={handleOpen} style={{marginLeft:"10px"}}>
            Ver
         </Button>

         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
         >
            <Box sx={style}>
               <TableContainer component={Paper} style={{ marginBottom: "2%" }}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell>Nombre del Item</TableCell>
                           <TableCell align="right">Unidades</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {items.map((pedido, index) => (
                           <TableRow key={`PP${index}`}>
                              <TableCell align="left">
                                 {pedido.combo_name === null
                                    ? pedido.product_name
                                    : pedido.combo_name}
                              </TableCell>
                              <TableCell align="right">
                                 {pedido.product_ammount}
                              </TableCell>
                           </TableRow>
                        ))}
                        <TableRow>
                        <TableCell colSpan={2} align="right" style={{ backgroundColor: 'grey', padding: '0px' }}>
                              .
                           </TableCell>
                         
                        </TableRow>
                        <TableRow>
                           <TableCell colSpan={1} align="right">
                              Total pedido:
                           </TableCell>
                           <TableCell align="right"> Q{total}</TableCell>
                        </TableRow>

                        {
                          tipo != 0  &&  <TableRow>
                           <TableCell colSpan={1} align="right">
                              Comision Repartidor:
                           </TableCell>
                           <TableCell align="right"> Q{comision}</TableCell>
                        </TableRow>
                        }

                        
                     </TableBody>
                  </Table>
               </TableContainer>
               <Button variant="outlined" color="error" onClick={handleClose}>
                  Cerrar
               </Button>
            </Box>
         </Modal>
      </>
   );
};

export default ModalOrden;
