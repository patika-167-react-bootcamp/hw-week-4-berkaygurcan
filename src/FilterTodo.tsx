import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function FilterTodo({
  token,
  setTodoList,
  categoryList,
  statuList,
  setStatuList,
}: any) {
  const initialFilterState = {
   
    categoryId: null,
    statusId: null,
  };

  const [filter, setFilter] = useState(initialFilterState); //interface yazılabilir
  const handleChange = (event: any) => {
    //textfield alanından değeri aldık

    const name = event.target.name;
    const value = event.target.value;

    //filterimizi setleriz her değişiklikte
    setFilter((prev: any) => ({ ...prev, [name]: value }));

    if (name === "categoryId") {
      // eğer event category kısmından geliyorsa statü selectleri güncellememiz gerekir
      getStatus(value);
    }
  };

  //apiler için config
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const getStatus = async (categoryId: any) => {
    const res = await axios.get(
      `http://localhost:80/status?categoryId=${categoryId}`,
      config
    );
    
    setStatuList(res.data);
  };

  const handleFilter = () => {

    if(!filter.categoryId && !filter.statusId ) {
      console.log("lütfen filtreleme seçeneklerinden en az birini seçiniz")
      return false
    }
    
    const res = axios
      .get("http://localhost:80/todo", {
        params: { ...filter },
        headers: config.headers,
      })
      .then(response => {
        setTodoList(response.data)
      });
  
  };

  const handleResetFilter = () => {
    //filter ve filteredTodoList kısmını clear etmemiz lazım
    setFilter(initialFilterState);
    axios.get("http://localhost:80/todo", config).then(res => setTodoList(res.data))
  };


  return (
    <div>
      <h3>Filter Todo Section</h3>
      <Box sx={{ minWidth: 120, display: "flex" }}>
       
        <FormControl>
          <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
          {/* Category Select */}
          <Select
            defaultValue=""
            sx={{ width: 100 }}
            labelId="demo-simple-select-label"
            onChange={handleChange}
            id="filter-category-select"
            value={filter.categoryId}
            name="categoryId"
            label="Age"
          >
            {categoryList.map((category: any) => (
              <MenuItem value={category.id}>{category.title}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          {/* Category Select */}
          <Select
            defaultValue=""
            sx={{ width: 100 }}
            labelId="demo-simple-select-label"
            onChange={handleChange}
            value={filter.statusId}
            name="statusId"
            id="filter-status-select"
            label="Age"
          >
            {filter.categoryId &&
              statuList.map((statu: any) => (
                <MenuItem value={statu.id}>{statu.title}</MenuItem>
              ))}
          </Select>
        </FormControl>

        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>

        <Button variant="contained" onClick={handleResetFilter}>
          Clear Filter
        </Button>
      </Box>
    </div>
  );
}
