import React from "react";
import {useState,useEffect} from "react"
import axios from "axios"
export default function Asignar({props,home}){
    
  const [dataRegistro,setDataRegistro] = useState({
    idCliente: props[0].infoUser.id,
    enfermedad:false
  })
    const [sintomas,setSintomas] = useState([])
    const [formcuidador,setFormcuidador]=useState({
        name:"",
        lastname:"",
        mail:"",
        parentesco:""
      })
      const sendcuidador=async(e)=>{
        e.preventDefault()
        let idCliente=props[0].infoUser.id
        console.log(idCliente)
        axios.post(`http://localhost:4000/new-cuidador/${idCliente}`,formcuidador).then(e=>{alert(e.data)})
        setFormcuidador({
          name:"",
        lastname:"",
        mail:"",
        parentesco:""
        })
  
      }
      const namecuidador =(e)=>{
        setFormcuidador({...formcuidador,name:e.target.value})
      }
      const parentescocuidador =(e)=>{
        setFormcuidador({...formcuidador,parentesco:e.target.value})
      }
      const lastnamecuidador =(e)=>{
        setFormcuidador({...formcuidador,lastname:e.target.value})
      }
      const mailcuidador =(e)=>{
        setFormcuidador({...formcuidador,mail:e.target.value})
      }

      const [cuidadores,setCuidadores]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:4000/getsintomas").then((e)=>{setSintomas(e.data)})
        axios.get(`http://localhost:4000/info-paciente-cuidador/${props[0].infoUser.id}`).then(response => {setCuidadores(response.data)})
    },[])

     const registrarUsuario=async(e)=>{
      e.preventDefault()
      await axios.put(`http://localhost:4000/registraraplan`,dataRegistro).then(e=>{alert(e.data)})
     }
     const changePlan =(e)=>{
       let enfermedad=e.target.value
       setDataRegistro({...dataRegistro,enfermedad})
     }
    return <div>
        <button onClick={() =>{home()}}>Volver</button>
        <div>
        <h4>Registrar paciente al plan de monitoreo</h4>
        <p>Nombre del paciente : {props[0].infoUser.name}<br/>
        Apellido del paciente : {props[0].infoUser.lastname}<br/>
        DNI: {props[0].infoUser.dni}<br/>
        Numero de celular : {props[0].infoUser.whatsapp}
        </p>

        </div>
        
        <div>
            <h3>A que tipo de plan de monitoreo desea registrar al paciente?</h3>
            <div>
                <select onChange={changePlan}>
                    <option value="1">Plan de monitoreo DIABETES</option>
                    <option value="2">Plan de monitoreo ARTRITIS</option>
                    <option value="3">Plan de monitoreo OSTEOPOROSIS</option>
                    <option value="4">Plan de monitoreo HIPERTENSION</option>
                </select>
                <button onClick={registrarUsuario}>Registrar paciente</button>
            </div>
        </div>

        <div>
            <h4>Desea reportar algun síntoma?</h4>
        </div>

        <div>
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
        
        </div>
    </div>
}