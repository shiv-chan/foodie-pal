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
	FormHelperText,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
	// states
	const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false,
	});

	const [responseError, setResponseError] = useState({
		isError: false,
		message: '',
	});

	const [isValid, setIsValid] = useState({
		email: true,
		password: true,
	});

	const history = useHistory();

	// for http request
	const endpoint = 'http://localhost:5000/signup';

	// regular expressions
	const emailRegex = new RegExp(
		'^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$',
		'gm'
	);
	const passwordRegex = new RegExp('^(?=.*)(?=.*[a-zA-Zd]).{6,}$', 'gm');

	// event handlers
	const handleChange = (e) => {
		const { name, value } = e.currentTarget;
		setValues({ ...values, [name]: value });
		name === 'password' && validateInputValues(e);
	};

	const handleBlur = (e) => {
		validateInputValues(e);
	};

	const handleClickVisibiltyIcon = () => {
		setValues((prevState) => ({
			...prevState,
			showPassword: !prevState.showPassword,
		}));
	};

	const handleClickSignUpBtn = () => {
		const registerUser = {
			email: values.email,
			password: values.password,
		};

		axios
			.post(endpoint, registerUser)
			.then(() => history.push('/'))
			.catch((err) => {
				console.error(err.message);
				setResponseError({
					isError: true,
					message: err.response.data.message || err.message,
				});
				setTimeout(
					() => setResponseError({ isError: false, message: '' }),
					3000
				);
			});
	};

	// validate all input values
	const validateInputValues = (e) => {
		const { name, value } = e.currentTarget;
		let targetRegex;
		if (name === 'email') {
			targetRegex = emailRegex;
		} else {
			targetRegex = passwordRegex;
		}

		targetRegex.test(value)
			? setIsValid({ ...isValid, [name]: true })
			: setIsValid({ ...isValid, [name]: false });
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="xs" sx={{ width: '80%', mt: 5 }}>
				<Typography variant="h4" component="h1" style={{ textAlign: 'center' }}>
					Sign Up
				</Typography>
				<Stack sx={{ my: 5 }} spacing={4}>
					<FormControl
						error={!isValid.email || responseError.isError ? true : false}
						variant="standard"
					>
						<InputLabel htmlFor="email">Email</InputLabel>
						<Input
							error={!isValid.email || responseError.isError ? true : false}
							name="email"
							id="email"
							type="email"
							value={values.email}
							required
							onChange={handleChange}
							onBlur={handleBlur}
							fullWidth
						/>
						<FormHelperText error>
							{isValid.email ? '' : 'Please enter a valid email.'}
							{responseError.isError ? responseError.message : ''}
						</FormHelperText>
					</FormControl>
					<FormControl
						error={isValid.password ? false : true}
						variant="standard"
					>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							error={isValid.password ? false : true}
							name="password"
							id="password"
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							required
							fullWidth
							onChange={handleChange}
							onBlur={handleBlur}
							endAdornment={
								<InputAdornment position="end">
									<IconButton onClick={handleClickVisibiltyIcon}>
										{values.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText error>
							{isValid.password
								? ''
								: 'Password should be at least 6 characters.'}
						</FormHelperText>
					</FormControl>
				</Stack>
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Button
						disabled={
							Object.values(isValid).every(Boolean) &&
							values.email &&
							values.password
								? false
								: true
						}
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
