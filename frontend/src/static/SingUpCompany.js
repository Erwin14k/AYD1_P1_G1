import React, { useState } from "react";
import departmentsGuatemala from "./departmentsGuatemala";
import {validateName,validatePassword} from "../func/validations";
import { isEmail } from 'validator';
import swal from 'sweetalert';

const SingUpCompany = ({ url }) => {
   const [selectedOption, setSelectedOption] = useState("Guatemala");
   const [selectedMunicipio, setSelectedMunicipio] = useState("");

   const handelSubmit = async(e) => {
      e.preventDefault();
      console.log("Formulario Enviado Company");

      if(!validateName(e.target[0].value)) 
         return await swal({
            title: "Querido Usuario",
            text: "Nombre invalido",
            icon: "warning",
            button: true,
         });

      if(!isEmail(e.target[2].value)) 
         return await swal({
            title: "Querido Usuario",
            text: "Correo invalido",
            icon: "warning",
            button: true,
         });

      if(!validatePassword(e.target[3].value)) 
         return await swal({
            title: "Querido Usuario",
            text: "Contraseña debe incluir: 8 caracteres, 1 mayuscula, 1 numero y 1 caracter especial",
            icon: "warning",
            button: true,
         });
      
      if(e.target[8].files[0] === undefined){
         return await swal({
            title: "Querido Usuario",
            text: "Se debe subir obligatoriamente el archivo PDF de sanidad.",
            icon:  "error",
            button: true,
         });
      }

      if(e.target[7].value === "")
         return await swal({
            title: "Querido Usuario",
            text: "Se debe ingresar obligatoriamente la dirección de la empresa.",
            icon:  "error",
            button: true,
         });
      
      if(e.target[1].value === "")
         return await swal({
            title: "Querido Usuario",
            text: "Se debe ingresar obligatoriamente la dirección de la empresa.",
            icon:  "error",
            button: true,
         });   
            

      const formData = new FormData();
      formData.append("companyName", e.target[0].value);
      formData.append("companyDescription", e.target[1].value);
      formData.append("companyEmail", e.target[2].value);
      formData.append("companyPassword", e.target[3].value);
      formData.append("companyCategory", e.target[4].value);
      formData.append("companyDepartment", e.target[5].value);
      formData.append("companyMunicipality", e.target[6].value);
      formData.append("companyAddress", e.target[7].value);
      formData.append("pdf", e.target[8].files[0]);

      fetch(url, {
         method: "POST",
         body: formData,
      })
         .then((response) => response.json())
         .then(async (data) => {
            // Handle the response from the backend
            console.log(data);
   
            await swal({
               title: "Querido Usuario",
               text: data.message,
               icon:  data.status===200 ? "success":"error",
               button: true,
            });

            if (data.status === 200) {
               e.target.reset();
            }
         })
         .catch((error) => {
            // Handle any errors that occur during the request
            console.log(error);
         });

   };

   return (
      <form onSubmit={handelSubmit}>
         <div className="form-outline mb-4">
            <input type="text" id="form3Example3" className="form-control" />
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
            >
               {["Restaurante", "Tienda de conveniencia", "Supermercado"].map((option, index) => (
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
                  type="text"
                  id="form3Example3"
                  className="form-control"
               />
               <label className="form-label" htmlFor="form3Example3">
                  Direccion de la empresa
               </label>
            </div>
         </div>

         <div className="form-outline mb-4">
               <input
                  type="file"
                  id="form3Example3"
                  className="form-control"
                  accept=".pdf"
               />
               <label className="form-label" htmlFor="form3Example3">
                  Seleccionar PDF de sanidad
               </label>
            </div>

         <button type="submit" className="btn btn-primary btn-block mb-4">
            Registrase
         </button>
      </form>
   );
};

export default SingUpCompany;
