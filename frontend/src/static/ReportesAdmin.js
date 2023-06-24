import React, { useState, useEffect } from "react";
import UsersReport from "./adminReports/UsersReport";
import Top5 from "./adminReports/Top5";
import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

const ReportesAdmin = () => {
   const [usersInfo, setUsersInfo] = useState({});

   const actualizar = () => {
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
            console.log(data);
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
            <li class="nav-item" role="presentation">
               <button
                  class="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
               >
                  Informe de ventas
               </button>
            </li>
            <li class="nav-item" role="presentation">
               <button
                  class="nav-link"
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
            <li class="nav-item" role="presentation">
               <button
                  class="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#repartidores"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
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

               <Top5 titulo={"Empresas con más pedidos"} ll="Pedidos"/>

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

               <Top5 titulo={"Mejores Repartidores"} ll="Calificación" />

            </div>
         </div>
      </div>
   );
};

export default ReportesAdmin;
