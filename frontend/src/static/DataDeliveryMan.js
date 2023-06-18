import React from "react";

const DataDeliveryMan = ({ delivery_man_name,delivery_man_surname,delivery_man_department,delivery_man_municipality,delivery_man_transport,delivery_man_email,delivery_man_phone,delivery_man_license_type ,delivery_man_resume}) => {
   return (
      <div className="modal-body">
         <fieldset disabled>
            <div className="row">
               <div className="col-md-6 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example1">
                        Nombre
                     </label>
                     <input
                        type="text"
                        id="form3Example1"
                        className="form-control"
                        value={delivery_man_name}
                     ></input>
                  </div>
               </div>

               <div className="col-md-6 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example2">
                        Apellido
                     </label>
                     <input
                        type="text"
                        id="form3Example2"
                        className="form-control"
                        value={delivery_man_surname}
                     />
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-4 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example1">
                        Correo electrónico
                     </label>
                     <input
                        type="text"
                        id="form3Example1"
                        className="form-control"
                        value={delivery_man_email}
                     />
                  </div>
               </div>
               <div className="col-md-4 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example2">
                        Teléfono
                     </label>
                     <input
                        type="text"
                        id="form3Example2"
                        className="form-control"
                        value={delivery_man_phone}
                     />
                  </div>
               </div>
               <div className="col-md-4 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example1">
                        Departamento
                     </label>
                     <input
                        type="text"
                        id="form3Example1"
                        className="form-control"
                        value={delivery_man_department}
                     />
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-4 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example1">
                        Tipo de Licencia
                     </label>
                     <input
                        type="text"
                        id="form3Example1"
                        className="form-control"
                        value={delivery_man_license_type}
                     />
                  </div>
               </div>

               <div className="col-md-4 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example2">
                        Transporte
                     </label>
                     <input
                        type="text"
                        id="form3Example2"
                        className="form-control"
                        value={delivery_man_transport}
                     />
                  </div>
               </div>
               <div className="col-md-4 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example2">
                        Municipio
                     </label>
                     <input
                        type="text"
                        id="form3Example2"
                        className="form-control"
                        value={delivery_man_municipality}
                     />
                  </div>
               </div>
            </div>
            <div className="col-md-4 mb-4">
               <div className="form-outline">
                  <label className="form-label" htmlFor="form3Example2">
                     Curriculum Vitae
                  </label>
               </div>
            </div>
            <center>
               <iframe
                  title="CV"
                  src={delivery_man_resume}
                  style={{ width: "100%", height: "700px" }}
               ></iframe>
            </center>
         </fieldset>
      </div>
   );
};

export default DataDeliveryMan;
