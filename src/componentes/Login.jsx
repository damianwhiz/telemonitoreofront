import react from "react";
import styles from "./Login.module.css"
import {Link} from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

export default function Login(){
  
  const [login,setLogin]=useState({
    username:"",
    password:""
  })
  const[respuesta,setRespuesta]=useState("")
  const usernameHandlerLogin=(e)=>{
    setLogin({...login,username:e.target.value})
  }
  const passwordHandlerLogin=(e)=>{
    setLogin({...login,password:e.target.value})
  }
  const sendLogin=async(e)=>{
    e.preventDefault()
    await axios.post(`${process.env.REACT_APP_URL_BACK}/login`,login).then(e=>{
      console.log(e.data)
      if(e.data.token){
        localStorage.setItem("token",e.data.token)
      localStorage.setItem("id",e.data.payload.id)
      localStorage.setItem("whatsapp",e.data.payload.whatsapp)
      window.location.href="/home"
    }
    else{
      setRespuesta(e.data)
    }
    
    })
    setLogin({
      username:"",
      password:""
    })
  }


  return <div className={styles.center}>
    <div className="login">
    <div className={styles.paleta}>
      <form onSubmit={sendLogin}>
        <h1>Iniciar sesion</h1>
        <input type="text" placeholder="username" onChange={usernameHandlerLogin} value={login.username} className={styles.forminput}></input>
        <input type="text" placeholder="password" onChange={passwordHandlerLogin} value={login.password} className={styles.forminput}></input>
        <input type="submit" value="Iniciar sesion" className={styles.boton}></input>
      </form>
      {respuesta.length > 0 && <p>{respuesta}</p>}
      </div>
    
    
      <div className={styles.admin}>
        <div className={styles.admintext}><p>O inicie sesion como administrador</p></div>
        <div className={styles.botonadmin}><Link to="/login-admin">ADMIN</Link></div>
    
    </div>
    </div>
  </div>
}