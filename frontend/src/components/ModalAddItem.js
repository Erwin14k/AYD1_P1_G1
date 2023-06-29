import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import swal from 'sweetalert';
import Cookie from 'cookie-universal'
const cookies = Cookie()


const ModalAddItem = ({
   id,
   img,
   name,
   category,
   description,
   price,
   company,
   elemnt
}) => {
   var crr_user = cookies.get("crr_user")

   useEffect(() => {
      crr_user = cookies.get("crr_user")
   }, [crr_user])

   // eslint-disable-next-line
   const seeInfo = () => {
      console.log("=============");
      console.log("id", id);
      console.log("img", img);
      console.log("name", name);
      console.log("category", category);
      console.log("description", description);
      console.log("price", price);
      console.log("company", company);
      console.log("elemnt", elemnt);
   };

   const [open, setOpen] = useState(false);
   const [amount, setAmount] = useState(1);

   const handleOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setAmount(1)
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

   const ChangeValue = async(value) => {
      const temp =  parseInt(amount) + parseInt(value)

      if(temp <= 0)
      return await swal({
         title: "Cantidad de Items",
         text: "La cantidad debe ser mayor a 0",
         icon: "warning",
         button: true,
      });

      if(temp > 50)
      return await swal({
         title: "Cantidad maxima de Items",
         text: "La cantidad maxima de items es 50",
         icon: "warning",
         button: true,
      });

      setAmount(temp)
   }

   const ChangeValueTextFild = async(event) => {
      const temp =  parseInt(event.target.value)

      if(temp <= 0)
      return await swal({
         title: "Cantidad de Items",
         text: "La cantidad debe ser mayor a 0",
         icon: "warning",
         button: true,
      });

      if(temp > 50){
         setAmount(50)
         return await swal({
            title: "Cantidad maxima de Items",
            text: "La cantidad maxima de items es 50",
            icon: "warning",
            button: true,
         });
      }

      if (isNaN(temp)) {
         setAmount(1)
         return await swal({
            title: "Querido Usuario",
            text: "Solo se permiten digitos",
            icon: "warning",
            button: true,
         });
       }
     
      setAmount(temp)
   }

   const addItem = (e) => {
      e.preventDefault();
      // console.log("Agregando al carrito",amount);
      //seeInfo();
      const temp = {
         producto: category === undefined ? undefined : elemnt,
         cantidad: amount,
         combo: category === undefined ? elemnt : undefined,
      }
      const companyTemp = elemnt.company_id

      if(crr_user.carrito.length !== 0){
         const company_idTemp = crr_user.carrito[0].combo === undefined ? crr_user.carrito[0].producto.company_id : crr_user.carrito[0].combo.company_id
         // console.log("company_idTemp", company_idTemp);
         if(companyTemp !== company_idTemp){
            return swal({
               title: "Carrito",
               text: "Solo puedes agregar productos de una sola empresa",
               icon: "warning",
               button: true,
            });
         }
      }
      crr_user.carrito.push(temp)
      cookies.set("crr_user", crr_user, { path: "/" })
   }

   return (
      <>
         <Button variant="outlined" onClick={handleOpen}>Agrear al carrito</Button>
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
                           style={{ height: "15vh" }}
                        />
                        <div className="card-body">
                           <h5 className="card-title">{name}</h5>
                           <p className="card-text">{description}</p>
                           <div className="details-container">
                              <p className="price">Precio: Q.{price}</p>
                           </div>
                           <center>
                           <div style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                           }}>
                              <Button variant="contained" onClick={() =>ChangeValue(-1)} style={{marginRight: "20px"}}>
                                 -
                              </Button>
                              <TextField
                                 id="outlined-basic"
                                 label="Cantidad"
                                 variant="outlined"
                  
                                 value={amount}
                                 onChange={ChangeValueTextFild}
                              />
                              <Button variant="contained" onClick={() => ChangeValue(1)} style={{marginLeft: "20px"}}>
                                 +
                              </Button>
                           </div>
                           <br />
                           <Button variant="contained" onClick={addItem}>
                              Agregar
                           </Button>
                           </center>
                        </div>
                        <Button
                           ariant="outlined"
                           color="error"
                           onClick={handleClose}
                        >
                           Cancelar
                        </Button>
                     </div>
                  </div>
               </div>
            </Box>
         </Modal>
      </>
   );
};

export default ModalAddItem;
