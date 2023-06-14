import React, { useState }  from "react";
import departmentsGuatemala from "./departmentsGuatemala";

const SingUpDeliveryMan = ({ url }) => {

   const [selectedOption, setSelectedOption] = useState('Chimaltenango');
   const [selectedMunicipio, setSelectedMunicipio] = useState('');

   const handelSubmit = (e) => {
      e.preventDefault();
      console.log("Formulario enviado", url);
   };

   return (
      <form onSubmit={handelSubmit}>

         <div className="row">
            <div className="col-md-6 mb-4">
               <div className="form-outline">
                  <input type="text" id="form3Example1" className="form-control" />
                  <label className="form-label" htmlFor="form3Example1">
                     Nombre
                  </label>
               </div>
            </div>

            <div className="col-md-6 mb-4">
               <div className="form-outline">
                  <input type="text" id="form3Example2" className="form-control" />
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
            <input type="password" id="form3Example4" className="form-control" />
            <label className="form-label" htmlFor="form3Example4">
               Contraseña
            </label>
         </div>

       
         <div className="row">
            
            <div className="col-md-6 mb-4">
               <div className="form-outline">
                  <select className="form-control"
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
                  <select className="form-control"
                     id="form3Example4"
                     value={selectedMunicipio}
                     onChange={(event) => setSelectedMunicipio(event.target.value)}
                  >
                     
                     {departmentsGuatemala.find((departamento) => departamento.departamento === selectedOption).municipios.map((municipio, index) => (
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
                  <select className="form-control"
                     id="form3Example4"
                     value={selectedOption}
                     onChange={(event) => setSelectedOption(event.target.value)}
                  >

                     {['A','B','C'].map((option, index) => (
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
                  <select className="form-control"
                     id="form3Example4"
                     value={selectedOption}
                     onChange={(event) => setSelectedOption(event.target.value)}
                  >

                     {['NO','SI'].map((option, index) => (
                        <option key={index} value={index}>
                           {option}
                        </option>
                     ))}
                  </select>
                  <label className="form-label" htmlFor="form3Example4">
                     Tipo de licencia
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
