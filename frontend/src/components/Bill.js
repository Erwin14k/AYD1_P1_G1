import React, { useEffect, useState } from "react";
import {
   Typography,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   Button,
   TextField,
} from "@mui/material";
import ModalBaseCupones from "./ModalBaseCupones";
import swal from "sweetalert";
import ModalProduct from "./ModalProduct";
import Cookie from "cookie-universal";
const cookies = Cookie();

const Bill = () => {
   const [items, setItems] = useState([]);
   const [companys, setCompanys] = useState("");
   const [cupon, setCupon] = useState(undefined);
   const [total, setTotal] = useState(0);
   const [subtotal, setSubtotal] = useState(0);

   const getCompany = () => {
      const crr_user = cookies.get("crr_user");
      // console.log("====Company====");
      fetch(`http://${process.env.REACT_APP_PUERTO}:4200/user/get-all-companies`, {
         method: "GET",
         headers: {
            /* "Content-Type": "application/json", */
            Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
         },
      })
         .then((response) => response.json())
         .then((data) => {
            //console.log('===Combos===',data);
            // console.log("Datos Company", data.adminData[0].companies);
            setCompanys(data.adminData[0].companies);
         })
         .catch((error) => {
            // Handle any errors that occur during the request
            console.error("Error:", error);
         });
   };

   const getSubtotal = (array) => {
      const subtotal = array.reduce((acc, item) => {
         const itemPrice =
            item.producto !== undefined
               ? item.producto.product_price
               : item.combo.combo_price;

         return acc + itemPrice * item.cantidad;
      }, 0);
      return subtotal;
   };

   useEffect(() => {
      var crr_user = cookies.get("crr_user");
      setItems(crr_user.carrito);
      console.log("carrito", crr_user.carrito);
      getCompany();
      const tempSubtotal = getSubtotal(crr_user.carrito);
      setSubtotal(tempSubtotal);
      setTotal(tempSubtotal);
   }, []);

   const deleteItem = (e) => {
      e.preventDefault();
      //console.log("Eliminando del carrito", e.target.value);
      const temp = items.filter((item, index) => index != e.target.value);

      setItems(temp);
      var crr_user = cookies.get("crr_user");
      crr_user.carrito = temp;
      cookies.set("crr_user", crr_user, { path: "/" });

      //console.log("Temp", temp);
   };

   const chanceValue = async (event, indice) => {
      event.preventDefault();

      if (event.target.value <= 0) {
         event.target.value = 1;
         return await swal({
            title: "Querido Usuario",
            text: "No se puede ingresar valores menores a 1",
            icon: "warning",
            button: true,
         });
      }

      if (event.target.value > 50) {
         event.target.value = 50;
         return await swal({
            title: "Querido Usuario",
            text: "El maximo de items es 50",
            icon: "warning",
            button: true,
         });
      }

      // console.log("Cambiando valor", event.target.value,"Indice", indice);
      const temp = items.map((item, index) => {
         if (index == indice) {
            item.cantidad = parseInt(event.target.value);
         }
         return item;
      });

      setItems(temp);
      var crr_user = cookies.get("crr_user");
      crr_user.carrito = temp;
      cookies.set("crr_user", crr_user, { path: "/" });
   };

   const generateBill = async (e) => {
      e.preventDefault();
      //console.log("Generando Factura",items);
      if (items.length === 0) {
         return swal({
            title: "Querido Usuario",
            text: "No hay items en el carrito",
            icon: "warning",
            button: true,
         });
      }

      const temp = items.map((item, index) => {
         var tempData = {};
         tempData.ammount = item.cantidad;
         if (item.producto !== undefined) {
            tempData.product_id = item.producto.product_id;
            tempData.product_name = item.producto.product_name;
            tempData.combo_id = undefined;
            tempData.combo_name = undefined;
         } else {
            tempData.product_id = undefined;
            tempData.product_name = undefined;
            tempData.combo_id = item.combo.combo_id;
            tempData.combo_name = item.combo.combo_name;
         }
         
         return tempData;
      });

      var crr_user = cookies.get("crr_user");
      const company_id =
         crr_user.carrito[0].combo === undefined
            ? crr_user.carrito[0].producto.company_id
            : crr_user.carrito[0].combo.company_id;
      const departamentoCompany = companys.filter(
         (company) => company.company_id === company_id
      )[0].company_department;

      const data = {
         user_id: crr_user.data[0].userId,
         company_id: company_id,
         coupon_id: cupon,
         total: total,
         comision: total * 0.05,
         departamentCompany: departamentoCompany,
         items: temp,
      };

      console.log("=====GENRRAR=======");
      console.log( data);
      console.log( JSON.stringify(data));
      fetch(`http://${process.env.REACT_APP_PUERTO}:4200/user/generate-order`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
         },
         body: JSON.stringify(data),
      })
         .then((response) => {
            return response.json();
         })
         .then(async (data) => {
            await swal({
               title: "Querido Usuario",
               text: data.message,
               icon: data.status === 200 ? "success" : "error",
               button: true,
            });

            if (data.status === 200) {
               var crr_user = cookies.get("crr_user");
               crr_user.carrito = [];
               setItems([]);
               setTotal(0);
               setSubtotal(0);
               setCupon(undefined)
               cookies.set("crr_user", crr_user, { path: "/" });
            }
         })
         .catch((error) => {
            console.log("Error en la solicitud:", error);
         });
   };

   return (
      <div>
         <Typography variant="h5" gutterBottom>
            Carrito de Compras
         </Typography>
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Nombre del Producto</TableCell>
                     <TableCell align="right">Item</TableCell>
                     <TableCell align="right">Eliminar</TableCell>
                     <TableCell align="right">Precio</TableCell>
                     <TableCell align="right">Unidades</TableCell>
                     <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {items.map((item, index) => (
                     <TableRow key={index}>
                        {item.combo !== undefined ? (
                           <>
                              <TableCell>{item.combo.combo_name}</TableCell>
                              <TableCell align="right">
                                 <ModalProduct
                                    id={item.combo.combo_id}
                                    company={item.combo.company_name}
                                    img={item.combo.combo_img}
                                    name={item.combo.combo_name}
                                    description={item.combo.combo_description}
                                    price={item.combo.combo_price}
                                 />
                              </TableCell>
                              <TableCell align="right">
                                 <Button
                                    value={index}
                                    variant="outlined"
                                    color="error"
                                    onClick={deleteItem}
                                 >
                                    Eliminar
                                 </Button>
                              </TableCell>
                              <TableCell align="right">
                                 Q{item.combo.combo_price}
                              </TableCell>
                              <TableCell align="right">
                                 {/* {item.cantidad} */}
                                 <TextField
                                    id="outlined-number"
                                    label=""
                                    type="number"
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                    defaultValue={item.cantidad}
                                    onChange={(e) => chanceValue(e, index)}
                                    sx={{ width: "70px" }}
                                 />
                              </TableCell>
                              <TableCell align="right">
                                 Q
                                 {(
                                    item.combo.combo_price * item.cantidad
                                 ).toFixed(2)}
                              </TableCell>
                           </>
                        ) : (
                           <>
                              <TableCell>
                                 {item.producto.product_name}
                              </TableCell>
                              <TableCell align="right">
                                 <ModalProduct
                                    id={item.producto.product_id}
                                    company={item.producto.company_name}
                                    img={item.producto.product_img}
                                    name={item.producto.product_name}
                                    description={
                                       item.producto.product_description
                                    }
                                    price={item.producto.product_price}
                                    category={item.producto.product_type}
                                 />
                              </TableCell>
                              <TableCell align="right">
                                 <Button
                                    value={index}
                                    variant="outlined"
                                    color="error"
                                    onClick={deleteItem}
                                 >
                                    Eliminar
                                 </Button>
                              </TableCell>
                              <TableCell align="right">
                                 Q{item.producto.product_price}
                              </TableCell>
                              <TableCell align="right">
                                 {/* {item.cantidad} */}
                                 <TextField
                                    id="outlined-number"
                                    label=""
                                    type="number"
                                    InputLabelProps={{
                                       shrink: true,
                                    }}
                                    defaultValue={item.cantidad}
                                    onChange={(e) => chanceValue(e, index)}
                                    sx={{ width: "70px" }}
                                 />
                              </TableCell>
                              <TableCell align="right">
                                 Q
                                 {(
                                    item.producto.product_price * item.cantidad
                                 ).toFixed(2)}
                              </TableCell>
                           </>
                        )}
                     </TableRow>
                  ))}
                  <TableRow>
                     <TableCell colSpan={5} align="right">
                        Sub Total a pagar:
                     </TableCell>
                     <TableCell align="right">Q{subtotal.toFixed(2)}</TableCell>
                  </TableRow>

                  <TableRow>
                     {subtotal > 0 && (
                        <TableCell colSpan={5} align="right">
                           <ModalBaseCupones
                              cuponI={cupon}
                              setCupon={setCupon}
                              setTotal={setTotal}
                              total={total}
                           />
                        </TableCell>
                     )}
                     {cupon !== undefined && (
                        <TableCell colSpan={6} align="right">
                           -10%
                        </TableCell>
                     )}
                  </TableRow>

                  <TableRow>
                     <TableCell colSpan={5} align="right">
                        Total a pagar:
                     </TableCell>
                     <TableCell align="right">Q{total}</TableCell>
                  </TableRow>

                  <TableRow>
                     <TableCell colSpan={6} align="right">
                        <Button
                           variant="outlined"
                           color="success"
                           onClick={generateBill}
                        >
                           Confirmar Orden
                        </Button>
                     </TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default Bill;
