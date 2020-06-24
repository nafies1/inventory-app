import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, fetchInventories } from '../../../store/actions';
import { inventoryDb, firebases } from '../../../config/firebase';
import { LinearProgress } from '@material-ui/core';

export const getCategory = (item, inventory) => {
  for (const key in inventory) {
    const itemFound = inventory[key].find(val => val === item);
    if (itemFound) return key
  }
}

export default function DeleteDialog({ type, open, setOpen, item }) {
  const dispatch = useDispatch()
  const loading = useSelector(({ state }) => state.loading);
  const inventory = useSelector(({ state }) => state.inventory);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteProduct = () => {
    const category = getCategory(item, inventory)
    dispatch(setLoading(true))
    if (category) {
      inventoryDb
        .update({
          [category]: firebases.firestore.FieldValue.arrayRemove(item)
        })
        .then(_ => {
          dispatch(fetchInventories())
        })
        .catch(err => {
          console.log(err);
        })
        .finally(_ => {
          handleClose()
          dispatch(setLoading(false))
        })
    } else {
      console.log('Item not found');
      dispatch(setLoading(false))
    }
  }

  const deleteCategory = () => {
    dispatch(setLoading(true))
    inventoryDb
      .update({
        [item]: firebases.firestore.FieldValue.delete()
      })
      .then(_ => {
        dispatch(fetchInventories())
      })
      .catch(err => {
        console.log(err);
      })
      .finally(_ => {
        handleClose()
        dispatch(setLoading(false))
      })
  }

  const singularType = () => {
    if (type.slice(type.length-3) === 'ies') {
      return type.slice(0, type.length-3) + 'y'
    }
    return type.slice(0, type.length-1)
  }

  const deleteItem = () => {
    if (type === 'products') deleteProduct()
    else deleteCategory()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-prompt"
        aria-describedby="delete-prompt-description"
      >
        {loading && <LinearProgress />}
        <DialogTitle id="delete-prompt-title">{`Delete ${singularType()} ?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want delete ${singularType()} ?`}
            {singularType() === 'category' && " Delete category will delete all products inside."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={deleteItem} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
