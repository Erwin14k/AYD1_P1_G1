import './App.css';
import React from 'react';
import LandingPage from './pages/LandingPage';
import Politicas from './pages/Politicas';
import Preguntas from './pages/Preguntas';
import Terminos from './pages/Terminos';
import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import Module from './pages/Module';
import Perfil from './pages/Perfil';
import Reportes from './pages/Reportes';

import SingUpClient from './static/SingUpClient';
import SingUpDeliveryMan from './static/SingUpDeliveryMan';
import SingUpCompany from './static/SingUpCompany';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/terminos" element={<Terminos/>} />
          <Route path="/preguntas" element={<Preguntas/>} />
          <Route path="/politicas" element={<Politicas/>} />
          <Route path="/Login-Cliente" element={<SingIn url={"Cliente"} noUrl={1}/>}/>
          <Route path="/Login-Repartidor" element={<SingIn url={"Repartidor"} noUrl={2}/>}/>
          <Route path="/Login-Empresa" element={<SingIn url={"Empresa"} noUrl={3}/>} />

          <Route path="/SingUp-Cliente" element={<SingUp  noUrl={1} customContent={<SingUpClient url={"Usuario"}/>} />}/>
          <Route path="/SingUp-Repartidor" element={<SingUp  noUrl={2} customContent={<SingUpDeliveryMan url={"Repartidor"}/>} />}/>
          <Route path="/SingUp-Empresa" element={<SingUp  noUrl={3} customContent={<SingUpCompany url={"Empresa"}/>} />}/>

          <Route path="/Module-Admin" element={<Module  noUrl={0} />}/>
          <Route path="/Module-Cliente" element={<Module  noUrl={1} />}/>
          <Route path="/Module-Repartidor" element={<Module  noUrl={2} />}/>
          <Route path="/Module-Empresa" element={<Module  noUrl={3} />}/>

          <Route path="/MiPerfil" element={<Perfil  noUrl={2} />}/>
          <Route path="/Reportes-Admin" element={<Reportes noUrl={0}/>}/>
          <Route path="/Reportes-Empresa" element={<Reportes noUrl={3}/>}/>
        </Routes>
    </BrowserRouter>

  );
}
export default App;
