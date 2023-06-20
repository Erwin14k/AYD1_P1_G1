import React, { useState, useEffect } from "react";
import Cookie from "cookie-universal";
const cookies = Cookie();
const crr_user = cookies.get("crr_user");

function FormProducts({ type, operation, id, actualizar }) {
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState(0.01);
   const [stock, setStock] = useState(0);
   const [category, setCategory] = useState("");

   const [products, setProducts] = useState([]);
   const [combos, setCombos] = useState([]);
   const [crr, setCrr] = useState(undefined);

   const update = () => {
      console.log("update")
      fetch(`http://localhost:4200/company/info`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${crr_user.data[0].authToken}`, 
          }
      })
          .then((response) => response.json())
          .then((data) => {
              setProducts(data.companyData[1].companyProducts);
              setCombos(data.companyData[2].companyCombos);
              if (type === 0) {
               const temp = products.find((product) => product.productId === id);
               console.log("PRODUCTO",temp);
               } else {
                  const temp =combos.find((combo) => combo.comboId === id);
                  console.log("COMBO",temp);
               }

          })
          .catch((error) => {
              console.error('Error:', error)
          });

   }

   useEffect(() => {           
      // console.log(type, operation, id);
      if(operation === 1){
         update();
      }
      
   }, [id || type || operation]);
      
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
      console.log("0",e.target[0].value);
      console.log("1",e.target[1].files[0]);
      console.log("2",e.target[2].value);
      console.log("3",e.target[3].value);
      console.log("4",e.target[4].value);
      console.log("5",e.target[5].value);

      var formData = new FormData();
      formData.append("companyId", crr_user.data[0].companyId)
      formData.append("productName", e.target[0].value)
      formData.append("img", e.target[1].files[0])
      formData.append("productDescription", e.target[2].value)
      formData.append("productPrice", e.target[3].value)
      formData.append("productStock", e.target[4].value)
      formData.append("productType", e.target[5].value)
      formData.append("productNumberOfSales", 0)
      
      fetch(`http://localhost:4200/company/new-product`, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            },
            body: formData
      })
      .then((response) => response.json())
      .then((data) => {
         alert(data.message)
         console.log(data);
         actualizar();
         if(data.status === 200){
            e.target.reset();
         }
      })
      .catch((error) => {
         console.error('Error:', error)
      });
   };

   const handelSubmitCombo = (e) => {
      e.preventDefault();
      console.log("handelSubmitCombo");
      console.log("handelSubmitProduct");
      console.log("0",e.target[0].value);
      console.log("1",e.target[1].files[0]);
      console.log("2",e.target[2].value);
      console.log("3",e.target[3].value);
      console.log("4",e.target[4].value);

      var formData = new FormData();
      formData.append("companyId", crr_user.data[0].companyId)
      formData.append("comboName", e.target[0].value)
      formData.append("img", e.target[1].files[0])
      formData.append("comboDescription", e.target[2].value)
      formData.append("comboPrice", e.target[3].value)
      formData.append("comboStock", e.target[4].value)
      formData.append("comboNumberOfSales", 0)

      fetch(`http://localhost:4200/company/new-combo`, {
            method: "POST",
            headers: {
               Authorization: `Bearer ${crr_user.data[0].authToken}`, // Agrega aquí tu encabezado personalizado
            },
            body: formData
      })
      .then((response) => response.json())
      .then((data) => {
         alert(data.message)
         console.log(data);
         actualizar();
         if(data.status === 200){
            e.target.reset();
         }
      })
      .catch((error) => {
         console.error('Error:', error)
      });
   };

   return (
      <div>
         <form
            onSubmit={operation !== 0 ? type ===0 ? handleEditProduct : handleEditCombo : type ===0 ? handelSubmitProduct : handelSubmitCombo}
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
               <button type="submit" className="btn btn-primary"  >
                  {operation === 0 ? "Agregar" : "Actualizar"}
               </button>
            </center>
         </form>
      </div>
   );
}

export default FormProducts;
