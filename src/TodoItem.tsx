import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const TodoItem = ({todo, token, categoryList, getTodoList}: any) => {

    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [statuList,setStatuList] = useState([]);
    
    useEffect(() => {
        getTodoInfo();
        getStatus(todo.categoryId)
        
    }, [])



    //apiler için config
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getStatus = async (categoryId: any) => {
    const res = await axios.get(
      `http://localhost:80/status?categoryId=${categoryId}`,
      config
    );
    console.log("response data ", res.data);
    setStatuList(res.data);
  };

  const handleChange =  (event: any) => {
    //generic func
    const name = event.target.name;
    const value = event.target.value;

    if (name === "categoryId") {
      // eğer event category kısmından geliyorsa statü selectleri güncellememiz gerekir
      getStatus(value);
      updateChangeTodo(value)// value = categoryId
    }

    if (name === "statusId") {
        // eğer event status kısmından geliyorsa statü selectleri güncellememiz gerekir
        updateStatusTodo(value)// value = statusId
      }
      
      

  };

  const updateChangeTodo = async(newCategoryId:any) => {
    const data = {
        title: todo.title,
        categoryId: newCategoryId,
        statusId: todo.statusId
    }
    await axios.put(`http://localhost:80/todo/${todo.id}`,data,config).then(() => getTodoList())
    
    console.log("kategori güncelleme tamamlandı")
    
  }

  const updateStatusTodo = async(newStatusId:any) => {
    const data = {
        title: todo.title,
        categoryId: todo.categoryId,
        statusId: newStatusId
    }
    await axios.put(`http://localhost:80/todo/${todo.id}`,data,config).then(() => getTodoList())
    console.log("statu güncelleme tamamlandı")
  }

    function getTodoInfo() {
        axios.get(`http://localhost:80/category/${todo.categoryId}`, config).then((response:any) => { setCategory(response.data.title) })
        axios.get(`http://localhost:80/status/${todo.statusId}`, config).then((response:any) => { setStatus(response.data.title)})
    }

  return (

    <div>
      <li key={todo.id} style={{ marginBottom: 5 }}>
              {todo.title}
              <FormControl sx={{ marginLeft: 3 }}>
                <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
                {/* Category Select */}
                <Select
                  value={todo.categoryId}
                  onChange={handleChange}
                  name="categoryId"
                  sx={{ width: 200 }}
                  labelId="demo-simple-select-label"
                  label="Age"
                >
                  {categoryList.map((category: any) => (
                    <MenuItem value={category.id}>{category.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ marginLeft: 3 }}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                {/* Status Select */}
                <Select
                  value={todo.statusId}
                  onChange={handleChange}
                  name="statusId"
                  sx={{ width: 200 }}
                  labelId="demo-simple-select-label"
                  label="Age"
                >
                  {statuList && statuList.map((statu: any) => {
                          
                          return (
                              <MenuItem value={statu.id}>{statu.title}</MenuItem>
                          );
                      })}
                </Select>
              </FormControl>
            </li>
    </div>
  )
}

export default TodoItem


