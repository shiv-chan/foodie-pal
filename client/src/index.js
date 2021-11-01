import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import ContextProvider from './common/context';
import { CssBaseline } from '@mui/material';

import App from './App';

ReactDOM.render(
	<ContextProvider>
		<SnackbarProvider maxSnack={3}>
			<CssBaseline />
			<App />
		</SnackbarProvider>
	</ContextProvider>,
	document.getElementById('root')
);
