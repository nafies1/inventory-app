import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from './ListItem'
import AddIcon from '@material-ui/icons/Add';
import { useSelector } from "react-redux";
import { Box, Typography, Fab } from "@material-ui/core";
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

export default function ListProduct({ type }) {
  const classes = useStyles();
  const products = useSelector(({ state }) => state.products);
  const categories = useSelector(({ state }) => state.categories);
  const [dialog, setDialog] = useState(false);

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
        {/* {listData} */}
        <ListItem type={type} products={products} categories={categories} />
      </List>
      <Fab aria-label="Add" onClick={() => setDialog(true)} className={classes.fab} color="primary">
        <AddIcon />
      </Fab>
      <AddProduct fab opener={{dialog, setDialog}} />
    </Box>
  );
}
