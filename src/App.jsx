import React, { useEffect } from "react";
import Login from "./views/Login/Login";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard.jsx";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import { inventoryDb } from "./config/firebase";
// import './App.css';

function App() {
  let history = useHistory();
  let location = useLocation();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isVerifying = useSelector((state) => state.auth.isVerifying);
  const user = useSelector((state) => state);

  useEffect(() => {
    if (location.pathname === '/') {
      history.push("/dashboard");
    }
    inventoryDb.get()
      .then(doc => {
        console.log(doc.data());
      })
      .catch(err => {
        console.log(err);
      })
  }, [history, location, user]);
  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
           renders the first one that matches the current URL. */}
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
