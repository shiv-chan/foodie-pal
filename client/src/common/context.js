import React, { useState } from 'react';
import fakeData from '../fakeData';

export const context = React.createContext();

const ContextProvider = ({ children }) => {
	const userState = useState({
		email: '',
		isLoggedIn: false,
	});

	return (
		<context.Provider value={{ userState, fakeData }}>
			{children}
		</context.Provider>
	);
};

export default ContextProvider;
