import React, { useState, useEffect } from "react";

function FormProducts({ type, operation, id }) {
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState(0.01);
   const [stock, setStock] = useState(0);
   const [category, setCategory] = useState("");

   useEffect(() => {
      //console.log("FormProducts");
      // console.log(type, operation, id);
      if (type === 0) {
         //console.log("PRODUCTO");
      } else {
         //console.log("COMBO");
      }
   }, [id]);
      
   const handleEditProduct = (e) => {
      e.preventDefault();
      console.log("handleEditProduct");
   };

   const handleEditCombo = (e) => {
      e.preventDefault();
      console.log("handleEditCombo");
   };

   const handelSubmitProduct = (e) => {
      e.preventDefault();
      console.log("handelSubmitProduct");
   };

   const handelSubmitCombo = (e) => {
      e.preventDefault();
      console.log("handelSubmitCombo");
   };

   return (
      <div>
         <form
            //onSubmit={handelSubmit}
            style={{ width: "80%", margin: "auto", marginTop: "3%" }}
         >
            <div className="form-outline mb-4">
               <div className="form-outline mb-4">
                  <input
                     type="text"
                     id="form3Example3"
                     className="form-control"
                     defaultValue={name}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                     Nombre
                  </label>
               </div>
               <input
                  type="file"
                  id="form3Example3"
                  className="form-control"
                  accept=".jpg, .jpeg, .png"
                  multiple
               />
               <label className="form-label" htmlFor="form3Example3">
                  {type === 0
                     ? "Si no desea cambiar la imagen, no suba ningun archivo a este apartado."
                     : "Seleccionar imagen"}
               </label>

               <div className="form-outline mb-4">
                  <textarea
                     id="form3Example3"
                     className="form-control"
                     defaultValue={description}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                     Descripción
                  </label>
               </div>

               <div className="row">
                  <div className="col-md-6 mb-4">
                     <div className="form-outline">
                        <input
                           type="number"
                           step="0.01"
                           defaultValue={price}
                           className="form-control"
                           id="formPrice"
                        />
                        <label className="form-label" htmlFor="formPrice">
                           Precio Q.
                        </label>
                     </div>
                  </div>

                  <div className="col-md-6 mb-4">
                     <div className="form-outline">
                        <input
                           type="number"
                           step="1"
                           defaultValue={stock}
                           className="form-control"
                           id="formStock"
                        />
                        <label className="form-label" htmlFor="formStock">
                           Stock
                        </label>
                     </div>
                  </div>
               </div>

               {type === 0 && (
                  <div className="form-outline mb-4">
                     <div className="form-outline">
                        <select className="form-control" id="form3Example4">
                           {[
                              "Entradas",
                              "Platos Fuertes",
                              "Postres",
                              "Bebidas",
                              "Medicamento",
                              "Producto Básico",
                           ].map((option, index) => (
                              <option
                                 key={index}
                                 value={option}
                                 selected={category === option}
                              >
                                 {option}
                              </option>
                           ))}
                        </select>
                        <label className="form-label" htmlFor="form3Example4">
                           Categoria
                        </label>
                     </div>
                  </div>
               )}
            </div>
            <center>
               <button type="submit" className="btn btn-primary"  onClick={operation !== 0 ? type ===0 ? handleEditProduct : handleEditCombo : type ===0 ? handelSubmitProduct : handelSubmitCombo}>
                  {operation === 0 ? "Agregar" : "Actualizar"}
               </button>
            </center>
         </form>
      </div>
   );
}

export default FormProducts;
