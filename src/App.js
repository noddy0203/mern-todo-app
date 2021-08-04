import React from "react";
import Todo from "./components/Todo";
import UserApi from "./components/UserApi";
import Home from "./components/Home";
import Nav from "./components/Nav";
import { Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/todo">
          <Todo />
        </Route>

        <Route path="/api">
          <UserApi />
        </Route>
      </Switch>
    </>
  );
};

export default App;
