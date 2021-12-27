import React from 'react';
import {
	AppBar,
	Toolbar,
	CssBaseline,
	Box,
	Typography,
	Link,
} from '@mui/material';

const Footer = () => {
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="absolute"
				color="primary"
				sx={{ top: 'auto', bottom: 0 }}
			>
				<Toolbar sx={{ margin: 'auto' }}>
					<Box display="flex" justifyContent="center" alignItems="center">
						<Typography variant="body1" component="p">
							Made by{' '}
							<Link
								href="https://github.com/shiv-chan/foodie-pal"
								color="inherit"
								target="_blank"
								rel="noopener noreferrer"
							>
								Kaho Shibuya
							</Link>
						</Typography>
					</Box>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

export default Footer;
