import React from "react";
import { Container, Grid, Paper, Box } from "@material-ui/core";
import Product from "./Product";
import Copyright from "../../components/Copyright";
import clsx from 'clsx';
import { useStyles } from "./styles";
import Category from "./Category";

export default function DashboardSubPage() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth='lg' className={classes.container}>
      <Grid container spacing={3}>
        {/* Product */}
        <Grid item xs={12} md={6} lg={8}>
          <Paper className={fixedHeightPaper}>
            <Product />
          </Paper>
        </Grid>
        {/* Category */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper className={fixedHeightPaper}>
            <Category />
          </Paper>
        </Grid>
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </Container>
  );
}
