import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import { Button, FormHelperText, Input, InputLabel } from '@mui/material';
import axios from 'axios';

export default function Register(props: any) {
  // register posts.
  const [formData, setFormData] = useState<any>({}) 

  const handleFieldChange = (event: any) => {
    
    const name = event.currentTarget.name
    const value = event.currentTarget.value
    setFormData((prev: any) => ({...prev,[name]: value}))
    
  }
  
  const handleRegister = () => {


   if(!formData.username || !formData.password || !formData.passwordConfirm) {
    console.log("lütfen alanları giriniz")
    return false
  }
    axios.post(
      'http://localhost:80/auth/register',
      formData,
    ).then(response =>{
      console.log(response.data)
      document.cookie = `token= ${response.data.token}`;
      console.log("giriş başarılı")
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

      <Input id="password-confirm" name='passwordConfirm' onChange={handleFieldChange} aria-describedby="my-helper-text2" />
      <FormHelperText id="my-helper-text2">Password Confirm</FormHelperText>

      <Button variant="contained" onClick={handleRegister}>Register</Button>

    </div>
  )
}
