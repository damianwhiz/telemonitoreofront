import React from "react";
import axios from "axios"
import styles from "./LoginEnfermera.module.css"
import { useState,useEffect} from "react"
import {Link} from "react-router-dom"
import swal from 'sweetalert';
export default function LoginEnfermera(){

 
  //TESTENDO
    const [doctors,setDoctors] = useState([])
    const [nurses,setNurses] = useState([])
    
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL_BACK}/doctors`).then((e)=>{setDoctors(e.data)})
        axios.get(`${process.env.REACT_APP_URL_BACK}/nurses`).then((e)=>{setNurses(e.data)})
        
    },[])
    const idDoctor=(e)=>{
      setRegistroCliente({...registroCliente,doctor:e.target.value})
    }
    const idEnfermero =(e)=>{
      setRegistroCliente({...registroCliente,enfermero:e.target.value})
    }



    //LOGICA SELECT
    const [select,setSelected] = useState("cliente")
    const selectHandler=(e)=>{
      setSelected(e.target.value)
    }



    //REGISTRO CLIENTE
    const [registroCliente,setRegistroCliente]=useState({
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
      const clientNameHandler=(e)=>{
        setRegistroCliente({...registroCliente,name:e.target.value})
      }
      const clientLastnameHandler=(e)=>{
        setRegistroCliente({...registroCliente,lastname:e.target.value})
      }
      const clientMailHandler=(e)=>{
        setRegistroCliente({...registroCliente,mail:e.target.value})
      }
      const clientUsernameHandler=(e)=>{
        setRegistroCliente({...registroCliente,username:e.target.value})
      }
      const clientPasswordHandler=(e)=>{
        setRegistroCliente({...registroCliente,password:e.target.value})
      }
      const clientDniHandler=(e)=>{
        setRegistroCliente({...registroCliente,dni:e.target.value})
      }
      const clientWhatsappHandler=(e)=>{
        setRegistroCliente({...registroCliente,whatsapp:e.target.value})
      }
      const sendRegistroCliente=async(e)=>{
        e.preventDefault()
        await axios.post(`${process.env.REACT_APP_URL_BACK}/register`,registroCliente).then(e=>{
          swal("Guardado!", "Usuario creado exitosamente!", "success");
        })
        setRegistroCliente({
          name:"",
          lastname:"",
          mail:"",
          username:"",
          password:"",
          dni:"",
          doctor:"",
          enfermero:"",
          whatsapp:""
          
        })
      }


      //REGISTRO DOCTOR

      const [registroDoctor,setRegistroDoctor]=useState({
        name:"",
        lastname:"",
        codigo:"",
        username:"",
        password:"",
        dni:""
      })
      const doctorNameHandler=(e)=>{
        setRegistroDoctor({...registroDoctor,name:e.target.value})
      }
      const doctorLastnameHandler=(e)=>{
        setRegistroDoctor({...registroDoctor,lastname:e.target.value})
      }
      const doctorColegiaturaHandler=(e)=>{
        setRegistroDoctor({...registroDoctor,codigo:e.target.value})
      }
      const doctorUsernameHandler=(e)=>{
        setRegistroDoctor({...registroDoctor,username:e.target.value})
      }
      const doctorPasswordHandler=(e)=>{
        setRegistroDoctor({...registroDoctor,password:e.target.value})
      }
      const doctorDniHandler=(e)=>{
        setRegistroDoctor({...registroDoctor,dni:e.target.value})
      }
      const sendRegistroDoctor=async(e)=>{
        e.preventDefault()
        console.log(registroDoctor)
        await axios.post(`${process.env.REACT_APP_URL_BACK}/register-doctor`,registroDoctor).then(e=>{
          swal("Guardado!", "Usuario creado exitosamente!", "success");
        })
        setRegistroDoctor({
          name:"",
          lastname:"",
          codigo:"",
          username:"",
          password:"",
          dni:""
        })
      }

      //REGISTRO ENFERMERO

      const [registroEnfermero,setRegistroEnfermero]=useState({
        name:"",
        lastname:"",
        username:"",
        password:"",
        dni:""
      })
      const enfermeroNameHandler=(e)=>{
        setRegistroEnfermero({...registroEnfermero,name:e.target.value})
      }
      const enfermeroLastnameHandler=(e)=>{ 
        setRegistroEnfermero({...registroEnfermero,lastname:e.target.value})
      }  
      const enfermeroUsernameHandler=(e)=>{
        setRegistroEnfermero({...registroEnfermero,username:e.target.value})
      }
      const enfermeroPasswordHandler=(e)=>{
        setRegistroEnfermero({...registroEnfermero,password:e.target.value})
      }
      const enfermeroDniHandler=(e)=>{
        setRegistroEnfermero({...registroEnfermero,dni:e.target.value})
      }
      const sendRegistroEnfermero=async(e)=>{
        e.preventDefault()
        await axios.post(`${process.env.REACT_APP_URL_BACK}/register-nurse`,registroEnfermero).then(e=>{
          swal("Guardado!", "Usuario creado exitosamente!", "success");
        })
        setRegistroEnfermero({
          name:"",
          lastname:"",
          username:"",
          password:"",
          dni:""
        })
      }
    return <div className={styles.home}>
    <div className={styles.nav}>
    <ul>
        
        
        <li className={styles.salir} onClick={()=>{window.location.href="/admin"}}>Volver</li>
        <li className={styles.salir} onClick={()=>{window.location.href="/"}}>Salir</li>
        </ul>
    </div>
    <div className={styles.principal}>
        
    <div className={styles.panel}>
        <div className={styles.explicacion}>
          <h4>Registrar nueva cuenta como:</h4>
        <select className="form-select" aria-label="Default select example" onChange={selectHandler}>
            <option selected value="cliente">Seleccionar cargo</option>
            <option value="cliente">Cliente</option>
            <option value="doctor">Doctor/a</option>
            <option value="enfermero">Enfermero/a</option>
        </select>
        </div>
        {select ==="cliente" && <div className={styles.paleta}>
        <form onSubmit={sendRegistroCliente}>
        <h1>Registrar cliente</h1>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">Nombre</label>
      <input type="text" className="form-control" id="inputEmail4" placeholder="Nombre del cliente" onChange={clientNameHandler} value={registroCliente.name}/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">Apellido</label>
      <input type="text" className="form-control" id="inputPassword4" placeholder="Apellido del cliente" onChange={clientLastnameHandler} value={registroCliente.lastname}/>
    </div>
  </div>
  <div className="form-group">
    <label for="inputAddress">Nombre de usuario</label>
    <input type="text" className="form-control" id="inputAddress" placeholder="Nombre del usuario" onChange={clientUsernameHandler} value={registroCliente.username}/>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">Correo Electrónico</label>
      <input type="email" className="form-control" id="inputEmail4" placeholder="Mail" onChange={clientMailHandler} value={registroCliente.mail}/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">Contraseña</label>
      <input type="text" className="form-control" id="inputPassword4" placeholder="Contraseña" onChange={clientPasswordHandler} value={registroCliente.password}/>
    </div>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">Numero de celular</label>
      <input type="text" className="form-control" id="inputEmail4" placeholder="Celular" onChange={clientWhatsappHandler} value={registroCliente.whatsapp}/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">DNI</label>
      <input type="text" className="form-control" id="inputPassword4" placeholder="Documento de identidad" onChange={clientDniHandler} value={registroCliente.dni}/>
    </div>
  </div>
  
  
  <button type="submit" className={styles.senddata} >Registrar usuario</button>
</form>

<div className={styles.doctores}>
            <p>Doctores disponibles:</p>
            {doctors.length>0?doctors.map(e=>{return <button className={styles.buttondoctor}  onClick={idDoctor} value={e.id}>{e.name} {e.lastname}</button>}):<p>Cargando doctores...</p>}
        </div>
        <div className={styles.enfermero}>
            <p>Enfermeras disponibles:</p>
            {nurses.length>0? nurses.map(e=>{return <button className={styles.buttonenfermero} onClick={idEnfermero} value={e.id}>{e.name} {e.lastname}</button>}):<p>Cargando enfermeras...</p>}
        </div>

        </div>}

        {select==="doctor" && <div className={styles.paleta}>
        <form onSubmit={sendRegistroDoctor}>
        <h1>Registrar doctor</h1>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">Nombre</label>
      <input type="text" className="form-control" id="inputEmail4" placeholder="Nombre del doctor" onChange={doctorNameHandler} value={registroDoctor.name}/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">Apellido</label>
      <input type="text" className="form-control" id="inputPassword4" placeholder="Apellido del doctor" onChange={doctorLastnameHandler} value={registroDoctor.lastname}/>
    </div>
  </div>
  <div className="form-group">
    <label for="inputAddress">Nombre de usuario</label>
    <input type="text" className="form-control" id="inputAddress" placeholder="Nombre del usuario" onChange={doctorUsernameHandler} value={registroDoctor.username}/>
  </div>
  <div className="form-group">
      <label for="inputPassword4">Contraseña</label>
      <input type="text" className="form-control" id="inputPassword4" placeholder="Contraseña" onChange={doctorPasswordHandler} value={registroDoctor.password}/>
      </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">Codigo de colegiatura</label>
      <input type="text" className="form-control" id="inputEmail4" placeholder="Codigo de colegiatura" onChange={doctorColegiaturaHandler} value={registroDoctor.codigo}/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">DNI</label>
      <input type="text" className="form-control" id="inputPassword4" placeholder="Documento de identidad" onChange={doctorDniHandler} value={registroDoctor.dni}/>
    </div>
  </div>
  <button type="submit" className={styles.senddata}>Registrar doctor</button>
  </form>
      
        </div>}

        {select==="enfermero" && <div className={styles.paleta}>
        <form onSubmit={sendRegistroEnfermero}>
        <h1>Registrar enfermero</h1>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="inputEmail4">Nombre</label>
      <input type="text" className="form-control" id="inputEmail4" placeholder="Nombre del enfermero/a" onChange={enfermeroNameHandler} value={registroEnfermero.name}/>
    </div>
    <div className="form-group col-md-6">
      <label for="inputPassword4">Apellido</label>
      <input type="text" className="form-control" id="inputPassword4" placeholder="Apellido del enfermero/a" onChange={enfermeroLastnameHandler} value={registroEnfermero.lastname}/>
    </div>
  </div>
  <div className="form-group">
    <label for="inputAddress">Nombre de usuario</label>
    <input type="text" className="form-control" id="inputAddress" placeholder="Nombre del usuario" onChange={enfermeroUsernameHandler} value={registroEnfermero.username}/>
  </div>
  <div className="form-group">
      <label for="inputPassword4">Contraseña</label>
      <input type="text" className="form-control" id="inputPassword4" placeholder="Contraseña" onChange={enfermeroPasswordHandler} value={registroEnfermero.password}/>
      </div>
  
    
      <div className="form-group">
      <label for="inputPassword4">DNI</label>
      <input type="text" className="form-control" id="inputPassword4" placeholder="Documento de identidad" onChange={enfermeroDniHandler} value={registroEnfermero.dni}/>
    </div>
  
  <button type="submit" className={styles.senddata}>Registrar enfermero</button>
  </form>
    </div>}

        </div>
    </div>
</div>
    
    

}