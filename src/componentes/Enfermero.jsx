import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import styles from "./Enfermero.module.css"
import { useContext } from "react";
import { Context } from "../Contex.js";
import { FiLogOut } from 'react-icons/fi';
import { Link } from "react-router-dom";
import {Line} from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";
export default function Enfermero(){

    const [grafico,setGrafico] =useState(false);
    const token=localStorage.getItem('token')
    const id=localStorage.getItem('id')
    const [infoEnfermero,setInfoEnfermero] = useState([])
    const [infoClients,setInfoClients] = useState([])
    const [signosVitales,setSignosVitales] = useState({
        temperatura:"",
        presionArterial:"",
        frecuenciaRespiratoria:"",
        frecuenciaCardiaca:"",
        saturacionOxigeno:"",
        peso:"",
        imc:"",
        grasaCorporal:"",
        perimetroAbdominal:"",
        reaccionOrina:"",
        beg:"",
        reg:"",
        meg:"",
        estiloVida:"",
        signos:"",
        estadoGeneral:""
    })
    const temperatura=(e)=>{
        setSignosVitales({...signosVitales,temperatura:e.target.value})
    }
    const presionArterial=(e)=>{
        setSignosVitales({...signosVitales,presionArterial:e.target.value})
    }
    const frecuenciaRespiratoria=(e)=>{
        setSignosVitales({...signosVitales,frecuenciaRespiratoria:e.target.value})
    }
    const frecuenciaCardiaca=(e)=>{
        setSignosVitales({...signosVitales,frecuenciaCardiaca:e.target.value})
    }
    const saturacionOxigeno=(e)=>{
        setSignosVitales({...signosVitales,saturacionOxigeno:e.target.value})
    }
    const peso=(e)=>{
        setSignosVitales({...signosVitales,peso:e.target.value})
    }
    const imc=(e)=>{
        setSignosVitales({...signosVitales,imc:e.target.value})
    }
    const grasaCorporal=(e)=>{
        setSignosVitales({...signosVitales,grasaCorporal:e.target.value})
    }
    const perimetroAbdominal=(e)=>{
        setSignosVitales({...signosVitales,perimetroAbdominal:e.target.value})
    }
    const reaccionOrina=(e)=>{
        setSignosVitales({...signosVitales,reaccionOrina:e.target.value})
    }
    const beg=(e)=>{
        setSignosVitales({...signosVitales,beg:e.target.value})
    }
    const reg=(e)=>{
        setSignosVitales({...signosVitales,reg:e.target.value})
    }
    const meg=(e)=>{
        setSignosVitales({...signosVitales,meg:e.target.value})
    }
    const estiloVida=(e)=>{
        setSignosVitales({...signosVitales,estiloVida:e.target.value})
    }
    
    const signos=(e)=>{
        setSignosVitales({...signosVitales,signos:e.target.value})
    }
    const estadoGeneral=(e)=>{
      setSignosVitales({...signosVitales,estadoGeneral:e.target.value})
  }
    const [isSelected,setIsSelected] = useState("panel")
    const [selectedUser,setIsSelectedUser] = useState([])
    useEffect( (e)=>{
        var num=localStorage.getItem("token")
        var token="Bearer "+num
        
        axios.get(`http://localhost:4000/info-nurse/${id}`,{
            headers: {
                'authorization': token
              }
        }).then((e)=>{
            
            setInfoEnfermero(e.data[0]);
            var clientes=e.data
            clientes.shift()
            setInfoClients(clientes)
            
            

        
        })
        
    },[])
    
const verUsuario =(e)=>{
    setIsSelected("selected")
    let usuario=infoClients.filter(cliente=>{return cliente.id==e.target.value})
    setIsSelectedUser(usuario)
    
    let fechas=usuario[0].registros.map(e=>{return e.date})
            let estados=usuario[0].registros.map(e=>{return e.first_question})
            setGrafico({
            labels:fechas,
            datasets:[{
           label:"Estado general del paciente",
           data:estados,
           backgroundColor:["pink","blue","green","yellow"],
           borderColor:["#c7204f"]
       }]
   })

            
}
const pacienteGestion=(e)=>{
    e.preventDefault()
    var num=localStorage.getItem("token")
        var token="Bearer "+num
    let idCliente=selectedUser[0].id
    axios.post(`http://localhost:4000/update-info/${idCliente}`,signosVitales,{
        headers:{'authorization': token}
    }).then(e=>{alert(e.data)})

    setSignosVitales({
        temperatura:"",
        presionArterial:"",
        frecuenciaRespiratoria:"",
        frecuenciaCardiaca:"",
        saturacionOxigeno:"",
        peso:"",
        imc:"",
        grasaCorporal:"",
        perimetroAbdominal:"",
        reaccionOrina:"",
        beg:"",
        reg:"",
        meg:"",
        estiloVida:"",
        sintomas:"",
        signos:"",
        estadoGeneral:""
    })
}

    
    return <div className={styles.home}>
        <div className={styles.nav}>
        <ul>
        <li className={styles.salir}>Mi perfil</li>
        <li className={styles.salir} onClick={()=>{localStorage.removeItem('id');localStorage.removeItem('token');window.location.href="/"}}><FiLogOut className={styles.icon}/>Salir</li>
        </ul>
        </div>
        <div className={styles.principal}>
            <div className={styles.panel}>
               

                {isSelected=="panel" && <div className="clientes">
                <div className="welcome">
                <h1>Bienvenido/a {infoEnfermero.name} {infoEnfermero.lastname}</h1>
                <p>Aqui abajo podrá visualizar una lista con sus pacientes designados</p>
                </div>
                    <h1>Mis pacientes</h1>
                    
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
  {infoClients.length>0 && infoClients.map(e=>{return (
                    < >
                    <tr>
                    <th scope="row">1</th>
                    <td>{e.nombre}</td>
                    <td>{e.apellido}</td>
                    <td><button className={styles.ver} onClick={verUsuario} value={e.id}>Ver usuario</button></td>
                    </tr>
                    
                        </>
                        )})} 
    
    
  </tbody>
</table>
                </div>}
                {isSelected=="selected" && 
                <div className={styles.selected}>
                    <div className={styles.panelizquierdo}>
                        <div className={styles.infocliente}>
                            <h1>Informacion del paciente:</h1>
                            Nombre del paciente: { selectedUser.length>0 ? selectedUser[0].nombre :<p>Cargando...</p>}<br/>
                            Apellido del paciente: {selectedUser.length>0? selectedUser[0].apellido :<p>Cargando...</p>}


                        </div>
                        <div className={styles.graficos}>
                        {grafico!==false?<Line data={grafico}></Line>:<p>Parece que aun no tienes registros</p>}
                        </div>
                    </div>
                    <div className={styles.panelderecho}>
                        <button onClick={()=>{setIsSelected("panel")}} className={styles.ver} >Volver</button>

                    <div className={styles.panelderechoup}>
                    <h4>Actualizar signos vitales</h4> 
                    <p>Actualice los signos vitales del paciente: { selectedUser.length>0 ? selectedUser[0].nombre :<p>Cargando...</p>} {selectedUser.length>0? selectedUser[0].apellido :<p>Cargando...</p>}</p>
 
                    <button className={styles.ver} onClick={()=>{setIsSelected("update-data")}} >Actualizar</button>
                    </div>
                    
                <div className={styles.registros}>
                    <h4>Registros</h4>
                    <p>Ver historial de registros del paciente</p>
                    <button className={styles.ver} onClick={()=>{setIsSelected("registers")}} >Ver registros</button>
                </div>
                
                    </div>
                 
                </div>}
                
                {isSelected=="update-data" && <div className={styles.formdatos}>
                 <form className={styles.formnurse} onSubmit={pacienteGestion}>
                    <h4>Actualizar signos vitales del paciente</h4>
                    <p>Aqui podrás actualizar sus datos respectivamente</p>
                   
                    
    <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Temperatura</label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="Ingrese temperatura del paciente" onChange={temperatura} value={signosVitales.temperatura}/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Presion Arterial</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Ingresar presion arterial" onChange={presionArterial} value={signosVitales.presionArterial}/>
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Frecuencia Respiratoria</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="Ingresar frecuencia respiratoria" onChange={frecuenciaRespiratoria} value={signosVitales.frecuenciaRespiratoria}/>
  </div>
  <div class="form-group">
    <label for="inputAddress2">Frecuencia Cardíaca</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Ingresar frecuencia cardíaca" onChange={frecuenciaCardiaca} value={signosVitales.frecuenciaCardiaca}/>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Saturación de Oxigeno</label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="Ingrese saturación del oxigeno" onChange={saturacionOxigeno} value={signosVitales.saturacionOxigeno}/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Peso</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Ingresar peso del paciente" onChange={peso} value={signosVitales.peso}/>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">IMC</label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="Ingrese índice de masa corporal" onChange={imc} value={signosVitales.imc}/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Grasa corporal</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Grasa corporal del paciente" onChange={grasaCorporal} value={signosVitales.grasaCorporal}/>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Perímetro Abdominal</label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="Ingrese perímetro abdominal del paciente" onChange={perimetroAbdominal} value={signosVitales.perimetroAbdominal}/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Reaccción de su orina</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Reaccion de orina del paciente" onChange={reaccionOrina} value={signosVitales.reaccionOrina}/>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">BEG</label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="BEG del paciente" onChange={beg} value={signosVitales.beg}/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">REG</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="REG del paciente" onChange={reg} value={signosVitales.reg}/>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">MEG</label>
      <input type="text" class="form-control" id="inputEmail4" placeholder="MEG del paciente" onChange={meg} value={signosVitales.meg}/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Estilo de vida</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Describa el estilo de vida del paciente" onChange={estiloVida} value={signosVitales.estiloVida} />
    </div>
  </div>
  <div class="form-row">
  <div class="form-group col-md-6">
      <label for="inputPassword4">Estado general del paciente (del 1 al 5)</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Ingresar como se sintió el paciente del 1 al 5" onChange={estadoGeneral} value={signosVitales.estadoGeneral}/>
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Signos</label>
      <input type="text" class="form-control" id="inputPassword4" placeholder="Ingresar sigos que presentó el paciente" onChange={signos} value={signosVitales.signos}/>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">Actualizar datos</button>


                    
                </form>
                <button className={styles.ver} onClick={()=>{setIsSelected("selected")}}>Volver</button>
                </div> }
                

    {isSelected=="registers" && <div>
        <h4>Inspeccionar registros del usuario</h4>
        <div>
            {selectedUser.length>0 && selectedUser[0].registros.map(e=>{return <div>
                <p>Fecha del registro: {e.date}</p>
                <p>Respondió a la primer pregunta: {e.first_question}</p>
                <p>Respondió a la segunda pregunta:{e.second_question}</p>
                <p>Respondió a la tercer pregunta:{e.third_question}</p>
            </div>})}
        </div>
        <button onClick={()=>{setIsSelected("selected")}} className={styles.ver}>Volver</button>
        </div>}

            </div>
        </div>
    </div>
}