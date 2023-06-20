import './styles/LandingCSS.css'
import React from 'react';
import LandingPage from './pages/LandingPage';
import Politicas from './pages/Politicas';
import Preguntas from './pages/Preguntas';
import Terminos from './pages/Terminos';
import SingIn from './pages/SingIn';
import SingUp from './pages/SingUp';
import Module from './components/Module';
import Perfil from './pages/Perfil';
import Reportes from './pages/Reportes';

import SingUpClient from './static/SingUpClient';
import SingUpDeliveryMan from './static/SingUpDeliveryMan';
import SingUpCompany from './static/SingUpCompany';

import { ProtectedRouteLogin } from './security/ProtectedRouteLogin';
import { ProtectedRouteUsers } from './security/ProtectedRouteUsers';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/terminos" element={<Terminos/>} />
          <Route path="/preguntas" element={<Preguntas/>} />
          <Route path="/politicas" element={<Politicas/>} />

          <Route element={<ProtectedRouteLogin redirectTo="/" condition={undefined} />}>
            <Route path="/Login-Admin" element={<SingIn url={"http://localhost:4200/admin/login"} noUrl={0}/>}/>
            <Route path="/Login-Cliente" element={<SingIn url={"http://localhost:4200/user/login"} noUrl={1}/>}/>
            <Route path="/Login-Repartidor" element={<SingIn url={"http://localhost:4200/delivery-man/login"} noUrl={2}/>}/>
            <Route path="/Login-Empresa" element={<SingIn url={"http://localhost:4200/company/login"} noUrl={3}/>} />
            
            <Route path="/SingUp-Cliente" element={<SingUp  noUrl={1} customContent={<SingUpClient url={"http://localhost:4200/user/register"}/>} />}/>
            <Route path="/SingUp-Repartidor" element={<SingUp  noUrl={2} customContent={<SingUpDeliveryMan url={"http://localhost:4200/delivery-man/register"}/>} />}/>
            <Route path="/SingUp-Empresa" element={<SingUp  noUrl={3} customContent={<SingUpCompany url={"http://localhost:4200/company/register"}/>} />}/>
          </Route>

          {/*admin = 0*/}
          <Route element={<ProtectedRouteUsers redirectTo="/Login-Admin" condition={0} />}>
            <Route path="/Module-Admin" element={<Module  noUrl={0} />}/>
            <Route path="/Reportes-Admin" element={<Reportes noUrl={0}/>}/>
          </Route>

          {/*client = 1*/}
          <Route element={<ProtectedRouteUsers redirectTo="/Login-Cliente" condition={1} />}>
            <Route path="/Module-Cliente" element={<Module  noUrl={1} />}/>
          </Route>

          {/*deliveryman = 2*/}
          <Route element={<ProtectedRouteUsers redirectTo="/Login-Repartidor" condition={2} />}>
            <Route path="/Module-Repartidor" element={<Module  noUrl={2} />}/>
          </Route>

          {/*company = 3*/}
          <Route element={<ProtectedRouteUsers redirectTo="/Login-Empresa" condition={3} />}>
            <Route path="/Module-Empresa" element={<Module  noUrl={3} />}/>
            <Route path="/Reportes-Empresa" element={<Reportes noUrl={3}/>}/>
          </Route>

          
          <Route element={<ProtectedRouteUsers redirectTo="/Login-Cliente" condition={1}  condition2={2}/>}>
            <Route path="/MiPerfil" element={<Perfil  noUrl={2} />}/>
          </Route>
        </Routes>
    </BrowserRouter>

  );
}
export default App;
