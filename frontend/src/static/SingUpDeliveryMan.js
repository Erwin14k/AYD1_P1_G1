import React, { useState } from "react";
import departmentsGuatemala from "./departmentsGuatemala";
import {validateName,validatePassword} from "../func/validations";
import { isEmail } from 'validator';

const SingUpDeliveryMan = ({ url }) => {
   


   const [selectedOption, setSelectedOption] = useState("Guatemala");
   const [selectedMunicipio, setSelectedMunicipio] = useState("");

   const handelSubmit = (e) => {
      e.preventDefault();
      console.log("Formulario", url);

      if(!validateName(e.target[0].value)) return alert("Nombre invalido");
      if(!validateName(e.target[1].value)) return alert("Apellido invalido");
      if(!isEmail(e.target[2].value)) return alert("Correo invalido");
      if(!validatePassword(e.target[3].value)) return alert("Contraseña debe incluir: 8 caracteres, 1 mayuscula, 1 numero y 1 caracter especial");
 
      
      console.log(e.target[0].value);
      console.log(e.target[1].value);
      console.log(e.target[2].value);
      console.log(e.target[3].value);
      console.log(e.target[4].value);
      console.log(e.target[5].value);
      console.log(e.target[6].value);
      console.log(e.target[7].value);
      console.log(e.target[8].value);
   };

   return (
      <form onSubmit={handelSubmit}>
         <div className="row">
            <div className="col-md-6 mb-4">
               <div className="form-outline">
                  <input
                     type="text"
                     id="form3Example1"
                     className="form-control"
                  />
                  <label className="form-label" htmlFor="form3Example1">
                     Nombre
                  </label>
               </div>
            </div>

            <div className="col-md-6 mb-4">
               <div className="form-outline">
                  <input
                     type="text"
                     id="form3Example2"
                     className="form-control"
                  />
                  <label className="form-label" htmlFor="form3Example2">
                     Apellido
                  </label>
               </div>
            </div>
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

            <div className="row">
               <div className="col-md-6 mb-4">
                  <div className="form-outline">
                     <select
                        className="form-control"
                        id="form3Example4"
                        value={selectedOption}
                        onChange={(event) =>
                           setSelectedOption(event.target.value)
                        }
                     >
                        {["A", "B", "C"].map((option, index) => (
                           <option key={index} value={option}>
                              {option}
                           </option>
                        ))}
                     </select>
                     <label className="form-label" htmlFor="form3Example4">
                        Tipo de licencia
                     </label>
                  </div>
               </div>

               <div className="col-md-6 mb-4">
                  <div className="form-outline">
                     <select
                        className="form-control"
                        id="form3Example4"
                        value={selectedOption}
                        onChange={(event) =>
                           setSelectedOption(event.target.value)
                        }
                     >
                        {["NO", "SI"].map((option, index) => (
                           <option key={index} value={index}>
                              {option}
                           </option>
                        ))}
                     </select>
                     <label className="form-label" htmlFor="form3Example4">
                        Posee tranporte propio
                     </label>
                  </div>
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
                  Seleccionar CV
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
