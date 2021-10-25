import React from 'react';
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
	CssBaseline,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						News
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

export default Header;
