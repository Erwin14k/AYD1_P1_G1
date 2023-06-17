import React from "react";
import {validateName,validatePassword} from "../func/validations";
import { isEmail } from 'validator';

const SingUpClient = ({ url }) => {
   const handelSubmit = (e) => {
      e.preventDefault();
      console.log("Formulario Enviado Client");

      if(!validateName(e.target[0].value)) return alert("Nombre invalido");
      if(!validateName(e.target[1].value)) return alert("Apellido invalido");
      if(!isEmail(e.target[2].value)) return alert("Correo invalido");
      if(!validatePassword(e.target[3].value)) return alert("Contraseña debe incluir: 8 caracteres, 1 mayuscula, 1 numero y 1 caracter especial");

      const SendData = {
         userEmail: e.target[2].value, 
         userPassword: e.target[3].value,
         userName: e.target[0].value,
         userSurname: e.target[1].value
      };

      fetch(url, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(SendData),
       })
         .then((response) => {
            return response.json(); 
         })
         .then((data) => {
            if(data.status===200){
               console.log("DAtos:",data);
            }else{
               alert(data.message);
            }     
         })
         .catch((error) => {
           console.log("Error en la solicitud:", error);
         });

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

         <button type="submit" className="btn btn-primary btn-block mb-4">
            Registrase
         </button>
      </form>
   );
};

export default SingUpClient;
