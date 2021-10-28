import React, { useState } from 'react';

export const userContext = React.createContext();

const ContextProvider = ({ children }) => {
	const userState = useState({
		email: '',
		userName: '',
		userIcon: '',
		isLoggedIn: false,
	});

	return (
		<userContext.Provider value={{ userState }}>
			{children}
		</userContext.Provider>
	);
};

export default ContextProvider;
