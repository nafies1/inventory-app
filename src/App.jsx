/** @format */

import React from "react";
import Login from "./views/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./views/Dashboard/Dashboard.jsx";
// import './App.css';

function App() {
  return (
    // <div className="App">
    <Router>
      <div>
        {/* <nav>
         <ul>
           <li>
             <Link to="/">Home</Link>
           </li>
           <li>
             <Link to="/about">About</Link>
           </li>
           <li>
             <Link to="/users">Users</Link>
           </li>
         </ul>
       </nav> */}

        {/* A <Switch> looks through its children <Route>s and
           renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/'>
            ini home
          </Route>
        </Switch>
      </div>
    </Router>
    // </div>
  );
}

export default App;
