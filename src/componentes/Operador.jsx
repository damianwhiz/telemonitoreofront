import React from "react";
import styles from "./Operador.module.css"
import { useState,useEffect } from "react";
import axios from "axios"
import { FiLogOut } from 'react-icons/fi';
export default function Operador(){
    const[clients,setClients] = useState([])
    const[registers,setRegisters] = useState([])
    const[isSelected,setIsSelected]=useState("panel")
    const [responsesOp,setResponsesOp] = useState({
        pill:"",
        head:"",
        general:"",
        num:"",
        date:""
    })
    const[client,setClient]= useState(false)
    const pacienteGestion=async(e)=>{
        e.preventDefault()
        try{
            setResponsesOp({...responsesOp,num:client[0].head})
            console.log("desde estado"+client[0].num)
            console.log("elestado"+responsesOp.num)
            setResponsesOp({...responsesOp,date:client[0].date})
        }
        catch(e){
            console.log(e)
        }
        
        console.log(responsesOp)
        
         
        
        
        //axios.post("http://localhost:4000/update-operator",responsesOp)
    
        
    }
    const pillsHandler =(e)=>{
        setResponsesOp({...responsesOp,pill:e.target.value})
        
    }
    const headHandler =(e)=>{ 
        setResponsesOp({...responsesOp,head:e.target.value})
    }
    const generalHandler =(e)=>{
        setResponsesOp({...responsesOp,general:e.target.value})
    }
    /*const showForm=(e)=>{
        setIsSelected(!isSelected)
        //var actual=registers.filter(e=>{ return registers[0].whatsapp==e.whatsapp})
        console.log(e.whatsapp)
    }*/
    useEffect(()=>{
        axios.get("http://localhost:4000/info-operator").then(e=>{
            setClients(e.data.clients)
            setRegisters(e.data.registers)
        })
    },[])
    return <div className={styles.home}>
        <div className={styles.nav}>
        
        <button className={styles.salir} onClick={()=>{localStorage.removeItem('id');localStorage.removeItem('token');window.location.href="/"}}><FiLogOut className={styles.icon}/>Salir</button>
        
        </div>
        <div className={styles.principal}>

            {isSelected=="panel"?<div className={styles.panel}>
            <div>
                <h1>Bienvenido!</h1>
                <h1>Clientes:</h1>
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
                {clients.length>0 && clients.map(e=>{return( 
                    <><tr>
                        <th scope="row">1</th>
                    <td>{e.name}</td>
                    <td>{e.lastname}</td>
                    <td><button className={styles.ver} onClick={()=>{
                        setIsSelected("verusuario")
                        let whatsapp=e.whatsapp
                        let coincidencias=registers.filter(e=>{ return e.whatsapp===whatsapp})
                        setClient(coincidencias)
                        
                    }}>Ver Paciente</button></td>
                    
                    </tr>
                </> 
                )})}
                </tbody>
</table>
                </div>
            </div>:
                < >
                <button className={styles.volver} onClick={()=>{setIsSelected("panel");setClient(false)}}>Volver</button>
                {client.length>0 ? client.map(e=>{return (
                    <div className={styles.cardform}>
                    <p>Registros a guardar del dia{e.date}</p>
                    <form onSubmit={pacienteGestion}>
                    <div><p>Ha tomado sus pastillas? El cliente respodió <strong>{e.second_question}</strong></p><input type="text" placeholder="El paciente ha tomado sus pastilas?" onChange={pillsHandler}></input></div>
                    <div><p>Has tenido dolor de cabeza? El cliente respodió <strong>{e.third_question}</strong></p><input type="text" placeholder="El paciente ha tenido dolor de cabeza?" onChange={headHandler}></input></div>
                    <div><p>Cual es tu estado general? El cliente respodió <strong>{e.first_question}</strong></p><input type="text" placeholder="Cual es el estado general del paciente? Del 1 al 5" onChange={generalHandler}></input></div>
                    <input className={styles.ver} type="submit" value="guardar"></input>
                    
                </form>  
                </div>
                )}) :<p>El paciente no posee registros</p>
                }
                
                
                </>}

        </div>
    </div>
}