import './App.css';
import React from 'react';
import LandingPage from './pages/LandingPage';
import Politicas from './pages/Politicas';
import Preguntas from './pages/Preguntas';
import Terminos from './pages/Terminos';
import Login from './pages/Login';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage/>} />
          <Route path="/terminos" element={<Terminos/>} />
          <Route path="/preguntas" element={<Preguntas/>} />
          <Route path="/politicas" element={<Politicas/>} />
          <Route path="/Login-Cliente" element={<Login url={"Cliente"} noUrl={1}/>}/>
          <Route path="/Login-Repartidor" element={<Login url={"Repartidor"} noUrl={2}/>}/>
          <Route path="/Login-Empresa" element={<Login url={"Empresa"} noUrl={3}/>} />
        </Routes>
    </BrowserRouter>

  );
}
export default App;
