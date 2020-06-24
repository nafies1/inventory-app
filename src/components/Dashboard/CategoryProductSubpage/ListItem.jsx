import React, { Fragment, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, TextField, LinearProgress } from "@material-ui/core";
import DeleteDialog, { getCategory } from "./DeleteDialog";
import { useSelector, useDispatch } from "react-redux";
import { inventoryDb, firebases } from "../../../config/firebase";
import { setLoading, fetchInventories } from "../../../store/actions";

export default function ListItems({ type, products, categories }) {
  const dispatch = useDispatch()
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [item, setItem] = useState("");
  const [newItem, setNewItem] = useState("");
  const [indexInput, setIndexInput] = useState(null);
  const inventory = useSelector(({ state }) => state.inventory);
  const loading = useSelector(({ state }) => state.loading);

  const updateProduct = (product) => {
    const category = getCategory(product, inventory);
    dispatch(setLoading(true))
    if (category) {
      inventoryDb
        .update({
          [category]: firebases.firestore.FieldValue.arrayRemove(product)
        })
      inventoryDb
        .update({
          [category]: firebases.firestore.FieldValue.arrayUnion(newItem)
        })
        .then(_ => {
          dispatch(fetchInventories())
        })
        .catch(err => {
          console.log(err);
        })
        .finally(_ => {
          setIndexInput(null)
          dispatch(setLoading(false))
        })
    } else {
      console.log('Item not found');
      dispatch(setLoading(false))
    }
  };

  const deleteProduct = (product) => {
    setItem(product);
    setDeleteDialog(true);
  };

  const updateCategory = (category) => {
    console.log();
    
    dispatch(setLoading(true))
    inventoryDb
      .update({
        [newItem]: inventory[category]
      })
    inventoryDb
      .update({
        [category]: firebases.firestore.FieldValue.delete()
      })
      .then(_ => {
        dispatch(fetchInventories())
      })
      .catch(err => {
        console.log(err);
      })
      .finally(_ => {
        setIndexInput(null)
        dispatch(setLoading(false))
      })
  };

  const deleteCategory = (category) => {
    setItem(category);
    setDeleteDialog(true);
  };

  return (
    <>
      <DeleteDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        type={type}
        item={item}
      />
      {loading && <LinearProgress />}
      {type === "products"
        ? products.map((product, i) => (
            <Fragment key={i}>
              <ListItem>
                {i === indexInput ? (
                  <>
                    <TextField onChange={(e) => setNewItem(e.target.value)} />
                    <IconButton aria-label='delete'>
                      <ClearIcon onClick={() => setIndexInput(null)} />
                    </IconButton>
                    <IconButton aria-label='edit'>
                      <CheckIcon onClick={() => updateProduct(product)} />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ListItemText primary={product} />
                    <IconButton aria-label='delete'>
                      <DeleteIcon onClick={() => deleteProduct(product)} />
                    </IconButton>
                    <IconButton aria-label='edit'>
                      <EditIcon onClick={() => setIndexInput(i)} />
                    </IconButton>
                  </>
                )}
              </ListItem>
              <Divider />
            </Fragment>
          ))
        : categories.map((category, i) => (
            <Fragment key={i}>
              <ListItem>
              {i === indexInput ? (
                  <>
                    <TextField onChange={(e) => setNewItem(e.target.value)} />
                    <IconButton aria-label='delete'>
                      <ClearIcon onClick={() => setIndexInput(null)} />
                    </IconButton>
                    <IconButton aria-label='edit'>
                      <CheckIcon onClick={() => updateCategory(category)} />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <ListItemText primary={category} />
                    <IconButton aria-label='delete'>
                      <DeleteIcon onClick={() => deleteCategory(category)} />
                    </IconButton>
                    <IconButton aria-label='edit'>
                      <EditIcon onClick={() => setIndexInput(i)} />
                    </IconButton>
                  </>
                )}
              </ListItem>
              <Divider />
            </Fragment>
          ))}
    </>
  );
}
