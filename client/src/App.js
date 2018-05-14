import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from "./pages/Home";
import Cutting from "./pages/Cutting";
import Machining from "./pages/Machining";
import StockA from "./pages/StockA";
import CFA from "./pages/CFA";
import Packing from "./pages/Packing";
import PackingOnly from "./pages/PackingOnly";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/1" component={Cutting} />
      <Route exact path="/2" component={Machining} />
      <Route exact path="/3" component={StockA} />
      <Route exact path="/4" component={CFA} />
      <Route exact path="/5" component={Packing} />
      <Route exact path="/6" component={PackingOnly} />
    </Switch>
  </Router>
)

export default App;
