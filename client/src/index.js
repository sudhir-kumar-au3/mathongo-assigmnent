import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import './index.css';
import App from './App';
import Login from './components/Login';
import * as serviceWorker from './serviceWorker';

const Home = () => {
  const doRedirect = () => {
    let loggedIn = localStorage.getItem("user-detail");
    if(loggedIn){
      return <Redirect to='/app/home'></Redirect>
    }
    else{
      return <Redirect to='/login'></Redirect>
    }
  }
  return(
    <Router>
      <Route path='/app'><App></App></Route>
      <Route path='/login'><Login></Login></Route>
      {doRedirect()}
    </Router>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
