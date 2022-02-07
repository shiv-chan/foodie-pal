import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import {
	Container,
	Stack,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	Typography,
	Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

const LogIn = () => {
	// states
	const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false,
	});
	const [isLoading, setIsLoading] = useState(false);

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

	const handleClickLogInBtn = async () => {
		setIsLoading(true);

		const loggingInUser = {
			email: values.email,
			password: values.password,
		};

		try {
			await axios
				.post(endpoint, loggingInUser)
				.then(async (res) => {
					sessionStorage.setItem('email', res.data.email);
					logInSnackbar(res.data.message, 'success');
					history.push('/recipes');
				})
				.catch((err) => {
					console.error(err.message);
					logInSnackbar(err.response?.data.message || err.message, 'error');
				});
		} catch (err) {
			console.error(err.message);
			await logInSnackbar(err.response?.data.message || err.message, 'error');
		}

		setIsLoading(false);
	};

	// snack bars
	function logInSnackbar(message, variant) {
		enqueueSnackbar(message, {
			variant,
		});
	}

	return (
		<Container
			maxWidth="xs"
			sx={{
				width: '80%',
				mt: 15,
				flex: '1 0 auto',
			}}
		>
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
				<LoadingButton
					loading={isLoading}
					loadingPosition="start"
					disabled={values.email && values.password ? false : true}
					variant="contained"
					sx={{ width: '70%' }}
					onClick={handleClickLogInBtn}
					startIcon={<LoginRoundedIcon />}
				>
					log in
				</LoadingButton>
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
	);
};

export default LogIn;
