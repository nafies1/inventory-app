import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import AddProduct from './AddProduct';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Product() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Product</Title>
      <Typography component="p" variant="h4">
        20 product
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        last updated on 15 March, 2020
      </Typography>
      <div>
        <AddProduct />
      </div>
    </React.Fragment>
  );
}
