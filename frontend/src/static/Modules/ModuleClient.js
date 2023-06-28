import React, { useState, useEffect } from "react";
import Filter from "../../components/Filter";
import ContentProducts from "../../components/ContentProducts";
import SearchCustom from "../../components/SearchCustom";
import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ModuleClient = () => {
   const [productos, setProductos] = useState([]);
   const [combos, setCombos] = useState([]);

   const [value, setValue] = useState("5");
   const [name, setName] = useState("");

   const getProducts = () => {
      console.log("====Productos=====");
      fetch(`http://localhost:4200/user/get-all-products`, {
         method: "GET",
         headers: {
            /* "Content-Type": "application/json", */
            Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
         },
      })
         .then((response) => response.json())
         .then((data) => {
            //console.log('===Productos===',data);
            console.log("Datos Productos", data.userData[0].products);
            setProductos(data.userData[0].products);
         })
         .catch((error) => {
            // Handle any errors that occur during the request
            console.error("Error:", error);
         });
   };

   const getCombos = () => {
      console.log("====Combos====");
      fetch(`http://localhost:4200/user/get-all-combos`, {
         method: "GET",
         headers: {
            /* "Content-Type": "application/json", */
            Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
         },
      })
         .then((response) => response.json())
         .then((data) => {
            //console.log('===Combos===',data);
            console.log("Datos Combos", data.userData[0].products);
            setCombos(data.userData[0].products);
         })
         .catch((error) => {
            // Handle any errors that occur during the request
            console.error("Error:", error);
         });
   };

   useEffect(() => {
      console.log("useEffect");
      getProducts();
      getCombos();
   }, []);

   return (
      <div>
         <div style={{ width: "90%", margin: "auto", marginTop: "6%" }}>
            <div className="container-center">
               <ul className="list-inline">
                  <li className="list-inline-item">
                     <div className="d-flex flex-column align-items-center">
                        <img
                           src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/fastfood.png"
                           alt="Logo"
                           width="50"
                        />
                        <span className="text-center">Restaurante</span>
                     </div>
                  </li>

                  <li className="list-inline-item">
                     <div className="d-flex flex-column align-items-center">
                        <img
                           src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/uber_grocery.png"
                           alt="Logo"
                           width="50"
                        />
                        <span className="text-center">Súpermercado</span>
                     </div>
                  </li>

                  <li className="list-inline-item">
                     <div className="d-flex flex-column align-items-center">
                        <img
                           src="https://cn-geo1.uber.com/static/mobile-content/eats/specialy_transparent_background.png"
                           alt="Logo"
                           width="50"
                        />
                        <span className="text-center">Tienda</span>
                     </div>
                  </li>
               </ul>
            </div>
            <hr className="divider" />
         </div>
         <div className="containerContent">
            <div className="sidebar">
               <Filter value={value} setValue={setValue} setName={setName} />
            </div>
            <div className="main">
               {value === "5" ?  <ContentProducts productos={productos} combos={combos} /> : <SearchCustom productos={productos} combos={combos} value={value} name={name} />}
              
            </div>
         </div>
      </div>
   );
};

export default ModuleClient;
