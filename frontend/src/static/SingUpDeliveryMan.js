import React, { useState } from "react";
import departmentsGuatemala from "./departmentsGuatemala";

const SingUpDeliveryMan = ({ url }) => {
   const [selectedOption, setSelectedOption] = useState("Guatemala");
   const [selectedMunicipio, setSelectedMunicipio] = useState("");

   const handelSubmit = (e) => {
      e.preventDefault();
      console.log("Formulario enviado", url);
   };

   return (
      <form onSubmit={handelSubmit}>
         <div className="form-outline mb-4">
            <input type="email" id="form3Example3" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">
               Nombre de la empresa
            </label>
         </div>

         <div className="form-outline mb-4">
            <textarea id="form3Example3" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">
               Descripcion de la empresa
            </label>
         </div>

         <div className="form-outline mb-4">
            <input type="email" id="form3Example3" className="form-control" />
            <label className="form-label" htmlFor="form3Example3">
               Correo electronico
            </label>
         </div>

         <div className="form-outline mb-4">
            <input
               type="password"
               id="form3Example4"
               className="form-control"
            />
            <label className="form-label" htmlFor="form3Example4">
               Contraseña
            </label>
         </div>

         <div className="form-outline mb-4">
            <select
               className="form-control"
               id="form3Example4"
               value={selectedOption}
               onChange={(event) => setSelectedOption(event.target.value)}
            >
               {["Pizzas", "Hamburguesas", "Postres"].map((option, index) => (
                  <option key={index} value={option}>
                     {option}
                  </option>
               ))}
            </select>
            <label className="form-label" htmlFor="form3Example4">
               Categoria
            </label>
         </div>

         <div className="row">
            <div className="col-md-6 mb-4">
               <div className="form-outline">
                  <select
                     className="form-control"
                     id="form3Example4"
                     value={selectedOption}
                     onChange={(event) => setSelectedOption(event.target.value)}
                  >
                     {departmentsGuatemala.map((departamento, index) => (
                        <option key={index} value={departamento.departamento}>
                           {departamento.departamento}
                        </option>
                     ))}
                  </select>
                  <label className="form-label" htmlFor="form3Example4">
                     Departamento
                  </label>
               </div>
            </div>

            <div className="col-md-6 mb-4">
               <div className="form-outline">
                  <select
                     className="form-control"
                     id="form3Example4"
                     value={selectedMunicipio}
                     onChange={(event) =>
                        setSelectedMunicipio(event.target.value)
                     }
                  >
                     {departmentsGuatemala
                        .find(
                           (departamento) =>
                              departamento.departamento === selectedOption
                        )
                        .municipios.map((municipio, index) => (
                           <option key={index} value={municipio}>
                              {municipio}
                           </option>
                        ))}
                  </select>
                  <label className="form-label" htmlFor="form3Example4">
                     Departamento
                  </label>
               </div>
            </div>

            <div className="form-outline mb-4">
               <input
                  type="email"
                  id="form3Example3"
                  className="form-control"
               />
               <label className="form-label" htmlFor="form3Example3">
                  Direccion de la empresa
               </label>
            </div>
         </div>

         <button type="submit" className="btn btn-primary btn-block mb-4">
            Registrase
         </button>
      </form>
   );
};

export default SingUpDeliveryMan;
