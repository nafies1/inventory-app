import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

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
        <Link color="primary" href="#" onClick={preventDefault}>
          Add Product
        </Link>
      </div>
    </React.Fragment>
  );
}
