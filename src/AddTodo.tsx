import { TextField,InputLabel, Select, MenuItem, Box, Button } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import React, { useState } from 'react'


export default function AddTodo({ token, categoryList ,statuList ,setStatuList, setTodoList }: any) {

  const [addTodo, setAddTodo] = useState<any>({})
  
  // const [selectedCategoryId, setSelectedCategoryId] = useState<number>() //category id (state tutma mantıgımız ne buradaki)
  // const [selectedStatuId, setSelectedStatuId] = useState<number>() 

    //apiler için config
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

  const handleFieldChange = async(event: any) => {
    //generic func
    const name = event.target.name
    const value = event.target.value   
    
    setAddTodo((prev: any) => ({...prev,[name]: value}))
    console.log(value)
    if(name === "categoryId") {// eğer event category kısmından geliyorsa statü selectleri güncellememiz gerekir
      getStatus(value)
    }
  
  }

  const getStatus = async(categoryId:any) => {
    const res = await axios.get(`http://localhost:80/status?categoryId=${categoryId}`,config)
    console.log("response data ",res.data)
    setStatuList(res.data)
  }
  
  const handleAddTodo = async() => {

    if(!addTodo.title || !addTodo.categoryId || !addTodo.statusId) {
      console.log("alanların hepsini giriniz")
      return false
    }

    const resAddedTodo = await axios.post(`http://localhost:80/todo`,addTodo,config)
    const res =  await axios.get("http://localhost:80/todo",config) //güncellenen todo listelerini tekrar çekiyoruz
    setTodoList(res.data)
    //@todo - ekleme işleminden sonra state içini boşaltalım
    
  }

  return (
    <div>
      <h3>Add Todo Section</h3>
      
      <Box sx={{ minWidth: 120 , display: 'flex'  }}>
      <TextField id="textfield-add-todo" name='title' onChange={handleFieldChange} label="Outlined" variant="outlined" /> 
      <FormControl >
        <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
        {/* Category Select */}
        <Select defaultValue=""  name='categoryId' onChange={handleFieldChange} sx={{width: 100}}
          labelId="demo-simple-select-label"
          id="category-select"
          label="Age"
        >
          {categoryList.map((category: any)=> (
            <MenuItem value={category.id}>{category.title}</MenuItem>
          ))}
          
        </Select>
      </FormControl>

      <FormControl >
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select defaultValue="" name='statusId' onChange= {handleFieldChange} sx={{width: 100}}
          labelId="demo-simple-select-label"
          id="status-select"
          label="Age"
        >
          {addTodo.categoryId && statuList.map((statu: any)=> (
            <MenuItem value={statu.id}>{statu.title}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleAddTodo}>Add Todo</Button>

    </Box>
  
    </div>
  )
}
