import React from "react";
import {Line} from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";
import {useState,useEffect} from "react"
import styles from "./CardInfoUser.module.css"
export default function CardInfoUser({info}){
    const [grafico,setGrafico] =useState(false)
useEffect(()=>{
    let fechas=info[0].registros.map(e=>{return e.date})
            let estados=info[0].registros.map(e=>{return e.first_question})
            setGrafico({
            labels:fechas,
            datasets:[{
           label:"Estado general del paciente",
           data:estados,
           backgroundColor:["pink","blue","green","yellow"],
           borderColor:["#c7204f"]
       }]
   })

},[])
    

    return <div>
        Nombre: {info[0].infoUser.name}
        Apellido: {info[0].infoUser.lastname}
        DNI: {info[0].infoUser.dni}
        <div className={styles.panelinfoclient}>

        <div className={styles.CardInfoUser}>
            <div>
            <h4>Estado general del paciente</h4>
            {grafico!==false?<Line data={grafico}></Line>:<p>Parece que aun no tienes registros</p>}
            </div>
        </div>
        <div className={styles.SignosVitales}>
            <h4>En el ultimo registro el paciente reportó:</h4>
            <ul>
                <li>Estado general:{info[0].signosVitales[0].estado_general}</li>
                <li>Frecuencia cardíaca:{info[0].signosVitales[0].frecuencia_cardiaca}</li>
                <li>Frecuencia respiratoria:{info[0].signosVitales[0].frecuencia_respiratoria}</li>
                <li>Grasa corporal:{info[0].signosVitales[0].grasa_corporal}</li>
                <li>Peso:{info[0].signosVitales[0].peso}</li>
                <li>Perímetro abdominal:{info[0].signosVitales[0].perimetro_abdominal}</li>
                <li>Presion Arterial:{info[0].signosVitales[0].presion_arterial}</li>
                <li>Reaccción de orina:{info[0].signosVitales[0].reaccion_orina}</li>
                <li>Saturación del oxígeno:{info[0].signosVitales[0].saturacion_oxigeno}</li>
                <li>Temperatura corporal:{info[0].signosVitales[0].temperatura}</li>
                
            </ul>
        </div>
        </div>
    </div>
}