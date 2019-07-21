import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from "react-router-dom/Route";
import './App.css';
import AssetGrid from "./components/List/Asset";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

class App extends Component {
  render() {
   return <Router>
      <div>
        <Route exact path="/" component={AssetGrid} />
        {/* <Route path="/asset" component={AssetGrid} /> */}
      </div>
    </Router>
  }
}

export default App;
