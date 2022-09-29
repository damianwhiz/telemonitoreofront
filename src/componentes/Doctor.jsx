import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import styles from "./Doctor.module.css"
import { useContext } from "react";
import { Context } from "../Contex.js";
import { Link } from "react-router-dom";
import AsignarPlanMonitoreo from "./AsignarPlanMonitoreo"
import CardInfoUser from "./CardInfoUser";

export default function Enfermero(){
    
    const [pacienteaRegistrar,setPacienteaRegistrar] = useState(false)
    const [indicadores,setIndicadores] = useState([])
    const [infoUserCard,setInfoUserCard] = useState([])
    const token=localStorage.getItem('token')
    const id=localStorage.getItem('id')
    const [onScreen,setOnScreen] = useState("home")
    const [infoDoctor,setInfoDoctor] = useState([])
    const [myClientsRegistrados,setMyClientsRegistrados] = useState([]) 
    const [myClientsNoRegistrados,setMyClientsNoRegistrados] = useState([])
    const [allClients,setAllClients] = useState([])
    const [clientsRegistrados,setClientsRegistrados] = useState([])
    const [clientsNoRegistrados,setClientsNoRegistrados] = useState([])
    
    const [isSelected,setIsSelected] = useState("mispacientes")
    useEffect((e)=>{

      async function fetch(){
        axios.get(`${process.env.REACT_APP_URL_BACK}/getindicadores`).then(e=>{
        setIndicadores(e.data)
        
      })
        axios.get(`${process.env.REACT_APP_URL_BACK}/info-doctor/${id}`).then((e)=>{
            setInfoDoctor(e.data.doctor[0]);
            
        })

      axios.get(`${process.env.REACT_APP_URL_BACK}/info-clients-total`).then(e=>{
            setAllClients(e.data)
            let idDoctor=localStorage.getItem('id');
            let clientes=e.data.filter(e=>e.infoUser.id_doctor==idDoctor)
            let myClientsRegistrados=clientes.filter(e=>e.infoUser.registrado==true && e.registros.length>0  && e.signosVitales.length>0)
            

           
            
            setMyClientsRegistrados(myClientsRegistrados) 
            console.log(myClientsRegistrados)
            let myClientsNoRegistrados=clientes.filter(e=>e.infoUser.registrado==false)
            setMyClientsNoRegistrados(myClientsNoRegistrados)

            let registrados=e.data.filter(e=>e.infoUser.registrado==true)
            setClientsRegistrados(registrados)

            let noregistrados=e.data.filter(e=>e.infoUser.registrado==false)
            setClientsNoRegistrados(noregistrados)
            
        })

      }
      
      fetch()
        
    },[])
    
const home=()=>{
  setOnScreen("home")
}
    
    return <div className={styles.home}>
        <div className={styles.nav}>
        <ul>
        <li className={styles.salir} onClick={()=>{setOnScreen("perfildoctor")}}>Mi perfil</li>
        <li className={styles.salir} onClick={()=>{localStorage.removeItem('id');localStorage.removeItem('token');window.location.href="/"}}>Salir</li>
        </ul>
        </div>
        {onScreen=="home" &&
        <div className={styles.principal}>
            <div className={styles.panel}>
                <div className="welcome">
                <h1>Bienvenido/a {infoDoctor.name} {infoDoctor.lastname}</h1>
                <p>Aqui abajo podrá visualizar una lista con sus pacientes designados</p>
                </div>
                <div className={styles.opcionestable}>
                <ul><li onClick={()=>{setIsSelected("mispacientes")}}>Mis pacientes</li><li onClick={()=>{setIsSelected("todos")}}>Todos los pacientes</li><li onClick={()=>{setIsSelected("registrados")}}>Pacientes registrados al plan de monitoreo</li><li onClick={()=>{setIsSelected("noregistrados")}}>Pacientes no registrados al plan de monitoreo</li></ul> </div>
                <ul>
                  <li>Paciente delicado, su estado general es bajo <div className={styles.delicado}></div></li>
                  <li>Paciente registra estado fuera de lo normal <div className={styles.registrofueranormal}></div></li>
                  <li>Paciente no responde a los mensajes <div className={styles.noresponde}></div></li>
                </ul>
                {isSelected=="mispacientes"&&
                <div className="clientes">
                    
                    
<table class="table table-bordered" >
  <thead class="thead">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Estado</th>
      <th scope="col">Usuario</th>
    </tr>
  </thead>
  <tbody>
  {myClientsRegistrados.length>0 && myClientsRegistrados.map(e=>{return (
                    < >
                    <tr>
                    <th scope="row">1</th>
                    <td>{e.infoUser.name}</td>
                    <td>{e.infoUser.lastname}</td>
                    <td>
                      
                    

                      {e.signosVitales[0].temperatura<indicadores[0].min_value || e.signosVitales[0].temperatura>indicadores[0].max_values||
                       e.signosVitales[0].presion_arterial<indicadores[1].min_value || e.signosVitales[0].presion_arterial>indicadores[1].max_value ||
                       e.signosVitales[0].frecuencia_respiratoria<indicadores[2].min_value || e.signosVitales[0].frecuencia_respiratoria>indicadores[2].max_value ||
                       e.signosVitales[0].frecuencia_cardiaca<indicadores[3].min_value || e.signosVitales[0].frecuencia_cardiaca>indicadores[3].max_value ||
                       e.signosVitales[0].saturacion_oxigeno<indicadores[4].min_value || e.signosVitales[0].saturacion_oxigeno>indicadores[4].max_value ||
                       e.signosVitales[0].peso<indicadores[5].min_value || e.signosVitales[0].peso>indicadores[5].max_value ||
                       e.signosVitales[0].imc<indicadores[6].min_value || e.signosVitales[0].imc>indicadores[6].max_value ||
                       e.signosVitales[0].grasa_corporal<indicadores[7].min_value || e.signosVitales[0].grasa_corporal>indicadores[7].max_value ||
                       e.signosVitales[0].perimetro_abdominal<indicadores[8].min_value || e.signosVitales[0].perimetro_abdominal>indicadores[8].max_value ||
                       e.signosVitales[0].reaccion_orina<indicadores[9].min_value || e.signosVitales[0].reaccion_orina>indicadores[9].max_value ||
                       e.signosVitales[0].beg<indicadores[10].min_value || e.signosVitales[0].beg>indicadores[10].max_value ||
                       e.signosVitales[0].reg<indicadores[11].min_value || e.signosVitales[0].reg>indicadores[11].max_value ||
                       e.signosVitales[0].meg<indicadores[12].min_value || e.signosVitales[0].meg>indicadores[12].max_value
                      

  ?<div className={styles.registrofueranormal}></div>:<div className={styles.registronormal}></div>}
                      </td> 
                    <td><button className={styles.ver} onClick={()=>{
                      setIsSelected("registros")
                      let idCliente=e.infoUser.id
                    let cliente=allClients.filter(e=>e.infoUser.id==idCliente)
                    setInfoUserCard(cliente)
                    }}>Ver usuario</button></td>
                    </tr>
                    
                        </>
                        )})}
  </tbody>
</table>

<h4>Mis pacientes no registrados</h4>
<table class="table table-bordered" >
  <thead class="thead">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Accion</th>
      
    </tr>
  </thead>
  <tbody>
  {myClientsNoRegistrados.length>0 && myClientsNoRegistrados.map(e=>{return (
                    < >
                    <tr>
                    <th scope="row">1</th>
                    <td>{e.infoUser.name}</td>
                    <td>{e.infoUser.lastname}</td>
                    
                    <td><button className={styles.ver} onClick={async()=>{
                      let idCliente=e.infoUser.id
                     
                      setOnScreen("asignarplanmonitoreo")
                      
                    let cliente=allClients.filter(e=>e.infoUser.id==idCliente)
                    setPacienteaRegistrar(cliente) 

                    }}>Registrar usuario</button></td>
                    </tr>
                    
                        </>
                        )})}
  </tbody>
</table>


                </div>}

                {isSelected=="todos"&&
                <div className="clientes">
                    
                    
<table class="table table-bordered" >
  <thead class="thead">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Usuario</th>
    </tr>
  </thead>
  <tbody>
  {allClients.length>0 && allClients.map(e=>{return (
                    < >
                    <tr>
                    <th scope="row">1</th>
                    <td>{e.infoUser.name}</td>
                    <td>{e.infoUser.lastname}</td>
                    <td><button className={styles.ver} onClick={()=>{setIsSelected("registros")
                    let idCliente=e.infoUser.id
                    let cliente=allClients.filter(e=>e.infoUser.id==idCliente)
                    setInfoUserCard(cliente)
                  }}>Ver usuario</button></td>
                    </tr>
                    
                        </>
                        )})} 
    
    
  </tbody>
</table>
                </div>}

                {isSelected=="registrados"&&
                <div className="clientes">
                    
                    
<table class="table table-bordered" >
  <thead class="thead">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Usuario</th>
    </tr>
  </thead>
  <tbody>
  {clientsRegistrados.length>0 && clientsRegistrados.map(e=>{return (
                    < >
                    <tr>
                    <th scope="row">1</th>
                    <td>{e.infoUser.name}</td>
                    <td>{e.infoUser.lastname}</td>
                    <td><button className={styles.ver} onClick={()=>{
                      setIsSelected("registros")
                      let idCliente=e.infoUser.id
                    let cliente=allClients.filter(e=>e.infoUser.id==idCliente)
                    setInfoUserCard(cliente)
                    }}>Ver usuario</button></td>
                    </tr>
                    
                        </>
                        )})} 
    
    
  </tbody>
</table>
                </div>}

                {isSelected=="noregistrados"&&
                <div className="clientes">
                    
                    
<table class="table table-bordered" >
  <thead class="thead">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Usuario</th>
    </tr>
  </thead>
  <tbody>
  {clientsNoRegistrados.length>0 && clientsNoRegistrados.map(e=>{return (
                    < >
                    <tr>
                    <th scope="row">1</th>
                    <td>{e.infoUser.name}</td>
                    <td>{e.infoUser.lastname}</td>
                    <td><button className={styles.ver} onClick={()=>{
                      setIsSelected("registros")
                      let idCliente=e.infoUser.id
                    let cliente=allClients.filter(e=>e.infoUser.id==idCliente)
                    setInfoUserCard(cliente)
                    }}>Ver usuario</button></td>
                    </tr>
                    
                        </>
                        )})} 
    
    
  </tbody>
</table>
                </div>}
                 {isSelected=="registros"&&
                 <div className={styles.datospaciente}>
                  <CardInfoUser info={infoUserCard}/>
                </div>
                }
                
                



            </div>
        </div>}
        {onScreen=="perfildoctor"&&
                <div className={styles.perfildoctor}>
                  <h2>Mi perfil</h2>
                  <div className={styles.perfildoctorinfo}>
                    <ul>
                      <li>Nombre: {infoDoctor.name}</li>
                      <li>Apellido: {infoDoctor.lastname}</li>
                      <li>Nombre de usuario: {infoDoctor.username}</li>
                      <li>DNI: {infoDoctor.dni}</li>
                      <li>Código de matriculación: {infoDoctor.codigo}</li>
                    </ul>
                    </div>
                    <button onClick={()=>{setOnScreen("home")}} className={styles.ver}>Volver</button>
                </div>
                }
        {onScreen=="asignarplanmonitoreo"&&
                <AsignarPlanMonitoreo props={pacienteaRegistrar}  home={home}/>
                }
    </div>
}