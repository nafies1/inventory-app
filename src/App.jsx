import React, { useEffect } from "react";
import Login from "./views/Login/Login";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard.jsx";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import { fetchInventories } from "./store/actions";
import { LinearProgress } from "@material-ui/core";
// import './App.css';

function App() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isVerifying = useSelector((state) => state.auth.isVerifying);
  const loading = useSelector(({ auth }) => auth.loading);

  useEffect(() => {
    if (location.pathname === '/') {
      history.push("/dashboard");
    }
    isAuthenticated && dispatch(fetchInventories())
  }, [history, location, dispatch, isAuthenticated]);

  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
           renders the first one that matches the current URL. */}
      {loading && <LinearProgress />}
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <ProtectedRoute
          path='/dashboard'
          component={Dashboard}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        <Route path='/'>ini home</Route>
      </Switch>
    </div>
  );
}

export default App;
