
import { Modal, Box, Button, TextField } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';
import EditStatuModal from './EditStatuModal';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export interface Category {
  id: number,
  userId: number,
  title: string,
  updatedAt: Date,
  createdAt: Date
}

export default function AddCategoryModal({token, categoryList, setCategoryList,setStatuList,statuList, getTodoList} : any) {

  const [category, setCategory] = useState<any>({}) //title içerecek
  
  
  //apiler için config
  const config = {
    headers: {Authorization: `Bearer ${token}`}
  }

  useEffect(() => {
    //kategori listesi api'den alınacak
    axios.get(
      'http://localhost:80/category',
      config
    ).then(response =>{
      console.log("kategori listesi alındı")
      //burayı hocaya sorabiliriz **** prev state kullanacakmıyız
      setCategoryList(response.data)
     
    } ).catch(err => console.log(err.message)) 
  }, [])

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateCategory = () => {
    //@todo- error handling yap boş textboxlar için
    if(!category.title) {
      console.log("Kategori ismini giriniz")
      return false
    }
    axios.post(
      'http://localhost:80/category',
      category,
      config
    ).then(response =>{
      console.log("kategori ekleme başarılı")
      
      setCategoryList((prev:any) => [...prev, category]) //kategori Listemiz render edilsin diye state üzerinden ekleme yapıyoruz
      //burada neden setlemiyor? - ilk bug
    } ).catch(err => console.log(err.message)) 

  }

  const handleFieldChange = (event: any) => {
    //textfield alanından değeri aldık
    const name = event.currentTarget.name
    const value = event.currentTarget.value   
    setCategory((prev: any) => ({...prev,[name]: value}))
    
  }

  return (
    <div>
      <Button onClick={handleOpen}>Edit Categories</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <TextField onChange={handleFieldChange} id="standard-basic" name='title' label="Standard" variant="standard" />
          <Button onClick={handleCreateCategory} variant="contained">Add Categorie</Button>
          <p id="parent-modal-description">
            Burada var olan kategoriler listelenecek 
          </p>

          <ul>
            {/* Map ile birlikte categorilerimizi listeleyelim */}
            {categoryList.map((category:any) => (
              <li key={category.id}> 
                {category.title} 
                {/* hocaya sor */}
                <EditStatuModal token = {token} categoryId = {category.id} statuList= {statuList} setStatuList={setStatuList} getTodoList = {getTodoList}/> 
              </li>
            ))}
          </ul>
        </Box>
      </Modal>
    </div>
  )
}
