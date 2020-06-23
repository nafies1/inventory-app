import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector } from "react-redux";
import { Box, Typography, Fab, IconButton } from "@material-ui/core";
import AddProduct from "./AddProduct";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  topCorner: {
    marginTop: 5,
    marginLeft: 5,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  }
}));

export default function ListDividers({ type }) {
  const classes = useStyles();
  const products = useSelector(({ auth }) => auth.products);
  const categories = useSelector(({ auth }) => auth.categories);
  const [dialog, setDialog] = useState(false);

  const listData =
    type === "products"
      ? products.map((product) => (
          <>
            <ListItem>
              <ListItemText primary={product} />
              <EditIcon />
            </ListItem>
            <Divider />
          </>
        ))
      : categories.map((category) => (
          <>
            <ListItem>
              <ListItemText primary={category} />
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </ListItem>
            <Divider />
          </>
        ));

  const getType = () => {
    return type[0].toUpperCase() + type.slice(1);
  };

  return (
    <Box>
      <div className={classes.topCorner}>
        <Typography className={classes.topCorner} component='h2' variant='h6' color='primary' gutterBottom>
          {getType()}
        </Typography>
      </div>
      
      <List
        component='nav'
        className={classes.root}
        aria-label='mailbox folders'>
        {listData}
      </List>
      <Fab aria-label="Add" onClick={() => setDialog(true)} className={classes.fab} color="primary">
        <AddIcon />
      </Fab>
      <AddProduct fab opener={{dialog, setDialog}} />
    </Box>
  );
}
