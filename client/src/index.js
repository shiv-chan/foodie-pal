import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { CssBaseline, Slide, Button } from '@mui/material';
import { Provider } from 'react-redux';
import store from './app/store';

import App from './App';

const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
	notistackRef.current.closeSnackbar(key);
};

ReactDOM.render(
	<Provider store={store}>
		<SnackbarProvider
			maxSnack={3}
			preventDuplicate
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			TransitionComponent={Slide}
			autoHideDuration={3000}
			ref={notistackRef}
			action={(key) => (
				<Button onClick={onClickDismiss(key)} sx={{ color: 'white' }}>
					Dismiss
				</Button>
			)}
		>
			<CssBaseline />
			<App />
		</SnackbarProvider>
	</Provider>,
	document.getElementById('root')
);
