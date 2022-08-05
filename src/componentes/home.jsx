import React from "react";
import {useState,useEffect} from "react"
import Cookies from 'universal-cookie';
import { useCookies } from 'react-cookie';
export default function Home(){
    
    const cookies=new Cookies()

    cookies.get("id")
    cookies.get("name")
    const [coolkies, setCookie] = useCookies(['name']);
    console.log(coolkies)
    return <div className="home">
            <p>Holli</p>
            <button onClick={()=>{cookies.remove("id",{path:"/"});cookies.remove("name",{path:"/"});window.location.href="/"}}>Salir</button>
            {coolkies.name}
    </div>
}