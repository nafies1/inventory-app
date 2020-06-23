import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "@material-ui/core";
import { db } from "../../config/firebase";

export default function AddForm() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCategory = () => {
    db.collection("inventory").doc(category).set({[category]: []})
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  return (
    <div>
      <Link color='primary' href='#' onClick={handleClickOpen}>
        Add Category
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add Category</DialogTitle>
        <DialogContent>
          {/* <DialogTitle id='form-dialog-title'>Please input new category here:</DialogTitle> */}
          <DialogContentText>
            Please input new category here. Example : 'drink'.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Category Name'
            type='text'
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={addCategory} color='primary'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
