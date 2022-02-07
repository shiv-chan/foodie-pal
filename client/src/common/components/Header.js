import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	CssBaseline,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from './Menu';

const Header = () => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [email, setEmail] = useState(sessionStorage.getItem('email'));

	useEffect(() => {
		setEmail(sessionStorage.getItem('email'));
	}, [location.pathname]);

	const handleLogoutClick = () => {
		sessionStorage.clear();
		setEmail(null);
	};

	const handleMenuIconClick = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="fixed">
				<Toolbar>
					<MenuIcon
						sx={{ mr: 2, cursor: 'pointer' }}
						onClick={handleMenuIconClick}
					/>
					<Menu isOpen={isOpen} setIsOpen={setIsOpen} email={email} />
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
							Foodie Pal
						</Link>
					</Typography>
					<Button color="inherit">
						{email ? (
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
