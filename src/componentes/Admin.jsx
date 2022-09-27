import React from "react";
import {useState,useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import styles from "./Admin.module.css"
import { BsBook } from 'react-icons/bs';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineMedicineBox } from 'react-icons/ai';
import { BiPlusMedical } from 'react-icons/bi';
import { AiOutlineUser } from 'react-icons/ai';
import { AiTwotoneSetting } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { AiTwotoneEdit } from 'react-icons/ai';

export default function Admin(){

    //INDICADORES ADD
    const [indicadores,setIndicadores] = useState([])
    const [indicadoresEdit,setIndicadoresEdit] = useState({
      min:"",
      max:""
    })
    const indicadoresEditMin=(e)=>{
      setIndicadoresEdit({...indicadoresEdit, min:e.target.value})
    }
    const indicadoresEditMax=(e)=>{
      setIndicadoresEdit({...indicadoresEdit, max:e.target.value})
    }
    const sendIndicadoresEdit=async(e)=>{
      let idIndicador=indicadorSelected[0].id
      console.log(idIndicador)
      e.preventDefault()
      await axios.put(`http://localhost:4000/editindicador/${idIndicador}`,indicadoresEdit).then(e=>{alert(e.data)}).then(e=>{
        setIndicadoresEdit({
          min:"",
          max:"",
        })
      })

    }
    const [newIndicador,setNewIndicador]=useState({
      name:"",
      max:"",
      min:"",
      description:""
    })
    const [indicadorSelected,setIndicadorSelected] = useState([])
    const nameNewIndicador=(e)=>{
      setNewIndicador({...newIndicador,name:e.target.value})
    }
    const maxNewIndicador=(e)=>{
      setNewIndicador({...newIndicador,max:e.target.value})
    }
    const minNewIndicador=(e)=>{
      setNewIndicador({...newIndicador,min:e.target.value})
    }
    const descriptionNewIndicador=(e)=>{
      setNewIndicador({...newIndicador,description:e.target.value})
    }
    const newIndicadorHandler=(e)=>{
      e.preventDefault()
      axios.post(`http://localhost:4000/addindicador`,newIndicador).then((e)=>{alert(e.data)})
      setNewIndicador({
        name:"",
        max:"",
        min:"",
        description:""
      })
    }
    //SINTOMAS ADD
    const [sintomas,setSintomas] = useState([])
    const [newSintoma,setNewSintoma]=useState({
      name:"",
      description:""
    })
    const nameNewSintoma=(e)=>{
      setNewSintoma({...newSintoma,name:e.target.value})
    }
    const descriptionNewSintoma=(e)=>{
      setNewSintoma({...newSintoma,description:e.target.value})
    }
    const newSintomaHandler=(e)=>{
      e.preventDefault()
      axios.post(`http://localhost:4000/addsintoma`,newSintoma).then((e)=>{alert(e.data)})
      setNewSintoma({
        name:"",
        description:""
      })
    }
    
    
    const [formcuidador,setFormcuidador]=useState({
      name:"",
      lastname:"",
      mail:"",
      parentesco:""
    })
    const [cuidadores,setCuidadores]=useState([])

    const [selectedUser,setSelectedUser] = useState([])
    const [doctors,setDoctors] = useState([])
    const [nurses,setNurses] = useState([])
    const [clients,setClients] = useState([])
    const [searcher,setSearcher] = useState(clients)
    const [show,setShow] = useState("panel")
    const [edit,setEdit]= useState([])
    const [sendEdit,setSendEdit]= useState({
      mail:"",
      password:""
    })
    const clientMailHandler=(e)=>{
      setSendEdit({...sendEdit,mail:e.target.value})
    }
    const clientPasswordHandler=(e)=>{
      setSendEdit({...sendEdit,password:e.target.value})
    }
    const sendUpdateClient=async(e)=>{
      let idCliente=edit[0].id
      e.preventDefault()
      axios.put(`http://localhost:4000/all/${idCliente}`,sendEdit).then((e)=>{alert(e.data.response)})
      setSendEdit({
        mail:"",
      password:""
      })
    }

    //ADD CUIDADOR

    const sendcuidador=async(e)=>{
      e.preventDefault()
      let idCliente=selectedUser[0].id
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
    useEffect(()=>{
        axios.get("http://localhost:4000/doctors").then((e)=>{setDoctors(e.data)})
        axios.get("http://localhost:4000/nurses").then((e)=>{setNurses(e.data)})
        axios.get("http://localhost:4000/all").then((e)=>{setClients(e.data);setSearcher(e.data)})
        axios.get("http://localhost:4000/getindicadores").then((e)=>{setIndicadores(e.data)})
        axios.get("http://localhost:4000/getsintomas").then((e)=>{setSintomas(e.data)})
        
    },[])
    const search=(e)=>{
      var lowercase=e.target.value.toLowerCase();
     
      const buscado=clients.filter(clientes=>{return clientes.name.toLowerCase().includes(lowercase)})
      setSearcher(buscado)
      
    }
    const searcherEnfermeros =(e)=>{
      var lowercase=e.target.value.toLowerCase();
     
      const buscado=nurses.filter(enfermeros=>{return enfermeros.name.toLowerCase().includes(lowercase)})
      
      setNurses(buscado)
      console.log(nurses)
    }
    return <div className={styles.home}>
        <div className={styles.nav}>
        <ul>
            
            
            <li className={styles.cerrarsesion} onClick={()=>{window.location.href="/"}}>Salir</li>
            </ul>
        </div>
        <div className={styles.principal}>
        {/*<img className={styles.logo} src={require("../assets/logo.png")}></img>*/}
            {show=="panel" && <div className={styles.panelcontenedor}>
              <div style={{padding:"30px"}}><h4>Realizar accion</h4></div>
            
               <div className={styles.panel}>
            <div className={styles.opcion} onClick={()=>{setShow("dashboard")}}><BsBook className={styles.icon}/>Dashboard</div>
            <Link to="/new-account" onClick={()=>{setShow("cuentas")}} className={styles.opcion}><AiOutlineUserAdd className={styles.icon}/>Creacion de cuentas</Link>
            <div className={styles.opcion} onClick={()=>{setShow("doctores")}} ><AiOutlineMedicineBox className={styles.icon}/>Doctores</div>
            <div className={styles.opcion} onClick={()=>{setShow("enfermeros")}} ><BiPlusMedical className={styles.icon}/>Enfermeros/as</div>
            <div className={styles.opcion} onClick={()=>{setShow("clientes")}} ><AiOutlineUser className={styles.icon}/>Clientes</div>
            <div className={styles.opcion} onClick={()=>{setShow("gestionar")}} ><AiTwotoneSetting className={styles.icon}/>Gestionar Indicadores/Síntomas</div>
            </div></div>}

            {show=="doctores" && <div>
            <table class="table table-bordered" >
  <thead class="thead">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Usuario</th>
      <th scope="col">DNI</th>
      <th scope="col">Codigo</th>
    </tr>
  </thead>
  <tbody>
  {doctors.length>0 && doctors.map(e=>{return(<>
  <tr>
  <th scope="row">1</th>
  <td>{e.name}</td>
  <td>{e.lastname}</td>
  <td>{e.username}</td>
  <td>{e.dni}</td>
  <td>{e.codigo}</td>
  </tr>
  </>)})
  }
  </tbody>
</table>
<button className={styles.volver} onClick={()=>{setShow("panel")}}>Volver</button> 
                </div>}

                {show=="enfermeros" && <div>
                <input placeholder="Buscar cliente"  class="form-control mr-sm-2" aria-label="Search" onChange={searcherEnfermeros}></input>
            <table class="table table-bordered" >
  <thead class="thead">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Usuario</th>
      <th scope="col">DNI</th>
    </tr>
  </thead>
  <tbody>
  {nurses.length>0 && nurses.map(e=>{return(<>
  <tr>
  <th scope="row">1</th>
  <td>{e.name}</td>
  <td>{e.lastname}</td>
  <td>{e.username}</td>
  <td>{e.dni}</td>
  </tr>
  </>)})
  }
  </tbody>
</table>
<button className={styles.volver} onClick={()=>{setShow("panel")}}>Volver</button> 
                </div>}

                {show=="clientes" && <div className={styles.edituser}>
                  <div style={{padding:"20px",display: "flex",justifyContent: "space-between"}}><h4>Administrar clientes</h4> <button className={styles.volver} onClick={()=>{setShow("panel")}}>Volver</button> </div>
                  
                  <input placeholder="Buscar cliente"  class="form-control mr-sm-2" aria-label="Search" onChange={search}></input>
            <table class="table table-bordered" >
  <thead class="thead">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope="col">Usuario</th>
      <th scope="col">DNI</th>
      <th scope="col">Correo</th>
      <th scope="col">Celular</th>
      <th scope="col">Gestionar</th>
    </tr>
  </thead>
  <tbody>
  {clients.length>0 && searcher.map(e=>{return(<>
  <tr>
  <th scope="row">1</th>
  <td>{e.name}</td>
  <td>{e.lastname}</td>
  <td>{e.username}</td>
  <td>{e.dni}</td>
  <td>{e.mail}</td>
  <td>{e.whatsapp}</td>
  <td><button className={styles.gestionaruserbutton} onClick={()=>{
    setShow("verusuario")
    let idCliente=e.id
    let clienteSelected=clients.filter(item=>{ return item.id == idCliente})
    setSelectedUser(clienteSelected)
    axios.get(`http://localhost:4000/info-paciente-cuidador/${idCliente}`).then(response => {setCuidadores(response.data)})
  }}><AiFillEye/>Ver usuario</button>
  <button className={styles.gestionaruserbutton} onClick={()=>{
    setShow("edit")
    
    let idCliente=e.id
    let clienteEditar=clients.filter(item=>{ return item.id == idCliente})
    setEdit(clienteEditar)

    }}><AiTwotoneEdit/>Editar</button></td>
  </tr>
  </>)})
  }
  </tbody>
</table>

                </div>}




                {
    show=="edit" && <div className={styles.edituserdata}>
    Editar datos de cliente:{edit.length>0 && <p>{edit[0].name} {edit[0].lastname}</p>  }
    <form onSubmit={sendUpdateClient}>
  <div class="form-group">
    <label for="exampleInputEmail1">Actualizar correo electrónico</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Actulizar mail" onChange={clientMailHandler}/>
    
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Actualizar contraseña</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Actualizar contraseña" onChange={clientPasswordHandler}/>
  </div>
  
  <button type="submit" class="btn btn-primary">Actualizar datos</button>
</form>
<button onClick={()=>{setShow("clientes")}} className={styles.volver}>Volver</button>
    </div>
}

{show=="gestionar" && <div className={styles.ajustes}>
<button onClick={()=>{setShow("panel")}} className={styles.volver}>Volver</button>
<div className={styles.ajustescontenedor}>
  <div className={styles.gestionindicadores}>
    <h2>Gestion de Indicadores</h2>
    <p>Aqui podrá visualizar, editar, eliminar y añadir nuevos indicadores que podrán ser utilizados por el sistema</p>
    <table class="table table-bordered" >
  <thead class="thead">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Valor mínimo</th>
      <th scope="col">Valor máximo</th>
      <th scope="col">Editar indicador</th>
    </tr>
  </thead>
  <tbody>
  {indicadores.length>0 && indicadores.map(e=>{return(<>
  <tr>
  <th scope="row">1</th>
  <td>{e.name}</td>
  <td>{e.min_value}</td>
  <td>{e.max_value}</td>
  <td>
  <button className={styles.gestionaruserbutton} onClick={()=>{
    setShow("editindicador")
    
    let idIndicador=e.id
    let indicadorEditar=indicadores.filter(item=>{ return item.id == idIndicador})
    console.log(indicadorEditar)
    setIndicadorSelected(indicadorEditar)

    }}><AiTwotoneEdit/>Editar</button></td>
  </tr>
  </>)})
  }
  </tbody>
</table>
    <button onClick={()=>{setShow("addindicador")}} className={styles.volver}>Añadir nuevo indicador</button>
  </div>
  <div className={styles.gestionsintomas}>
  <h2>Gestion de Sintomas</h2>
    <p>Aqui podrá visualizar, editar, eliminar y añadir nuevos síntomas para ser utilizados por los clientes</p>
    
    
    
    
    <table class="table table-bordered" >
  <thead class="thead">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Descripcion del síntoma</th>
      <th scope="col">Gestionar</th>
    </tr>
  </thead>
  <tbody>
  {sintomas.length>0 && sintomas.map(e=>{return(<>
  <tr>
  <th scope="row">1</th>
  <td>{e.name}</td>
  <td>{e.description}</td>
  <td>
  <button className={styles.gestionaruserbutton} onClick={()=>{
    setShow("edit")
    
    let idCliente=e.id
    let clienteEditar=clients.filter(item=>{ return item.id == idCliente})
    setEdit(clienteEditar)

    }}><AiTwotoneEdit/>Eliminar</button></td>
  </tr>
  </>)})
  }
  </tbody>
</table>
    <button onClick={()=>{setShow("addsintoma")}} className={styles.volver}>Añadir nuevo síntoma</button>
  </div>
    
  </div>
  </div>
  }

{show=="addindicador" && <div className={styles.ajustes}>
<button onClick={()=>{setShow("gestionar")}} className={styles.volver}>Volver a gestion</button>
<form onSubmit={newIndicadorHandler}>
  <div class="form-group">
    <label for="exampleInputEmail1">Nombre del indicador</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Añadir nombre a su indicador" onChange={nameNewIndicador} value={newIndicador.name}/>
  </div>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Valor mínimo</label>
      <input type="number" class="form-control" id="inputEmail4" placeholder="Ingresar valor mínimo" onChange={minNewIndicador} value={newIndicador.min} />
    </div>
    <div class="form-group col-md-6">
      <label for="inputPassword4">Valor máximo</label>
      <input type="number" class="form-control" id="inputPassword4" placeholder="Ingresar valor máximo" onChange={maxNewIndicador} value={newIndicador.max}/>
    </div>
    <small id="emailHelp" class="form-text text-muted">Recuerde que los valores deben registrarse con un mínimo y máximo referente a lo normal</small>
  </div>

  <div class="form-group">
    <label for="exampleInputEmail1">Descripcion</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Añadir breve descripcion del indicador" onChange={descriptionNewIndicador} value={newIndicador.description}/>
  </div>
  
  <button type="submit" class="btn btn-primary">Añadir indicador</button>
</form>
  </div>}

  {show=="addsintoma" && <div className={styles.ajustes}>
  <button onClick={()=>{setShow("gestionar")}} className={styles.volver}>Volver a gestion</button>
<form onSubmit={newSintomaHandler}>
  <div class="form-group">
    <label for="exampleInputEmail1">Nombre del síntoma</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar nombre del síntoma" onChange={nameNewSintoma} value={newSintoma.name}/>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Descripcion del síntoma</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Añadir breve descripcion del síntoma" onChange={descriptionNewSintoma} value={newSintoma.description}/>
  </div>
  <button type="submit" class="btn btn-primary">Añadir síntoma</button>
</form>
  </div>}

  {show=="verusuario" && <div className={styles.ajustes}>
  <button onClick={()=>{setShow("clientes")}} className={styles.volver}>Volver a clientes</button>
<div className={styles.cuidadorespanel}>

  <div className={styles.verusuarioizquierda}>
    {selectedUser.length>0 && <div className={styles.datauser}>
      <p>Nombre del cliente: {selectedUser[0].name}<br/>
      Apellido del cliente: {selectedUser[0].lastname}<br/>
      Nombre del cliente: {selectedUser[0].username}<br/>
      Nombre de usuario del cliente: {selectedUser[0].mail}<br/>
      Correo electrónico del cliente: {selectedUser[0].dni}<br/>
      DNI: {selectedUser[0].name}<br/>
      </p>
      </div>}
  </div>

  <div className={styles.verusuarioderecha}>
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

  </div>}

{show=="editindicador" && <div>
{indicadorSelected.length>0?
<div>
<button onClick={()=>{setShow("gestionar")}} className={styles.volver}>Volver a gestion</button>
 <h4>Editar valores mínimos y máximos de: {indicadorSelected[0].name} </h4>

 <form onSubmit={sendIndicadoresEdit}>
  <p>Recuerde que usted puede editar minimos y máximos para visualizar si un paciente registra valores fuera de estos campos</p>
  <div class="form-group">
    
    <label for="exampleInputEmail1">Valor mínimo de {indicadorSelected[0].name} </label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar nuevo valor mínimo" onChange={indicadoresEditMin} value={indicadoresEdit.min}/>
    <label for="exampleInputEmail1">Valor máximo de {indicadorSelected[0].name}</label>
    <input type="mail" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresar nuevo valor máximo" onChange={indicadoresEditMax} value={indicadoresEdit.max}/>
    
  </div>
  <button type="submit" class="btn btn-primary">Actualizar valores</button>
</form>
</div>
:<p>No se pudo acceder a data</p>}
  </div>}
        </div>
    </div>
}


