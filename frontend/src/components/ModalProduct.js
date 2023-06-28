import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const ModalProduct = () => {
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
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      pt: 2,
      px: 4,
      pb: 3,
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
            <Box sx={{ ...style, width: 400 }}>
               <h2 id="parent-modal-title">Text in a modal</h2>
               <p id="parent-modal-description">
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
               </p>
               <Button>hola</Button>
            </Box>
         </Modal>
      </>
   );
};

export default ModalProduct;
