import React, { useState, useEffect } from "react";
import UsersReport from "./adminReports/UsersReport";
import Top5 from "./adminReports/Top5";
import ProductReport from "./adminReports/ProductsReport";
import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ReportesAdmin = () => {
   const [usersInfo, setUsersInfo] = useState({});

   const [topCompaniesLabel, setTopCompaniesLabel] = useState([]);
   const [topDeliveryLabel, setTopDeliveryLabel] = useState([]);

   const [topCompaniesData, setTopCompaniesData] = useState([]);
   const [topDeliveryData, setTopDeliveryData] = useState([]);

   const [topProductos, setTopProductos] = useState([])

   const topProduct = () => {
      fetch(`http://localhost:4200/admin/get-most-selled-products`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
         },
      })
         .then((response) => response.json())
         .then((data) => {
            // Aquí puedes trabajar con los datos obtenidos

            const pp = data.adminData[0].products
            setTopProductos(pp)

         })
         .catch((error) => {
            // Manejo de errores
            console.error("Error:", error);
         });
   }

   const topDelivery = () => {
      fetch(`http://localhost:4200/admin/get-top5-delivery-man`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
         },
      })
         .then((response) => response.json())
         .then((data) => {
            // Aquí puedes trabajar con los datos obtenidos

            const deliv = data.adminData[0].deliveryMen

            let dd = []
            let label = []
            deliv.map((deliver, index) => {
               label.push("Top " + (index + 1) + " - " + deliver.delivery_man_name + " " + deliver.delivery_man_surname);
               dd.push(deliver.delivery_man_rating);
               return null;
            })

            setTopDeliveryData(dd)
            setTopDeliveryLabel(label)

         })
         .catch((error) => {
            // Manejo de errores
            console.error("Error:", error);
         });
   }

   const topCompanie = () => {
      topProduct();
      fetch(`http://localhost:4200/admin/get-top-5-companies`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
         },
      })
         .then((response) => response.json())
         .then((data) => {
            // Aquí puedes trabajar con los datos obtenidos

            const compa = data.adminData[0].companies

            let dd = []
            let label = []
            compa.map((companie, index) => {
               label.push("Top " + (index + 1) + " - " + companie.company_name);
               dd.push(companie.order_count);
               return null;
            })

            setTopCompaniesData(dd)
            setTopCompaniesLabel(label)

         })
         .catch((error) => {
            // Manejo de errores
            console.error("Error:", error);
         });
   }

   const actualizar = () => {
      topCompanie();
      topDelivery();
      fetch(`http://localhost:4200/admin/users-counters`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
         },
      })
         .then((response) => response.json())
         .then((data) => {
            // Aquí puedes trabajar con los datos obtenidos
            //console.log(data);
            setUsersInfo(data.data);
         })
         .catch((error) => {
            // Manejo de errores
            console.error("Error:", error);
         });
   };

   useEffect(() => {
      actualizar();
   }, []);

   return (
      <div>
         <h1>Reportes</h1>
         <button
            type="button"
            onClick={() => actualizar()}
            className="btn"
            style={{
               marginTop: "2%",
               backgroundColor: "#DB4F23",
               color: "white",
            }}
         >
            Actualizar
         </button>
         <ul
            className="nav nav-tabs"
            id="myTab"
            role="tablist"
            style={{ marginTop: "2%" }}
         >
            <li className="nav-item" role="presentation">
               <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                  onClick={() => topCompanie()}
               >
                  Informe de ventas
               </button>
            </li>
            <li className="nav-item" role="presentation">
               <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
               >
                  Informe de usuarios
               </button>
            </li>
            <li className="nav-item" role="presentation">
               <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#repartidores"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                  onClick={() => topDelivery()}
               >
                  Informe de repartidores
               </button>
            </li>
         </ul>
         <div className="tab-content" id="myTabContent">
            <div
               className="tab-pane fade show active"
               id="home"
               role="tabpanel"
               aria-labelledby="home-tab"
               style={{ padding: "2%" }}
            >
               <center>
                  <h3>INFORME DE VENTAS</h3>
               </center>

               <Top5 titulo="Empresas con más pedidos" ll="Pedidos" labels={topCompaniesLabel} data={topCompaniesData} />

               <ProductReport productos={topProductos}/>

            </div>
            <div
               className="tab-pane fade"
               id="profile"
               role="tabpanel"
               aria-labelledby="profile-tab"
               style={{ padding: "2%" }}
            >
               <center>
                  <h3>INFORME DE USUARIOS</h3>
               </center>

               <UsersReport usersInfo={usersInfo} />
            </div>
            <div
               className="tab-pane fade"
               id="repartidores"
               role="tabpanel"
               aria-labelledby="profile-tab"
               style={{ padding: "2%" }}
            >
               <center>
                  <h3>INFORME DE REPARTIDORES</h3>
               </center>

               <Top5 titulo="Mejores Repartidores" ll="Calificación" labels={topDeliveryLabel} data={topDeliveryData} />

            </div>
         </div>
      </div>
   );
};

export default ReportesAdmin;
