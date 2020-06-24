import React, { Fragment, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from "@material-ui/core";
import DeleteDialog from "./DeleteDialog";

export default function ListItems({ type, products, categories }) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [item, setItem] = useState('');

  const updateProduct = (product) => {

  }
  const deleteProduct = (product) => {
    setItem(product)
    setDeleteDialog(true)
  }

  const updateCategory = (category) => {

  }
  const deleteCategory = (category) => {
    setItem(category)
    setDeleteDialog(true)
  }

  return (
    <>
      <DeleteDialog open={deleteDialog} setOpen={setDeleteDialog} type={type} item={item}/>
      {type === "products"
        ? products.map((product, i) => (
            <Fragment key={i}>
              <ListItem >
                <ListItemText primary={product} />
                <IconButton aria-label="delete" onClick={() => deleteProduct(product)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => console.log('edit',product)}>
                  <EditIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </Fragment>
          ))
        : categories.map((category, i) => (
            <Fragment key={i}>
              <ListItem key={i}>
                <ListItemText primary={category} />
                <IconButton aria-label="delete" onClick={() => deleteCategory(category)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => console.log('edit',category)}>
                  <EditIcon />
                </IconButton>
              </ListItem>
              <Divider />
            </Fragment>
          ))}
    </>
    
  );
}
