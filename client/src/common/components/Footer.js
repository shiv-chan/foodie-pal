import React from 'react';
import { AppBar, Toolbar, CssBaseline } from '@mui/material';

const Footer = () => {
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
				<Toolbar></Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

export default Footer;
