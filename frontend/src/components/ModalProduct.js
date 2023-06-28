import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";


const ModalProduct = ({ id, img, name, category, description, price }) => {
   // eslint-disable-next-line 
   const seeInfo = () => {
      console.log("=============");
      console.log("id", id);
      console.log("img", img);
      console.log("name", name);
      console.log("category", category);
      console.log("description", description);
      console.log("price", price);
   };
   
   const [open, setOpen] = useState(false);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
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
         <Button onClick={handleOpen}>Ver</Button>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
         >
            <Box sx={style}>
               <div style={{ margin: "-10%" }}>
                  <div key={id}>
                     <div className="card">
                        <img
                           src={img}
                           className="card-img-top"
                           alt={name}
                           style={{ height: "50vh" }}
                        />
                        <div className="card-body">
                           {category !== undefined && (
                              <h5 className="card-type">
                                 Categoría: {category}
                              </h5>
                           )}
                           <h5 className="card-title">{name}</h5>
                           <p className="card-text">{description}</p>
                           <div className="details-container">
                              <p className="price">Precio: Q.{price}</p>
                           </div>
                        </div>
                        <Button ariant="outlined" color="error" onClick={handleClose}>Cerrar</Button>
                     </div>
                  </div>
               </div>
            </Box>
         </Modal>
      </>
   );
};

export default ModalProduct;
