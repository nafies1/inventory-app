import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Product from "./MainCard";
import clsx from 'clsx';
import { useStyles } from "../styles";

export default function DashboardSubPage() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    // <Container maxWidth='lg' className={classes.container}>
    <>
      <Grid container spacing={3}>
        {/* Product */}
        <Grid item xs={12} md={6} lg={8}>
          <Paper className={fixedHeightPaper}>
            <Product type="Product" />
          </Paper>
        </Grid>
        {/* Category */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={fixedHeightPaper}>
            {/* <Category /> */}
            <Product type="Category" />
          </Paper>
        </Grid>
      </Grid>
  </>
  );
}
