import React from "react";

const DataCompany = ({ companyInfo }) => {
   return (
      <div className="modal-body">
         <fieldset disabled>
            <div className="row">
               <div className="col-md-4 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example1">
                        Nombre
                     </label>
                     <input
                        type="text"
                        id="form3Example1"
                        className="form-control"
                        value={companyInfo.company_name}
                     ></input>
                  </div>
               </div>

               <div className="col-md-4 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example2">
                        Categoria
                     </label>
                     <input
                        type="text"
                        id="form3Example2"
                        className="form-control"
                        value={companyInfo.company_category}
                     />
                  </div>
               </div>
               <div className="col-md-4 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example1">
                        Correo electrónico
                     </label>
                     <input
                        type="text"
                        id="form3Example1"
                        className="form-control"
                        value={companyInfo.company_email}
                     />
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-4 mb-4">
                  <div className="form-outline">
                     <label className="form-label" htmlFor="form3Example2">
                        Dirección
                     </label>
                     <input
                        type="text"
                        id="form3Example2"
                        className="form-control"
                        value={companyInfo.company_address}
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
                        value={companyInfo.company_department}
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
                        value={companyInfo.company_municipality}
                     />
                  </div>
               </div>
            </div>
            <div className="form-outline mb-4">
               <label className="form-label" htmlFor="form3Example3">
                  Descripcion de la empresa
               </label>
               <textarea
                  id="form3Example3"
                  className="form-control"
                  value={companyInfo.company_description}
               />
            </div>
            <div className="col-md-4 mb-4">
               <div className="form-outline">
                  <label className="form-label" htmlFor="form3Example2">
                     Archivo de sanidad
                  </label>
               </div>
            </div>
            <center>
               <iframe
                  title="Archivo de sanidad"
                  src={companyInfo.company_file}
                  style={{ width: "100%", height: "700px" }}
               ></iframe>
            </center>
         </fieldset>
      </div>
   );
};

export default DataCompany;
