import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import ResetPassword from "./views/vendor/RequstResetPassword";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/vendor/reset-password" component={ResetPassword} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
