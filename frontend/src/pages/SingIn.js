import React from "react";
import NavBar from "../components/NavBar";
import NavBarLanding from "../static/NavBar/NavBarLanding";
import Cookie from 'cookie-universal'
import { isEmail } from "validator";
import swal from 'sweetalert';

function SingIn({ url, noUrl }) {
   const handelSubmit = (e) => {
      e.preventDefault();
      // console.log("Formulario enviado", url);

      if (!isEmail(e.target[0].value)) return alert("Correo inválido");
      
      const userData = {
         userEmail: e.target[0].value,
         userPassword: e.target[1].value,
      };

      // console.log("Datos del usuario:", userData);

      fetch(url, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(userData),
       })
      .then((response) => {
         return response.json(); 
      })
      .then(async  (data) => {

         await swal({
            title: "Querido Usuario",
            text: data.message,
            icon: data.status===200 ? "success":"error",
            button: true,
         })
            
         if(data.status===200){
            
            if(data.type === 1){
               data.carrito = []
            }
            console.log("DAtos:",data);
            const cookies = Cookie()
            cookies.set("crr_user",data,{path:"/"});
            console.log("Cookies:",cookies.get("crr_user"));
            window.location.reload();
         }
      })
      .catch((error) => {
         console.log("Error en la solicitud:", error);
      });
   };

   return (
      <div>
         <NavBar classNameName="nav" customContend={<NavBarLanding />} />
         <br /> <br /> <br /> <br />
         <br /> <br /> <br /> <br />
         <section className="vh-100">
            <div className="container-fluid h-custom">
               <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-md-9 col-lg-6 col-xl-5">
                     <img
                        src={
                           noUrl === 1
                              ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                              : noUrl === 2
                              ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                              : noUrl === 0
                              ? "https://img.freepik.com/premium-vector/sign-page-abstract-concept-vector-illustration_107173-25670.jpg"
                              : "https://static.vecteezy.com/system/resources/previews/005/879/539/original/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"
                        }
                        className="img-fluid"
                        alt="Welcome"
                     />
                  </div>
                  <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                     <form onSubmit={handelSubmit}>
                        <div className="form-outline mb-4">
                           <input
                              type="email"
                              id="form3Example3"
                              className="form-control form-control-lg"
                              placeholder="Ingresa un Email valido"
                           />
                           <label
                              className="form-label"
                              htmlFor="form3Example3"
                           >
                              Dirección Email
                           </label>
                        </div>

                        <div className="form-outline mb-3">
                           <input
                              type="password"
                              id="form3Example4"
                              className="form-control form-control-lg"
                              placeholder="Ingresa tu contraseña"
                           />
                           <label
                              className="form-label"
                              htmlFor="form3Example4"
                           >
                              Contraseña
                           </label>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                           <div className="form-check mb-0">
                              <input
                                 className="form-check-input me-2"
                                 type="checkbox"
                                 value=""
                                 id="form2Example3"
                              />
                              <label
                                 className="form-check-label"
                                 htmlFor="form2Example3"
                              >
                                 Remember me
                              </label>
                           </div>
                           <a href="#!" className="text-body">
                              Forgot password?
                           </a>
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">
                           <button
                              type="submit"
                              className="btn btn-primary btn-lg"
                              style={{
                                 paddingLeft: "2.5rem",
                                 paddingRight: "2.5rem",
                              }}
                           >
                              Login
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

export default SingIn;
