import React, {useState,useEffect} from 'react';
import Filter from '../../components/Filter';
import ContentProducts from '../../components/ContentProducts';

const ModuleClient = () => {
   const [publicaciones, setPublicaciones] = useState([]);
   const [value, setValue] = useState('5');
   const [name, setName] = useState('');

   useEffect(() => {           
     console.log("useEffect");
      
   }, []);

   return (
      <div>
         <div style={{ width: "90%", margin: "auto", marginTop: "6%" }}>
            <div className="container-center">
               <ul className="list-inline">
                  <li className="list-inline-item">
                     <div className="d-flex flex-column align-items-center">
                        <img
                           src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/fastfood.png"
                           alt="Logo"
                           width="50"
                        />
                        <span className="text-center">Restaurante</span>
                     </div>
                  </li>

                  <li className="list-inline-item">
                     <div className="d-flex flex-column align-items-center">
                        <img
                           src="https://d4p17acsd5wyj.cloudfront.net/shortcuts/uber_grocery.png"
                           alt="Logo"
                           width="50"
                        />
                        <span className="text-center">Súpermercado</span>
                     </div>
                  </li>

                  <li className="list-inline-item">
                     <div className="d-flex flex-column align-items-center">
                        <img
                           src="https://cn-geo1.uber.com/static/mobile-content/eats/specialy_transparent_background.png"
                           alt="Logo"
                           width="50"
                        />
                        <span className="text-center">Tienda</span>
                     </div>
                  </li>
               </ul>
            </div>
            <hr className="divider" />
         </div>
         <div className="containerContent">
            <div className="sidebar">
          
               <Filter value={value} setValue={setValue} setName={setName}/>
            </div>
            <div className="main">
            
               <ContentProducts/>
            </div>
         </div>
      </div>
   );
};

export default ModuleClient;
