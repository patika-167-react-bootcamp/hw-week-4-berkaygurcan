
import { Button, FormHelperText, Input, InputLabel } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'


export default function LoginForm(props:any) {
    // http://localhost:80/auth/login , login postu yapacak.

    const [formData, setFormData] = useState<any>({}) 

    const handleFieldChange = (event: any) => {
    
      const name = event.currentTarget.name
      const value = event.currentTarget.value
      setFormData((prev: any) => ({...prev,[name]: value}))
      
    }

    const handleLogin = () => {      
      
      if(!formData.username || !formData.password) {
        console.log("lütfen alanları giriniz")
        return false
      }
      axios.post(
        'http://localhost:80/auth/login',
        formData,
      ).then(response =>{
        document.cookie = `token= ${response.data.token}`;
        console.log("giriş başarılı")
        //burada component return yapsak olur mu ?
        props.setToken(response.data.token)
        
      } ).catch(err => console.log(err.message)) 
     }
  return (
    <div>
      <InputLabel htmlFor="email-input" >Email address</InputLabel>
      <Input id="email-input" name='username' onChange={handleFieldChange} aria-describedby="my-helper-text" />
      <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>

      <Input id="password-input" name='password' onChange={handleFieldChange} aria-describedby="my-helper-text2" />
      <FormHelperText id="my-helper-text2">Password</FormHelperText>

      <Button variant="contained" onClick={handleLogin}>Login</Button>

    </div>
  )
}
