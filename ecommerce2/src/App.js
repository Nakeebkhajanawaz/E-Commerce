import React, { Component } from "react";
import {Switch, Route} from 'react-router-dom'
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/navbar";
import ProductList from "./Components/productList";
import Details from "./Components/details";
import Cart from "./Components/cart/Cart";
import Default from "./Components/default";
import Modal from './Components/modal';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/details" component={Details} />
          <Route exact path="/Cart" component={Cart} />
          <Route component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}
//
export default App;
