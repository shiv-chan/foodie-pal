import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
	CssBaseline,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { userContext } from '../context';

const Header = () => {
	const { userState } = useContext(userContext);
	const [user, setUser] = userState;
	const { isLoggedIn } = user;

	const handleLogoutClick = () => {
		setUser({
			email: '',
			userName: '',
			userIcon: '',
			isLoggedIn: false,
		});
	};

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
						<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
							Foodie Pal
						</Link>
					</Typography>
					<Button color="inherit">
						{isLoggedIn ? (
							<Link
								to="/login"
								style={{ textDecoration: 'none', color: 'inherit' }}
								onClick={handleLogoutClick}
							>
								Logout
							</Link>
						) : (
							<Link
								to="/login"
								style={{ textDecoration: 'none', color: 'inherit' }}
							>
								Login
							</Link>
						)}
					</Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
};

export default Header;
