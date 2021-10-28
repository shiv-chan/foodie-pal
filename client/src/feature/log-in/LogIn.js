import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import {
	CssBaseline,
	Container,
	Stack,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	Button,
	Typography,
	Box,
	Slide,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LogIn = () => {
	// states
	const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false,
	});

	const { enqueueSnackbar } = useSnackbar();
	const history = useHistory();

	// for http request
	const endpoint = 'http://localhost:5000/login';

	// event handlers
	const handleChange = (e) => {
		const { name, value } = e.currentTarget;
		setValues({ ...values, [name]: value });
	};

	const handleClickVisibiltyIcon = () => {
		setValues((prevState) => ({
			...prevState,
			showPassword: !prevState.showPassword,
		}));
	};

	const handleClickLogInBtn = () => {
		const loggingInUser = {
			email: values.email,
			password: values.password,
		};

		axios
			.post(endpoint, loggingInUser)
			.then((res) => {
				logInSnackbar(res.data.message, 'success');
				history.push('/recipes');
			})
			.catch((err) => {
				logInSnackbar(err.response.data.message, 'error');
			});
	};

	// snack bars
	function logInSnackbar(message, variant) {
		enqueueSnackbar(message, {
			variant,
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'center',
			},
			TransitionComponent: Slide,
		});
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="xs" sx={{ width: '80%', mt: 5 }}>
				<Typography variant="h4" component="h1" align="center">
					LOGIN
				</Typography>
				<Stack sx={{ my: 5 }} spacing={4}>
					<FormControl variant="standard">
						<InputLabel htmlFor="email">Email</InputLabel>
						<Input
							name="email"
							id="email"
							type="email"
							value={values.email}
							required
							onChange={handleChange}
							fullWidth
						/>
					</FormControl>
					<FormControl variant="standard">
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							name="password"
							id="password"
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							required
							fullWidth
							onChange={handleChange}
							endAdornment={
								<InputAdornment position="end">
									<IconButton onClick={handleClickVisibiltyIcon}>
										{values.showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Stack>
				<Box display="flex" justifyContent="center">
					<Button
						disabled={values.email && values.password ? false : true}
						variant="contained"
						sx={{ width: '70%' }}
						onClick={handleClickLogInBtn}
					>
						log in
					</Button>
				</Box>
				<Box
					mt={4}
					display="flex"
					flexDirection="column"
					alignItems="center"
					rowGap={1}
				>
					<Typography variant="body1" component="p" align="center">
						Don't have an account yet?
					</Typography>
					<Link
						to="/signup"
						style={{
							color: 'inherit',
						}}
					>
						Create an account
					</Link>
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default LogIn;
