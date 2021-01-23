import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Signup from "./user/Signup";
import Signin from "./auth/Signin";

const App = () => {
  return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/signup" component={Signup} />
					<Route path="/signin" component={Signin} />
				</Switch>
			</BrowserRouter>
		</div>
	);
};

export default App;
