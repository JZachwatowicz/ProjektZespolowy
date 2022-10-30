import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from './screens/Navbar'
import AddActivity from './components/add_activity.component'
import ShowActivities from './components/show_activities.component'
import EditActivity from './components/edit_activity.component'

import Login from "./components/loginComponent";
import Register from "./components/registerComponent";
import Home from "./components/homeComponent";
import Profile from "./components/profileComponent";
import BoardUser from "./components/userBoardComponent";
import BoardEmployee from "./components/employeeBoardComponent";
import BoardAdmin from "./components/adminBoardComponent";


const App = () => {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/home"} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/user" component={BoardUser} />
        <Route exact path="/employee" component={BoardEmployee} />
        <Route exact path="/admin" component={BoardAdmin} />
        <Route exact path='/addActivity' component={AddActivity} />
        <Route exact path='/editActivity/:id' component={EditActivity} />
        <Route exact path='/activities' component={ShowActivities} />
      </Switch>
    </Router>
  );
};

export default App;