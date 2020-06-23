/** @format */

import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListDividers({ type }) {
  const classes = useStyles();
  const inventory = useSelector(({ auth }) => auth.inventory);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let items = [];
    let categors = []
    for (const key in inventory) {
      items.push(...inventory[key]);
      categors.push(key)
    }
    setProducts(items);
    setCategories(categors);
  }, [inventory]);

  const listData = type === 'products' ? products.map((product) => (
    <>
      <ListItem button>
        <ListItemText primary={product} />
      </ListItem>
      <Divider />
    </>
  )) : categories.map((category) => (
    <>
      <ListItem button>
        <ListItemText primary={category} />
      </ListItem>
      <Divider />
    </>
  )) 

  return (
    <List component='nav' className={classes.root} aria-label='mailbox folders'>
      {listData}
    </List>
  );
}
