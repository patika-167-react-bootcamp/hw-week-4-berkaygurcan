import Header from "./HeaderComponent";
import MainComponent from "./MainComponent"
import {useEffect, useState} from "react";
import { StringifyOptions } from "querystring";


function getCookie(name:string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts?.pop()?.split(';')?.shift();
}
export default function App() {
 
  const [token, setToken] = useState<any>();
  useEffect(() => {
    
    const cookie = getCookie('token')
    setToken(cookie)
    
  }, [])
  if(!token) { //eğer token yoksa giriş yapma sayfası render edilir
    return <Header setToken = {setToken}/>
  }
  return (
    <div>
        <MainComponent token = {token}/>
        
    </div>
  )
}
