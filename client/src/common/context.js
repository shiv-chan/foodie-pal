import React from 'react';
import fakeData from '../fakeData';

export const context = React.createContext();

const ContextProvider = ({ children }) => {
	return <context.Provider value={{ fakeData }}>{children}</context.Provider>;
};

export default ContextProvider;
