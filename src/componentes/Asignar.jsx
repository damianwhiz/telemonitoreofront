import React from "react";
import { useState,useEffect} from "react"
import { useLocation } from "react-router-dom";
import axios from "axios"
import "./Asignar.css"
export default function Asignar(){
    const location = useLocation();
    const [doctors,setDoctors] = useState([])
    const [nurses,setNurses] = useState([])
    useEffect((e)=>{
        axios.get("http://localhost:4000/doctors").then((e)=>{setDoctors(e.data)})
        axios.get("http://localhost:4000/nurses").then((e)=>{setNurses(e.data)})
    })
    const [registroCliente,setRegistroCliente]= useState({
          name:location.state.name,
          lastname:location.state.lastname,
          mail:location.state.mail,
          username:location.state.username,
          password:location.state.password,
          dni:location.state.dni,
          whatsapp:location.state.whatsapp,
          doctor:"",
          enfermero:""
    })
    
    const idDoctor=async(e)=>{
        setRegistroCliente({...registroCliente,doctor:e.target.value})
    }
    const idEnfermero=async(e)=>{
        setRegistroCliente({...registroCliente,enfermero:e.target.value})
    }
    const guardar=async(e)=>{
        e.preventDefault()
        console.log(registroCliente)
        await axios.post("http://localhost:4000/register",registroCliente).then(e=>{console.log(e.data)})
         setRegistroCliente({
          name:"",
          lastname:"",
          mail:"",
          username:"",
          password:"",
          dni:"",
          whatsapp:"",
          doctor:"",
          enfermero:""
        })
    } 
    return <div className="asignar">
        <div className="contenedor">
            <div className="usuario">
                <p>Asignar cuidados a el/la paciente:</p>
                <h1>{location.state.name}{location.state.lastname}</h1>
                <p>DNI:{location.state.dni}<br/>
                Correo electrónico: {location.state.mail}<br/>
                Nombre de usuario: {location.state.username}<br/>
                Contraseña: {location.state.password}
                Teléfono: {location.state.whatsapp}
                </p>
            </div>
        <div className="doctores">
            <p>Doctores disponibles:</p>
            {doctors.length>1?doctors.map(e=>{return <button onClick={idDoctor} value={e.id}>{e.name} {e.lastname}</button>}):<p>Cargando doctores...</p>}
        </div>
        <div className="enfermeras">
            <p>Enfermeras disponibles:</p>
            {nurses.length>1? nurses.map(e=>{return <button onClick={idEnfermero} value={e.id}>{e.name} {e.lastname}</button>}):<p>Cargando enfermeras...</p>}
        </div>
        <div className="enviar">
            <button onClick={guardar}>Guardar</button>
        </div>
    </div>
    </div>
}