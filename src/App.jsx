import React, { useEffect } from "react";
import Login from "./views/Login";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard.jsx";
// import './App.css';

function App() {
  let history = useHistory();
  let location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      history.push("/dashboard");
    }
  }, [history, location]);
  return (
    <div>
      {/* A <Switch> looks through its children <Route>s and
           renders the first one that matches the current URL. */}
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/dashboard'>
          <Dashboard />
        </Route>
        <Route path='/'>ini home</Route>
      </Switch>
    </div>
  );
}

export default App;
