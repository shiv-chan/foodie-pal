import React, { useContext } from 'react';
import { userContext } from '../../common/context';

const Recipes = () => {
	const { userState } = useContext(userContext);
	const [user, setUser] = userState;

	return <h1>This is recipes page. ({user.email})</h1>;
};

export default Recipes;
