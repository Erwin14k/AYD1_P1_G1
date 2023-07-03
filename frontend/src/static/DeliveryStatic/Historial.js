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
   TextField,
   Radio,
   RadioGroup,
   FormControlLabel,
   FormControl,
   FormLabel,
   Button,
} from "@mui/material";

const Historial = ({ historial }) => {
   //console.log("Historial", historial);
   const [name, setName] = useState("");
   const [value, setValue] = useState("Todos");
   const [ShowHistorial, setShowHistorial] = useState([]);

   const handleChange = (event) => {
      event.preventDefault();
      setValue(event.target.value);
      console.log("aqui");

      if (event.target.value === "Todos") {
         setShowHistorial(historial);
      } else if (event.target.value === "3") {
         setShowHistorial(
            historial.filter((order) =>
               order.user_name.toLowerCase().includes(name.toLowerCase())
            )
         );
      } else {
         setShowHistorial(
            historial.filter(
               (order) => order.order_status === event.target.value
            )
         );
         //setShowOrders(orders.filter((order) => order.order_status === event.target.value));
      }
   };

   useEffect(() => {
      setShowHistorial(historial);
   }, [historial]);

   return (
      <>
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
               {<FormControlLabel
                  value="En camino"
                  control={<Radio />}
                  label="En camino"
               />}
               <FormControlLabel
                  value="Cancelado"
                  control={<Radio />}
                  label="Cancelado"
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
               <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Por Cliente"
               />
            </RadioGroup>
         </FormControl>

         <br />
         {value === "3" && (
            <>
               <TextField
                  id="standard-basic"
                  label="Nombre:"
                  variant="standard"
                  style={{ marginLeft: "3%", width: "93%" }}
                  onChange={(e) =>
                     setShowHistorial(
                        historial.filter((order) =>
                           order.user_name
                              .toLowerCase()
                              .includes(e.target.value.toLowerCase())
                        )
                     )
                  }
               />
               <br />
            </>
         )}

         <table
            className="table"
            style={{ width: "100%", margin: "auto", marginTop: "2%" }}
         >
            <thead className="table-dark">
               <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Calificación</th>
               </tr>
            </thead>
            <tbody>
               {ShowHistorial.map((pedido, index) => {
                  return (
                     <tr className="table-light" key={`P${index}`}>
                        <td>{pedido.order_id}</td>
                        <td>{pedido.user_name}</td>
                        <td>{pedido.order_status}</td>
                        <td>
                           {new Date(pedido.order_date).toLocaleString(
                              "es-ES",
                              {
                                 year: "numeric",
                                 month: "2-digit",
                                 day: "2-digit",
                                 hour: "2-digit",
                                 minute: "2-digit",
                                 second: "2-digit",
                              }
                           )}
                        </td>
                        <td>
                           {pedido.order_status === "Calificado" ? (
                              <>{pedido.rating}</>
                           ) : pedido.order_status === "Entregado" ? (
                              <> En espera </>
                           ) : (
                              <> - </>
                           )}
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
      </>
   );
};

export default Historial;
