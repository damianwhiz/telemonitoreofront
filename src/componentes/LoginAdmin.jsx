import React from 'react';
import { useState,useEffect} from 'react'
import axios from "axios"
import styles from "./Login.module.css"
export default function LoginAdmin(){

  const [respuestaAdmin,setRespuestaAdmin] = useState("")
  const [respuestaDoctor,setRespuestaDoctor] = useState("")
  const [respuestaEnfermero,setRespuestaEnfermero] = useState("")
  const [respuestaOperador,setRespuestaOperador] = useState("")
    
    const [select,setSelected] = useState("administrador")
    const selectHandler=(e)=>{
      setSelected(e.target.value)
    }

   //SESION ADMIN

    const [loginAdmin,setLoginAdmin] = useState({
        name:"",
        password:""
      })
      const usernameAdmin=(e)=>{
        setLoginAdmin({...loginAdmin,name:e.target.value})
      }
      const passwordAdmin=(e)=>{
        setLoginAdmin({...loginAdmin,password:e.target.value})
      }
      const sendLoginAdmin=async(e)=>{
        e.preventDefault()
        await axios.post("http://localhost:4000/login-admin",loginAdmin).then(e=>{
          
              window.location.href="/admin"
            
        
        })
        setLoginAdmin({
          username:"",
          password:""
        })
      }


      //SESION DOCTOR

      const [loginDoctor,setLoginDoctor] = useState({
        username:"",
        password:""
      })

      const usernameDoctor=(e)=>{
        setLoginDoctor({...loginDoctor,username:e.target.value})
      }
      const passwordDoctor=(e)=>{
        setLoginDoctor({...loginDoctor,password:e.target.value})
      }
      const sendLoginDoctor=async(e)=>{
        e.preventDefault()
        await axios.post("http://localhost:4000/login-doctor",loginDoctor).then(e=>{
          if(e.data.token){
            localStorage.setItem("token",e.data.token)
            localStorage.setItem("id",e.data.payload.id)
            window.location.href="/doctor-dashboard"
          }
          else{
            setRespuestaDoctor(e.data)
          }
        setLoginDoctor({
          username:"",
          password:""
        })
      })}
    
      //LOGIN ENFERMERO

      const [loginEnfermero,setLoginEnfermero] = useState({
        username:"",
        password:""
      })

      const usernameEnfermero=(e)=>{
        setLoginEnfermero({...loginEnfermero,username:e.target.value})
      }
      const passwordEnfermero=(e)=>{
        setLoginEnfermero({...loginEnfermero,password:e.target.value})
      }
      const sendLoginEnfermero=async(e)=>{
        e.preventDefault()
        await axios.post("http://localhost:4000/login-nurse",loginEnfermero).then(e=>{
          if(e.data.token){
            localStorage.setItem("token",e.data.token)
            localStorage.setItem("id",e.data.payload.id)
            window.location.href="/nurse-dashboard"
          }
          else{
            setRespuestaEnfermero(e.data)
          }
            
         })
        setLoginEnfermero({
          username:"",
          password:""
        })
      }


      //LOGIN OPERADOR

      const [loginOperador,setLoginOperador] = useState({
        username:"",
        password:""
      })

      const usernameOperador=(e)=>{
        setLoginOperador({...loginOperador,username:e.target.value})
      }
      const passwordOperador=(e)=>{
        setLoginOperador({...loginOperador,password:e.target.value})
      }
      const sendLoginOperador=async(e)=>{
        e.preventDefault()
        await axios.post("http://localhost:4000/login-operator",loginOperador).then(e=>{
          
          localStorage.setItem("id",e.data.id)
          window.location.href="/operador-dashboard"  
         })
        setLoginOperador({
          username:"",
          password:""
        })
      }
  
    return <div className={styles.center}>
      <div className={styles.explicacion}>
          <p>Iniciar sesion como:</p>
        <select className={styles.formselect}aria-label="Default select example" onChange={selectHandler}>
            <option selected value="administrador">Seleccionar cargo</option>
            <option value="administrador">Administrador</option>
            <option value="doctor">Doctor/a</option>
            <option value="enfermero">Enfermero/a</option>
            <option value="operador">Operador/a</option>
        </select>
        </div>
 
      {select ==="administrador" && <div className={styles.paleta}>
        <p>Administrador</p>
      <form onSubmit={sendLoginAdmin}>
      <h1>Iniciar sesion</h1>
      <input type="text" placeholder="username" onChange={usernameAdmin} value={loginAdmin.name} className={styles.forminput}></input>
      <input type="text" placeholder="password" onChange={passwordAdmin} value={loginAdmin.password} className={styles.forminput}></input>
      <input type="submit" value="Iniciar sesion" className={styles.boton}></input>
    </form>
    {respuestaAdmin.length > 0 && <p>{respuestaAdmin}</p>}
    </div>}

    {select ==="doctor" &&<div className={styles.paleta}>
      <p>Doctor</p>
      <form onSubmit={sendLoginDoctor}>
      <h1>Iniciar sesion</h1>
      <input type="text" placeholder="username" onChange={usernameDoctor} value={loginDoctor.name} className={styles.forminput}></input>
      <input type="text" placeholder="password" onChange={passwordDoctor} value={loginDoctor.password} className={styles.forminput}></input>
      <input type="submit" value="Iniciar sesion" className={styles.boton}></input>
    </form>
    {respuestaDoctor.length > 0 && <p>{respuestaDoctor}</p>}
    </div>}

    {select ==="enfermero" && <div className={styles.paleta}>
      <p>Enfermero/a</p>
      <form onSubmit={sendLoginEnfermero}>
      <h1>Iniciar sesion</h1>
      <input type="text" placeholder="username" onChange={usernameEnfermero} value={loginEnfermero.username} className={styles.forminput}></input>
      <input type="text" placeholder="password" onChange={passwordEnfermero} value={loginEnfermero.password} className={styles.forminput}></input>
      <input type="submit" value="Iniciar sesion" className={styles.boton}></input>
    </form>
    {respuestaEnfermero.length > 0 && <p>{respuestaEnfermero}</p>}
    </div>}

    {select ==="operador" && <div className={styles.paleta}>
      <p>Operador/a</p>
      <form onSubmit={sendLoginOperador}>
      <h1>Iniciar sesion</h1>
      <input type="text" placeholder="username" onChange={usernameOperador} value={loginOperador.username} className={styles.forminput}></input>
      <input type="text" placeholder="password" onChange={passwordOperador} value={loginOperador.password} className={styles.forminput}></input>
      <input type="submit" value="Iniciar sesion" className={styles.boton}></input>
    </form>
    </div>}


    </div>
}