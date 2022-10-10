import react from "react";
import axios from "axios"
import * as XLSX from "xlsx";
export default function AddClient(){
    const readExcel=(file)=>{
        const promise=new Promise((resolve, reject)=>{
            const fileReader=new FileReader(file)
            fileReader.readAsArrayBuffer(file)
            fileReader.onload=(e)=>{
                const bufferArray=e.target.result
                const workBook = XLSX.read(bufferArray, { type: 'buffer' });
                const wsname = workBook.SheetNames[0];
                const ws = workBook.Sheets[wsname]
                const workBookToJSON = XLSX.utils.sheet_to_json(ws);
                resolve(workBookToJSON)
            }
            fileReader.onerror=(e)=>{
                reject(e)
            }  
        })
        promise.then((d)=>{
            console.log(d)
            axios.post(`${process.env.REACT_APP_URL_BACK}/add-indicadors`,d)
        })
    }
    const carga=(e)=>{
        const file = e.target.files[0]
        readExcel(file)
    }
    return <div>
        <input type="file" onChange={carga}></input>
    </div>
}