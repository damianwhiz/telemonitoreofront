import React from "react";
import {Line} from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";
import axios from "axios"
import {useState,useEffect} from "react"
import styles from "./CardInfoUser.module.css"
export default function CardInfoUser({info}){
    const [grafico,setGrafico] =useState(false)
    const [show,setShow] =useState("perfil-paciente")
console.log(info)
    //Graficas
const [graficoFrecuenciaCardiaca,setGraficoFrecuenciaCardiaca] = useState(false);
const [graficoFrecuenciaRespiratoria,setGraficoFrecuenciaRespiratoria] = useState(false);
const [graficoReaccionOrina,setGraficoReaccionOrina] = useState(false);
const [graficoTemperatura,setGraficoTemperatura] =useState(false);
useEffect(()=>{
    async function fetchData() {
    let fechas=info[0].signosVitales.map(e=>{return e.date})
            let estados=info[0].signosVitales.map(e=>{return e.estado_general})
            let frecuenciaCardiaca=info[0].signosVitales.map(e=>{return e.frecuencia_cardiaca})
            let frecuenciaRespiratoria=info[0].signosVitales.map(e=>{return e.frecuencia_respiratoria})
            let reaccionOrina=info[0].signosVitales.map(e=>{return e.reaccion_orina})
            let temperatura=info[0].signosVitales.map(e=>{return e.temperatura})
            setGrafico({
            labels:fechas,
            datasets:[{
           label:"Estado general del paciente",
           data:estados,
           backgroundColor:["pink","blue","green","yellow"],
           borderColor:["#c7204f"]
       }]
        })

        setGraficoFrecuenciaCardiaca({
            labels:fechas,
            datasets:[{
            label:"Frecuencia cardíaca del paciente",
            data:frecuenciaCardiaca,
            backgroundColor:["pink","blue","green","yellow"],
            borderColor:["#c7204f"]
            }]})

            setGraficoFrecuenciaRespiratoria({
              labels:fechas,
              datasets:[{
              label:"Frecuencia respiratoria del paciente",
              data:frecuenciaRespiratoria,
              backgroundColor:["pink","blue","green","yellow"],
              borderColor:["#c7204f"]
              }]})

              setGraficoReaccionOrina({
                labels:fechas,
                datasets:[{
                label:"Reaccion de la orina del paciente",
                data:reaccionOrina,
                backgroundColor:["pink","blue","green","yellow"],
                borderColor:["#c7204f"]
                }]})
                
                setGraficoTemperatura({
                  labels:fechas,
                  datasets:[{
                  label:"Temperatura del paciente",
                  data:temperatura,
                  backgroundColor:["pink","blue","green","yellow"],
                  borderColor:["#c7204f"]
                  }]})
    }
    fetchData()
},[])
    

    return <div>
        Nombre: {info[0].infoUser.name}
        Apellido: {info[0].infoUser.lastname}
        DNI: {info[0].infoUser.dni}
        <div className={styles.panelinfoclient}>
        {show=="perfil-paciente" && <>
        <div className={styles.CardInfoUser}>
            <div>
            <h4>Estado general del paciente</h4>
            {grafico!==false?<Line data={grafico}></Line>:<p>Parece que aun no tienes registros</p>}
            <button className={styles.verregistros} onClick={()=>{setShow("graficos-indicadores")}}>Ver todos los indicadores</button>
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
        </>
        }
        
        {show=="graficos-indicadores" && <div className={styles.graficosIndicadores}>
        <button className={styles.verregistros} onClick={()=>{setShow("perfil-paciente")}}>Volver a usuario</button>
        <div className={styles.contenedorGrafica}>
        <div className={styles.grafica}>{graficoFrecuenciaCardiaca!==false?<Line data={graficoFrecuenciaCardiaca}></Line>:<p>Parece que aun no tienes registros</p>}</div>
        <div className={styles.grafica}>{graficoFrecuenciaCardiaca!==false?<Line data={graficoFrecuenciaRespiratoria}></Line>:<p>Parece que aun no tienes registros</p>}</div>
        <div className={styles.grafica}>{graficoFrecuenciaCardiaca!==false?<Line data={graficoReaccionOrina}></Line>:<p>Parece que aun no tienes registros</p>}</div>
        <div className={styles.grafica}>{graficoFrecuenciaCardiaca!==false?<Line data={graficoTemperatura}></Line>:<p>Parece que aun no tienes registros</p>}</div>
        </div>
        </div>}
        </div>
    </div>
}