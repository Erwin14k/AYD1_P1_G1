import React from 'react';
import NavBar from "../components/NavBar";
import NavBarLanding from '../static/NavBarLanding';

function Login () {
   return (
      <div>
        <NavBar className="nav navbar" customContend={<NavBarLanding/>} />
         Hola mundo
         <br/> <br/> <br/> <br/>
         Hola mundo
      </div>
   );
};

export default Login;
