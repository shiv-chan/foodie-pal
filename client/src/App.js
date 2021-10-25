import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './common/components/Home';
import Header from './common/components/Header';
import Footer from './common/components/Footer';

const App = () => {
	return (
		<Router>
			<Header />
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
			<Footer />
		</Router>
	);
};

export default App;
