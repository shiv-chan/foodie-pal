import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './common/components/Home';
import Header from './common/components/Header';
import Footer from './common/components/Footer';
import SignUp from './feature/sign-up/SignUp';
import LogIn from './feature/log-in/LogIn';
import Recipes from './feature/recipes/Recipes';
import DetailedRecipe from './feature/recipes/DetailedRecipe';
import Form from './feature/form/Form';
import './App.css';

const App = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/signup" component={SignUp} />
				<Route path="/login" component={LogIn} />
				<Route path="/recipes/:recipeId" component={DetailedRecipe} />
				<Route path="/recipes" component={Recipes} />
				<Route path="/add" component={Form} />
				<Route path="/edit/:recipeId" component={Form} />
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
