import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminHome from "./components/AdminHome";
import UserHome from "./components/UserHome";
import "./App.css";
import AddUser from "./components/AddUser";

function App() {
  return (
    <div className="container">
      <Switch>
        <Route to="/adminHome">
          <AdminHome></AdminHome>
        </Route>
        <Route to="/addUser">
          <AddUser></AddUser>
        </Route>
        <Route to="/userHome">
          <UserHome></UserHome>
        </Route>
      </Switch>  
    </div>
  );
}

export default App;
