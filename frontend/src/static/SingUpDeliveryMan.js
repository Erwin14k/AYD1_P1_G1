import React from "react";
import departmentsGuatemala from "./departmentsGuatemala";

const SingUpDeliveryMan = ({ url }) => {
   const handelSubmit = (e) => {
      e.preventDefault();
      console.log("Formulario enviado", url);
   };

   return (
      <form onSubmit={handelSubmit}>
         <div class="row">
            <div class="col-md-6 mb-4">
               <div class="form-outline">
                  <input type="text" id="form3Example1" class="form-control" />
                  <label class="form-label" for="form3Example1">
                     Nombre
                  </label>
               </div>
            </div>

            <div class="col-md-6 mb-4">
               <div class="form-outline">
                  <input type="text" id="form3Example2" class="form-control" />
                  <label class="form-label" for="form3Example2">
                     Apellido
                  </label>
               </div>
            </div>
         </div>

         <div class="form-outline mb-4">
            <input type="email" id="form3Example3" class="form-control" />
            <label class="form-label" for="form3Example3">
               Correo electronico
            </label>
         </div>

         <div class="form-outline mb-4">
            <input type="password" id="form3Example4" class="form-control" />
            <label class="form-label" for="form3Example4">
               Contraseña
            </label>
         </div>

         <div className="form-outline mb-4"></div>

         <div class="row">
            <div class="col-md-6 mb-4">
               <div class="form-outline">
                  <select className="form-control" id="form3Example4">
                     {departmentsGuatemala.map((departamento, index) => (
                        <option key={index} value={departamento}>
                           {departamento}
                        </option>
                     ))}
                  </select>
                  <label className="form-label" htmlFor="form3Example4">
                     Departamento
                  </label>
               </div>
            </div>

            <div class="col-md-6 mb-4">
               <div class="form-outline">
                  <input type="text" id="form3Example2" class="form-control" />
                  <label class="form-label" for="form3Example2">
                     Municipio
                  </label>
               </div>
            </div>
         </div>

         <button type="submit" class="btn btn-primary btn-block mb-4">
            Registrase
         </button>
      </form>
   );
};

export default SingUpDeliveryMan;
