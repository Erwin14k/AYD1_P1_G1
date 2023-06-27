const ModuleClient = () => {
   return (
      <div style={{ width: "90%", margin: "auto", marginTop: "6%" }}>
         <div class="container-center">
            <ul class="list-inline">
               <li class="list-inline-item">
                  <div class="d-flex flex-column align-items-center">
                     <img
                        src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/fastfood.png"
                        alt="Logo"
                        width="50"
                     />
                     <span class="text-center">Restaurante</span>
                  </div>
               </li>

               <li class="list-inline-item">
                  <div class="d-flex flex-column align-items-center">
                     <img
                        src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/uber_grocery.png"
                        alt="Logo"
                        width="50"
                     />
                     <span class="text-center">Súpermercado</span>
                  </div>
               </li>

               <li class="list-inline-item">
                  <div class="d-flex flex-column align-items-center">
                     <img
                        src="https://cn-geo1.uber.com/static/mobile-content/eats/specialy_transparent_background.png"
                        alt="Logo"
                        width="50"
                     />
                     <span class="text-center">Tienda</span>
                  </div>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default ModuleClient;
