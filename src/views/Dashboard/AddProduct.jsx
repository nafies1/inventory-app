import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "@material-ui/core";
import { db } from "../../config/firebase";

export default function AddProduct() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');

  useEffect(() => {
    
    db.collection("inventory")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addProduct = () => {
    // db.collection("inventory").doc(category).set({[category]: []})
    // .then(function() {
    //     console.log("Document successfully written!");
    // })
    // .catch(function(error) {
    //     console.error("Error writing document: ", error);
    // });
  }

  return (
    <div>
      <Link color='primary' href='#' onClick={handleClickOpen}>
        Add Product
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add Product</DialogTitle>
        <DialogContent>
          {/* <DialogTitle id='form-dialog-title'>Please input new Product here:</DialogTitle> */}
          <DialogContentText>
            Please input new Product here. Example : 'Lemon Tea'.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Product Name'
            type='text'
            onChange={(e) => setProduct(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={addProduct} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
