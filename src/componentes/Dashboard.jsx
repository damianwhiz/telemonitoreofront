import react from "react";
import axios from "axios"
import { useState,useEffect} from "react"
import "./Dashboard.css"
export default function Dashboard(){
    const [pacientes,setPacientes] = useState(false)
    const [doctores,setDoctores] = useState(false)
    const [enfermeras,setEnfermeras] = useState(false)
    useEffect(() =>{
        axios.get("http://localhost:4000/all").then((response) =>{setPacientes(response.data)})
        axios.get("http://localhost:4000/nurses").then((response) =>{setEnfermeras(response.data)})
        axios.get("http://localhost:4000/doctors").then((response) =>{setDoctores(response.data)})
    },[])
    return <div className="dashboard">
        <div className="pacientes">
            <table className="table">
                <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Ver Usuario</th>
                </tr>
                </thead>
                <tbody>
                {pacientes==false?<p>Cargando</p>:pacientes.map(e=>{return <tr>
                <th scope="row">{e.id}</th>
                <td>{e.name}</td>
                <td>{e.password}</td>
                <td>@mdo</td>
                </tr>})}
                </tbody>
            </table>
        </div>
        <div className="enfermeras">
        <table className="table">
                <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">DNI</th>
                </tr>
                </thead>
                <tbody>
                {enfermeras==false?<p>Cargando</p>:enfermeras.map(e=>{return <tr>
                <th scope="row">{e.id}</th>
                <td>{e.name}</td>
                <td>{e.lastname}</td>
                <td>{e.dni}</td>
                </tr>})}
                </tbody>
            </table>
        </div>
        <div className="doctores">
        <table className="table">
                <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">DNI</th>
                </tr>
                </thead>
                <tbody>
                {doctores==false?<p>Cargando</p>:doctores.map(e=>{return <tr>
                <th scope="row">{e.id}</th>
                <td>{e.name}</td>
                <td>{e.lastname}</td>
                <td>{e.dni}</td>
                </tr>})}
                </tbody>
            </table>
        </div>
            
    </div>
}