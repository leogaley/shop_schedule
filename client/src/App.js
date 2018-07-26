import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./pages/Home";
// import Cutting from "./pages/Cutting";
// import Machining from "./pages/Machining";
// import StockA from "./pages/StockA";
// import CFA from "./pages/CFA";
// import Packing from "./pages/Packing";
// import PackingOnly from "./pages/PackingOnly";
// import Design from "./pages/Design";
import Schedule from "./pages/Schedule";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/:id" component={Schedule} />
    </Switch>
  </Router>
)

export default App;
