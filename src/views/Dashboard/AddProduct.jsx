import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link, LinearProgress } from "@material-ui/core";
import { inventoryDb, firebases } from "../../config/firebase";

export default function AddProduct() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addProduct = () => {
    setLoading(true);
    inventoryDb
      .update({
        [category]: firebases.firestore.FieldValue.arrayUnion(product)
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  return (
    <div>
      <Link color='primary' href='#' onClick={handleClickOpen}>
        Add Product
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        {loading && <LinearProgress />}
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
          <TextField
            margin='dense'
            id='category'
            label='Category'
            type='text'
            onChange={(e) => setCategory(e.target.value)}
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
