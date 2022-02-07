import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import validator from 'validator';
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
	FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { useSnackbar } from 'notistack';

const SignUp = () => {
	const { enqueueSnackbar } = useSnackbar();

	// states
	const [values, setValues] = useState({
		email: '',
		password: '',
		showPassword: false,
	});
	const [isLoading, setIsLoading] = useState(false);

	const [isValid, setIsValid] = useState({
		email: true,
		password: true,
	});

	const history = useHistory();

	// for http request
	const endpoint = 'http://localhost:5000/signup';

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

	const handleClickSignUpBtn = async () => {
		setIsLoading(true);

		const registerUser = {
			email: values.email,
			password: values.password,
		};

		try {
			await axios
				.post(endpoint, registerUser)
				.then((res) => {
					sessionStorage.setItem('email', res.data.email);
					signUpSnackbar(res.data.message, 'success');
					history.push('/recipes');
				})
				.catch((err) => {
					console.error(err);
					signUpSnackbar(err.response?.data.message || err.message, 'error');
				});
		} catch (err) {
			console.error(err);
			await signUpSnackbar(err.response?.data.message || err.message, 'error');
		}

		setIsLoading(false);
	};

	// validate all input values
	const validateInputValues = (e) => {
		const { name, value } = e.currentTarget;
		if (name === 'email') {
			setIsValid({ ...isValid, email: validator.isEmail(value) });
		} else {
			setIsValid({
				...isValid,
				password: validator.isStrongPassword(value, {
					minLength: 6,
					minLowercase: 0,
					minUppercase: 0,
					minNumbers: 0,
					minSymbols: 0,
				}),
			});
		}
	};

	// snack bars
	function signUpSnackbar(message, variant) {
		enqueueSnackbar(message, {
			variant,
		});
	}

	return (
		<Container maxWidth="xs" sx={{ width: '80%', mt: 15, flex: '1 0 auto' }}>
			<Typography variant="h4" component="h1" align="center">
				SIGN UP
			</Typography>
			<Stack sx={{ my: 5 }} spacing={4}>
				<FormControl error={!isValid.email} variant="standard">
					<InputLabel htmlFor="email">Email</InputLabel>
					<Input
						error={!isValid.email}
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
					</FormHelperText>
				</FormControl>
				<FormControl error={!isValid.password} variant="standard">
					<InputLabel htmlFor="password">Password</InputLabel>
					<Input
						error={!isValid.password}
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
									{values.showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
					<FormHelperText error>
						{isValid.password ? '' : 'Password must be at least 6 characters.'}
					</FormHelperText>
				</FormControl>
			</Stack>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<LoadingButton
					loading={isLoading}
					loadingPosition="start"
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
					startIcon={<AssignmentRoundedIcon />}
				>
					sign up
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
					Already have an account?
				</Typography>
				<Link
					to="/login"
					style={{
						color: 'inherit',
					}}
				>
					Log in
				</Link>
			</Box>
		</Container>
	);
};

export default SignUp;
