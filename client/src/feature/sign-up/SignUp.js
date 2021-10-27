import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
	const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false,
	});
	const [error, setError] = useState({
		isError: false,
		message: '',
	});
	const history = useHistory();

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

	const handleClickSignUpBtn = () => {
		const endpoint = 'http://localhost:5000/signup';

		const registerUser = {
			email: values.email,
			password: values.password,
		};

		axios
			.post(endpoint, registerUser)
			.then(() => history.push('/'))
			.catch((err) => {
				console.error(err.message);
				setError({
					isError: true,
					message: err.response.message || err.message,
				});
			});
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="xs" sx={{ width: '80%', mt: 5 }}>
				<Typography variant="h4" component="h1" style={{ textAlign: 'center' }}>
					Sign Up
				</Typography>
				<Box>
					<Typography
						variant="h6"
						component="p"
						style={{ textAlign: 'center' }}
					>
						{error.isError ? error.message : ''}
					</Typography>
				</Box>
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
							fillWidth
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
							fillWidth
							onChange={handleChange}
							endAdornment={
								<InputAdornment position="end">
									<IconButton onClick={handleClickVisibiltyIcon}>
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Stack>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button
						variant="contained"
						sx={{ width: '70%' }}
						onClick={handleClickSignUpBtn}
					>
						sign up
					</Button>
				</Box>
			</Container>
		</React.Fragment>
	);
};

export default SignUp;
