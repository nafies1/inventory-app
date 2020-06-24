import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link, LinearProgress, MenuItem } from "@material-ui/core";
import { inventoryDb, firebases } from "../../../config/firebase";
import { useSelector, useDispatch } from "react-redux";
import { fetchInventories } from "../../../store/actions";

export default function AddProduct({ fab, opener }) {
  const dispatch = useDispatch()
  const categories = useSelector(({ state }) => state.categories)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState('drink');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    opener && opener.setDialog(false)
  };

  const addProduct = () => {
    setLoading(true);
    inventoryDb
      .update({
        [category]: firebases.firestore.FieldValue.arrayUnion(product)
      })
      .then(function () {
        console.log("Document successfully written!");
        dispatch(fetchInventories())
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
        opener && opener.setDialog(false)
      });
  };

  return (
    <div>
      {!fab && <Link color='primary' href='#' onClick={handleClickOpen}>
        Add Product
      </Link>}
      <Dialog
        open={opener ? opener.dialog : open}
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
          id="category"
          select
          label="Category"
          value={"drink"}
          onChange={e => setCategory(e.target.value)}
          helperText="Please select category"
          fullWidth
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
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
