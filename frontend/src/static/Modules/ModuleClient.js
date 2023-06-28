import React, { useState, useEffect } from "react";
import Filter from "../../components/Filter";
import ContentProducts from "../../components/ContentProducts";
import SearchCustom from "../../components/SearchCustom";
import restaurant from "../../assets/restaurant.png";
import all from "../../assets/all.png";
import Card from "@mui/material/Card";
import CardProduct from "../../components/CardProduct";

import SearchCompany from "../ClientsNavigation/SearchCompany";

import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ModuleClient = () => {
   const [productos, setProductos] = useState([]);
   const [combos, setCombos] = useState([]);

   const [value, setValue] = useState("5");
   const [name, setName] = useState("");

   const [companys, setCompanys] = useState("");
   const [company, setCompany] = useState("Todos");

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

   const getCompany = () => {
      console.log("====Company====");
      fetch(`http://localhost:4200/user/get-all-companies`, {
         method: "GET",
         headers: {
            /* "Content-Type": "application/json", */
            Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
         },
      })
         .then((response) => response.json())
         .then((data) => {
            //console.log('===Combos===',data);
            console.log("Datos Company", data.adminData[0].companies);
            setCompanys(data.adminData[0].companies);
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
      getCompany();
   }, []);

   const updateCompany = (value) => {
      // console.log("=Update Company=",value);
      setCompany(value);
   };

   return (
      <div>
         <div style={{ width: "90%", margin: "auto", marginTop: "6%" }}>
            <div className="container-center">
               <ul className="list-inline">
                  {[
                     {
                        tipo: "Restaurante",
                        img: restaurant,
                        valor: "Restaurante",
                     },
                     {
                        tipo: "Súpermercado",
                        img: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/uber_grocery.png",
                        valor: "Supermercado",
                     },
                     {
                        tipo: "Tienda",
                        img: "https://cn-geo1.uber.com/static/mobile-content/eats/specialy_transparent_background.png",
                        valor: "Tienda de conveniencia",
                     },
                     {
                        tipo: "Todos",
                        img: all,
                        valor: "Todos",
                     },
                  ].map((item, index) => (
                     <li key={`ExC${index}`} className="list-inline-item">
                        <Card
                           style={{
                              display: "inline-block",
                              margin: "10px 8px",
                              width: "150px",
                              backgroundColor:
                                 company === item.valor ? "#F58600" : "#fff",
                           }}
                           onClick={() => updateCompany(item.valor)}
                        >
                           <div className="d-flex flex-column align-items-center">
                              <img src={item.img} alt="Logo" width="50" />
                              <span className="text-center"> {item.tipo}</span>
                           </div>
                        </Card>
                     </li>
                  ))}
               </ul>
            </div>
            <hr className="divider" />
         </div>

         {company === "Todos" ? (
            <div className="containerContent">
               <div className="sidebar">
                  <Filter value={value} setValue={setValue} setName={setName} />
               </div>
               <div className="main">
                  {value === "5" ? (
                     <ContentProducts productos={productos} combos={combos} />
                  ) : (
                     <SearchCustom
                        productos={productos}
                        combos={combos}
                        value={value}
                        name={name}
                     />
                  )}
               </div>
            </div>
         ) : (
           
               <div className="main2">
                  <div
                     style={{
                        overflowX: "scroll",
                        marginTop: "15px",
                        marginBottom: "15px",
                     }}
                  >
                     <SearchCompany companys={companys} company={company} products={productos} combos={combos}/>
                  </div>
               </div>
    
         )}
      </div>
   );
};

export default ModuleClient;
