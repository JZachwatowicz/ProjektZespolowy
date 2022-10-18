import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from './screens/navbar'
import AddProduct from './screens/AddProduct'
import ShowProducts from './screens/ShowProducts'
import ProductDetail from './screens/ProductDetail'
import EditProduct from './screens/EditProduct'

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/user-board.component";
import BoardEmployee from "./components/employee-board.component";
import BoardAdmin from "./components/admin-board.component";


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
        <Route exact path='/addProduct' component={AddProduct} />
        <Route exact path='/products' component={ShowProducts} />
        <Route exact path='/product/edit/:id' component={EditProduct} />
        <Route exact path='/product/:id' component={ProductDetail} />
      </Switch>
    </Router>
  );
};

export default App;