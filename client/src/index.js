import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import ContextProvider from './common/context';

import App from './App';

ReactDOM.render(
	<ContextProvider>
		<SnackbarProvider maxSnack={3}>
			<App />
		</SnackbarProvider>
	</ContextProvider>,
	document.getElementById('root')
);
