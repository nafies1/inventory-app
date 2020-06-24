import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import AddProduct from './AddProduct';
import AddCategory from './AddCategory'
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Product({ type }) {
  const classes = useStyles();
  const products = useSelector(({ auth }) => auth.products);
  const categories = useSelector(({ auth }) => auth.categories);

  const getLowerCase = () => {
    const word = type.toLowerCase()
    if (type === 'Product') {
      return products.length > 1 ? word + 's' : word;
    } else {
      return categories.length > 1 ? word + 's' : word;
    }
  }

  const getDataShown = () => {
    if (type === "Product") {
       return (`${products.length} ${getLowerCase()}`)
    } else {
      return (`${categories.length} ${getLowerCase()}` )
    }
  }

  return (
    <React.Fragment>
      <Title>{type}</Title>
      <Typography component="p" variant="h4">
        {getDataShown()}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        last updated on 15 March, 2020
      </Typography>
      <div>
       {type === 'Product' ?  <AddProduct /> : <AddCategory />}
      </div>
    </React.Fragment>
  );
}
