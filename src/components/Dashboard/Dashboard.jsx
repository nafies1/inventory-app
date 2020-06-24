import React, { useState } from 'react';
import Copyright from '../Copyright'
import ListProduct from './CategoryProductSubpage/ListProduct'
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useStyles } from './styles';
import { Switch, Route } from 'react-router-dom';
import DashboardSubPage from './DashBoardSubpage/DashboardSubPage';
import ListDrawer from './DashBoardSubpage/ListDrawer';
import { Button, LinearProgress, Container, Paper, Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/actions';

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const isLoggingOut = useSelector(({ state }) => state.isLoggingOut)

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = (e) => {
    e.preventDefault()
    dispatch(logoutUser())
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <Typography color="inherit">
        <Button onClick={logout} color="inherit">{isLoggingOut ? 'Logging out' : 'Logout'}</Button>
          </Typography>
        </Toolbar>
        {isLoggingOut && <LinearProgress />}
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <ListDrawer />
        {/* <Divider />
        <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
            <Switch>
              <Route path='/dashboard/categories'>
                <ListProduct type="categories" />
              </Route>
              <Route path='/dashboard/products'>
                <Paper>
                  <ListProduct type="products"/> 
                </Paper>
              </Route>
              <Route path='/dashboard'>
                <DashboardSubPage />
              </Route>
            </Switch>
            <Box pt={4}>
              <Copyright />
            </Box>
        </Container>
      </main>
    </div>
  );
}
