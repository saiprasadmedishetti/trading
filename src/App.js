import React from "react";
import Search from "./components/Search";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Chart from "./components/Chart";

function App() {
  return (
    <Router>
      <div className="container pt-5">
        <Search />
        <Switch>
          <Route exact path="/">
            <Redirect to="/coins" />
          </Route>

          <Route path="/coins/:id" component={Chart} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
