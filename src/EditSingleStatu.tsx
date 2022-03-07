import React, { useState } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { Statu } from "./EditStatuModal";
const style = {
  position: "absolute",
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

const EditSingleStatu = ({ statuId, setStatuList, statusList, token, getTodoList }: any) => {
  const [textViewValue, setTextViewValue] = useState<any>();
  let updatedStatu: Statu;

  //apiler için config
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    getTodoList() 
    setOpen(false);
   
  };

  const handleFieldChange = (event: any) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    setTextViewValue(value);
  };

  const handleClick = async () => {
    //id değeri ile birlikte ilk önce statumuzu bulalım sonra güncelleyelim

    if(!textViewValue) { //error handling
      console.log("lütfen güncellemek istediğiniz statü ismini giriniz")
      return false
    } 

    const res = await axios.get(
      `http://localhost:80/status/${statuId}`, //props ile geçtiğimiz id sayesinde statuyu alabileceğiz.
      config
    );
    updatedStatu = res.data; //değişiklik yapmak istediğimiz kayıtı state olarak set ettik.
    
    updatedStatu.title = textViewValue;
    
    await axios.put(
      //güncelleme
      `http://localhost:80/status/${statuId}`,
      {
        title: updatedStatu.title,
        categoryId: updatedStatu.categoryId,
      },
      config
    );
    
    const finalResult = await axios.get(
      //listeyi tekrar çek
      `http://localhost:80/status?categoryId=${updatedStatu.categoryId}`,
      config
    );
    console.log("statu listesi alındı");
    setStatuList(finalResult.data);

    
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Düzenle Modal</Button>
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
            id="textfield-updateStatu"
            name="title"
            onChange={handleFieldChange}
            label="Status"
            variant="standard"
          />

          <Button variant="contained" onClick={handleClick}>
            Edit
          </Button>

          <p id="child-modal-description">Burada bir tek statü editlenecek</p>

          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default EditSingleStatu;
