import {Routes,Route} from "react-router-dom";
import Login  from "./componentes/Login.jsx";
import Home from "./componentes/Home.jsx";
import  LoginAdmin  from "./componentes/LoginAdmin.jsx";
import Admin from "./componentes/Admin.jsx";
import LoginEnfermera  from "./componentes/LoginEnfermera.jsx";
import Dashboard from "./componentes/Dashboard.jsx";
import Asignar from "./componentes/Asignar.jsx";
import Enfermero from "./componentes/Enfermero.jsx"
import Operador from "./componentes/Operador.jsx";
import UserNurse  from "./componentes/UserNurse.jsx";
import Doctor from "./componentes/Doctor.jsx";
import AddClientExcel from "./componentes/AddClilentExcel";
import { useState } from "react";
import {Context} from "./Contex"
function App() {
const [mensaje,setMensaje] =useState("")
  return (
    <div className="App">
      <Context.Provider value={{mensaje,setMensaje}}>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/login-admin' element={<LoginAdmin/>}/>
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/new-account' element={<LoginEnfermera/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/set-patient' element={<Asignar/>}/>
      <Route path='/nurse-dashboard' element={<Enfermero/>}/>
      <Route path='/doctor-dashboard' element={<Doctor/>}/>
      <Route path='/operador-dashboard' element={<Operador/>}/>
      <Route path='/user-nurse' element={<UserNurse/>}/>
      <Route path='/add-clients' element={<AddClientExcel/>}/>
    </Routes>
    </Context.Provider>
    </div>
  );
}

export default App;
