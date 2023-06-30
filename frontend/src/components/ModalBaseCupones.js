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



const ModalBaseCupones = ({ cuponI, setCupon,setTotal,total }) => {
   const [open, setOpen] = useState(false);
   const [cupones, setCupones] = useState([{ id: "1", codigo: "XXJS" }]);

   

   const setCuponHandler = async (cupon) => {
      console.log("cupon", cupon);
      setCupon(cupon);
      setTotal(total - total * 0.1)
    total = total - total * 0.1
      return await swal({
         title: "Querido Usuario",
         text: "Cupon aplicado con exito",
         icon: "success",
         button: true,
      });
   };

   const removeCupon = async () => {
      setCupon(undefined);
      setTotal(total / (1 - 1* 0.1))
      return await swal({
         title: "Querido Usuario",
         text: "Cupon removido con exito",
         icon: "success",
         button: true,
      });
   };

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

    useEffect (() => {
        console.log("here");
    }, [open])

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
            Aplicar Cupon
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
                        <div className="card-body">
                           <h5 className="card-title">Cupones:</h5>

                           <TableContainer component={Paper}>
                              <Table>
                                 <TableHead>
                                    <TableRow>
                                       <TableCell align="right">
                                          Codigo
                                       </TableCell>
                                       <TableCell align="right">
                                          Descripcion
                                       </TableCell>
                                       <TableCell align="right">
                                          Alpicar
                                       </TableCell>
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {cupones.map((cupon, index) => (
                                       <TableRow key={`KC${index}`}>
                                          <TableCell align="right">
                                             {cupon.codigo}
                                          </TableCell>
                                          <TableCell align="right">
                                             Codigo para 10% de descuento
                                          </TableCell>
                                          <TableCell align="right">
                                             {cupon.id === cuponI ? (
                                                <Button
                                                   variant="outlined"
                                                   color="error"
                                                   onClick={() => removeCupon()}
                                                >
                                                   Remover
                                                </Button>
                                             ) : (
                                                <Button
                                                   variant="outlined"
                                                   onClick={() =>
                                                      setCuponHandler(cupon.id)
                                                   }
                                                >
                                                   Aplicar
                                                </Button>
                                             )}
                                          </TableCell>
                                       </TableRow>
                                    ))}
                                 </TableBody>
                              </Table>
                           </TableContainer>
                        </div>
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

export default ModalBaseCupones;
