import React from "react";
import styles from "./Home.module.css"
import {useState,useEffect} from "react"
import axios from "axios";
import {Link} from "react-router-dom"
import { FiLogOut } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { BsPencilSquare } from 'react-icons/bs';
import {Line} from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";

export default function Home(){
    
  console.log(process.env.REACT_APP_WEBSITE_NAME)
const whatsapp=localStorage.getItem('whatsapp')
const token=localStorage.getItem('token')
const id=localStorage.getItem('id')
const [data, setData] = useState([]);
const [show,setShow] = useState("principal");
const [grafico,setGrafico] =useState(false);
useEffect(()=>{
    async function fetchData() {
        await axios.get(`${process.env.REACT_APP_URL_BACK}/info-clients/${whatsapp}`).then(response => {
            setData(response.data);
            console.log(response.data[1])
            console.log(process.env.REACT_APP_URL_BACK)
            let fechas=response.data[1].map(e=>{return e.date})
            let estados=response.data[1].map(e=>{return e.first_question})
            setGrafico({
            labels:fechas,
            datasets:[{
            label:"Estado general del paciente",
            data:estados,
            backgroundColor:["pink","blue","green","yellow"],
            borderColor:["#c7204f"]
       }]
   })
        
        })

    }
 fetchData()
},[]);
     
    return <div className={styles.home}>
        <div className={styles.nav}>
        
        <ul>
        <li className={styles.salir} onClick={()=>{setShow("perfil")}}><CgProfile className={styles.icon}/>Mi perfil</li>
        <li className={styles.salir} onClick={()=>{localStorage.removeItem('whatsapp');localStorage.removeItem('id');localStorage.removeItem('token');window.location.href="/"}}><FiLogOut className={styles.icon}/>Salir</li>
        </ul>
        </div>
        {show=="principal" && 
        <div className={styles.principal}>
            <div className={styles.panel}>
                <div className={styles.bienvenido}>
                <h1>Bienvenido/a {data.length && data[0].name} {data.length && data[0].lastname}</h1>
                </div>
                <div className={styles.paneldown}>
                <div className={styles.sintomas}>
                    <div>
                    <p>Aqui abajo usted podra visualizar una lista de sus síntomas:</p>
                    <p>¿Tienes dudas? Mandanos un mensaje al siguiente <a style={{color:"#c7204f"}}>link</a></p>
                    {grafico!==false?<Line data={grafico}></Line>:<p>Parece que aun no tienes registros</p>}
                    </div>
                </div>
                <div className={styles.actualizaciones}>
                    <p>Ultimas actualizaciones de su plan de monitoreo:</p>
                    {data.length> 0 && data[1].length>0?<>
                        <p>Registro del dia {data[1].length>0 ? data[1][0].date:<p>Sin fechas registradas</p>}</p><br/>
                        
                    <div>
                        
                        <ul>
                            <li>Tomó sus pastillas:<strong> {data.length && data[1][0].pills} </strong></li>
                            <li>Presentó dolores de cabeza: <strong>{data.length && data[1][0].head}</strong></li>
                            <li>Signos Vitales: <strong>{data.length && data[1][0].vital_sign} </strong></li>
                            <li>Estado general: <strong></strong>{data.length && data[1][0].general} </li>
                            
                            
                        </ul>
                </div> 
                    <button onClick={()=>{setShow("registros")}} className={styles.verregistros}><BsPencilSquare className={styles.icon}/>Ver todos mis registros</button></> 
                    :
                    <p>Ups...todo parece indicar que aun no tienes registros. Tuviste problemas al registrarte a nuestro plan de monitoreo?<br/>
                    Por favor, accede al siguiente <a href="https://wa.me/14155238886">link</a> y escribe<br/>
                    <strong>join giant-together</strong><br/>
                    </p>}
                </div> 
                </div>
            </div>
        </div>}
        {show=="perfil" && <div className={styles.profilecomponent}> <div className={styles.cardprofile}>
            <h1>Mi informacion</h1>
            <p>Nombre: {data[0].name} <br/>
            Apellido: {data[0].lastname}<br/>
            Nombre de usuario: {data[0].username}<br/>
            Correo electrónico: {data[0].mail}<br/>
            DNI: {data[0].dni}<br/>
            Numero de Whatsapp asociado: {data[0].whatsapp}<br/></p>
            <button className={styles.verregistros} onClick={()=>{setShow("principal")}}>Volver al inicio</button>
            {}
            </div>
            
            <div className={styles.verusuarioderecha}>
              
              {/*
              <form onSubmit={sendcuidador}>
                <h4>Añadir cuidador</h4>
                <p>Recuerde que usted puede añadir mas de un cuidador a un paciente</p>
                <div class="form-group">
                  <label for="exampleInputEmail1">Nombre del cuidador</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar nombre del cuidador" onChange={namecuidador} value={formcuidador.name}/>
                  <label for="exampleInputEmail1">Apellido del cuidador</label>
                  <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar apellido del cuidador" onChange={lastnamecuidador} value={formcuidador.lastname}/>
                  <label for="exampleInputEmail1">Correo del cuidador</label>
                  <input type="mail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar correo del cuidador" onChange={mailcuidador} value={formcuidador.mail}/>
                  <label for="exampleInputEmail1">Parentesco con el cliente</label>
                  <input type="mail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar el parentesco con el paciente" onChange={parentescocuidador} value={formcuidador.parentesco}/>
                </div>
                <button type="submit" class="btn btn-primary">Registrar cuidador</button>
              </form>
              <div>
                <h4>Lista de cuidadores designados</h4>
                <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Parentesco</th>
                  </tr>
                </thead>
                <tbody>
                {cuidadores.length>0&&cuidadores.map(e=>{return(
                    <tr>
                    <th scope="row">3</th>
                    <td>{e.name}</td>
                    <td>{e.lastname}</td>
                    <td>{e.parentesco}</td>
                  </tr>)
                })}
                  
                </tbody>
              </table>
                
                </div>
              */}
</div>


            </div>}
         
            {show=="registros" && <div>
                <div className={styles.volvermenu}>
                <button className={styles.verregistros} onClick={()=>{setShow("principal")}}>Volver al inicio</button>
                </div>
                
                <div className={styles.contenedor}>
                {data[1].length>0 ? data[1].map(e=>{return (
                    <div className={styles.cardprofile}>
                    <h4>Registros del dia: {e.date}</h4>
                    <p>Tomé mis pastillas?: {e.second_question} <br/>
                    Sentí dolor de cabeza?: {e.third_question} <br/>
                    En un promedio general del 1 al 5 me sentí: {e.first_question}<br/>
                   </p>
                </div>
                )}):<p>No tienes registros</p>}
                </div>
                </div>
            }
            
    </div>
}


