import axios from 'axios';
import { useState,useEffect } from 'react';


function App() {
  //registro
  const [registro,setRegistro]=useState({
    username:"",
    password:"",
    name:""
  })
  const usernameHandler=(e)=>{
    setRegistro({...registro,username:e.target.value})
  }
  const passwordHandler=(e)=>{
    setRegistro({...registro,password:e.target.value})
  }
  const nameHandler=(e)=>{
    setRegistro({...registro,name:e.target.value})
  }
  const sendRegistro=async(e)=>{
    e.preventDefault()
    console.log(registro)
    await axios.post("http://localhost:4000/register",registro).then(e=>{console.log(e.data)})
    setRegistro({
      username:"",
      password:"",
      name:""
    })
  }
  //login
  const [login,setLogin]=useState({
    username:"",
    password:""
  })
  const usernameHandlerLogin=(e)=>{
    setLogin({...login,username:e.target.value})
  }
  const passwordHandlerLogin=(e)=>{
    setLogin({...login,password:e.target.value})
  }
  const sendLogin=async(e)=>{
    e.preventDefault()
    await axios.post("http://localhost:4000/login",login).then(e=>{setUsuario(e.data.rows[0].name)})
    setLogin({
      username:"",
      password:""
    })
  }
  //sesion
  const [usuario,setUsuario]=useState("")
  return (
    <div className="App">
      <form onSubmit={sendRegistro}>
        <h1>Registrese por favor</h1>
        <input type="text" placeholder="username" onChange={usernameHandler} value={registro.username}></input>
        <input type="text" placeholder="password" onChange={passwordHandler} value={registro.password}></input>
        <input type="text" placeholder="nombre" onChange={nameHandler} value={registro.name}></input>
        <input type="submit"></input>
      </form>
      <form onSubmit={sendLogin}>
        <h1>Inicie sesion</h1>
        <input type="text" placeholder="username" onChange={usernameHandlerLogin} value={login.username}></input>
        <input type="text" placeholder="password" onChange={passwordHandlerLogin} value={login.password}></input>
        <input type="submit"></input>
      </form>
      {usuario.length>1?<p>Bienvenido {usuario}</p>:<p>Por favor inicie sesion para continuar</p>}
    </div>
  );
}

export default App;
