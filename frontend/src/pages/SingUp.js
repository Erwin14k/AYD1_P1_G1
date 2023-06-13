import React from "react";
import NavBar from "../components/NavBar";
import NavBarLanding from "../static/NavBarLanding";

function SingUp({  noUrl, customContent }) {


   return (
      <div>
         <NavBar classNameName="nav" customContend={<NavBarLanding />} />

         <section class="text-center">
            <div
               className="p-5 bg-image"
               style={{
                  backgroundImage:
                     "url('https://static.vecteezy.com/system/resources/previews/003/823/542/original/spices-for-use-as-cooking-ingredients-on-a-wooden-background-with-fresh-vegetables-healthy-food-herbs-organic-vegetables-on-the-table-raw-materials-of-cooking-preparation-tom-yum-free-photo.jpg')",
                  height: "300px",
               }}
            ></div>

            <div
               className="card mx-4 mx-md-5 shadow-5-strong"
               style={{
                  marginTop: "-100px",
                  background: "hsla(0, 0%, 100%, 0.8)",
                  backdropFilter: "blur(30px)",
               }}
            >
               <div class="card-body py-5 px-md-5">
                  <div class="row d-flex justify-content-center">
                     <div class="col-lg-8">
                        <h2 class="fw-bold mb-5">Registrate Ahora</h2>
                         {customContent}
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
}

export default SingUp;
