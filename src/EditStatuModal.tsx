import React, { useEffect, useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import EditSingleStatu from "./EditSingleStatu";
import { LargeNumberLike } from "crypto";
import axios from "axios";
import { createNoSubstitutionTemplateLiteral } from "typescript";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export interface Statu {
  id: number;
  title: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
}

const EditStatuModal = ({ token, categoryId,statuList,setStatuList, getTodoList}: any) => {
  const [statu, setStatu] = useState<any>({
    categoryId, //prop olarak aldığımız kategoriyi ekledik.İstek atarken lazım olacak
  });
 
  //apiler için config
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = async() => {
    await getStatus(categoryId)
    setOpen(true);
  };
  const handleClose = () => {
    setStatuList([])
    getTodoList()
    setOpen(false);
  };

  // useEffect(() => {
  //   //statu listesi api'den alınacak
  //   axios
  //     .get(`http://localhost:80/status?categoryId=${categoryId}`, config)
  //     .then((response) => {
  //       console.log("statu listesi alındı");
  //       setStatuList(response.data);
  //     })
  //     .catch((err) => console.log(err.message));
  // }, []); //statu listimiz değiştikçe çalışsın

  const handleAddStatu = async() => {
  

    if(!statu.title || !statu.color) {
      console.log("değerlerin hepsini girmeniz gerekli")
      return false
    }

    await axios.post("http://localhost:80/status", statu, config)
    const res =  await axios.get(`http://localhost:80/status?categoryId=${categoryId}`, config)
    setStatuList(res.data);
  
};
  const handleDeleteStatu = async(statuId: any) => {
    //deletion request

    await axios.delete(`http://localhost:80/status/${statuId}`, config)
    console.log("silme işlemi başarılı");
    const res =  await  axios.get(`http://localhost:80/status?categoryId=${categoryId}`, config)
    setStatuList(res.data);
  }


  const handleFieldChange = (event: any) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setStatu((prev: any) => ({ ...prev, [name]: value }));
  };

  const getStatus = async(categoryId:number) => {
    const res = await axios.get(`http://localhost:80/status?categoryId=${categoryId}`,config)
    setStatuList(res.data)
  }

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Statu Duzenle Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <TextField
            id="textfield-title"
            onChange={handleFieldChange}
            name="title"
            label="Status"
            variant="standard"
          />
          <TextField
            id="textfield-color"
            onChange={handleFieldChange}
            name="color"
            label="Color"
            variant="standard"
          />
          <Button onClick={handleAddStatu} variant="contained">
            Add Statu
          </Button>

          <p id="child-modal-description">
            Burada ilgili kategoriye ait statüler listelenecek
          </p>

          <ul>
            {/* Map ile birlikte statüleri listeleyelim */}
            {statuList.map((statu:any) => (
              <li key={statu.id}>
                {statu.title}
                <Button onClick={() => handleDeleteStatu(statu.id)}>
                  Delete
                </Button>
                <EditSingleStatu //Düzenle
                  token={token}
                  setStatuList={setStatuList}
                  statusList={setStatuList}
                  statuId={statu.id}
                  getTodoList = {getTodoList}
                />
              </li>
            ))}
          </ul>

          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default EditStatuModal;
