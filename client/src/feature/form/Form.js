import React, { useState, useLayoutEffect, useRef } from 'react';
import axios from 'axios';
import {
	Container,
	Stack,
	TextField,
	Input,
	IconButton,
	Typography,
	Box,
	Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Form = () => {
	const { enqueueSnackbar } = useSnackbar();
	const history = useHistory();
	const fileInputRef = useRef();

	const [values, setValues] = useState({
		author: sessionStorage.getItem('email'),
		title: '',
		subtitle: '',
		imageUrl: '',
		imageId: '',
		prepTime: '',
		totalTime: '',
		serves: '',
		ingredients: [],
		instrunctions: '',
	});
	const [imageFile, setImageFile] = useState('');
	const [numOfIngredients, setNumOfIngredients] = useState(3);
	const [isLoading, setIsLoading] = useState(false);

	// for http request
	const endpoint = 'http://localhost:5000/recipes';

	useLayoutEffect(() => {
		const email = sessionStorage.getItem('email');
		!email && history.push('/login');
	}, [history]);

	const handleOnChange = (e) => {
		const { name, value } = e.target;

		if (name === 'image') {
			const files = e.target.files;
			setImageFile(files[0]);
		} else {
			setValues({ ...values, [name]: value });
		}
	};

	const handleOnClickPlusBtn = () => {
		setNumOfIngredients((prevState) => prevState + 1);
	};

	const handleOnClickAddBtn = async () => {
		setIsLoading(true);

		try {
			if (imageFile) {
				const formDataUpload = new FormData();
				formDataUpload.append('file', imageFile);
				formDataUpload.append('upload_preset', 'FoodiePal');

				await axios
					.post(
						`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
						formDataUpload
					)
					.then(async (res) => {
						await axios
							.post(endpoint, {
								...values,
								imageUrl: res.data.secure_url,
								imageId: res.data.public_id,
							})
							.then((res) => createRecipeSnackbar(res.data.message, 'success'))
							.catch((err) => {
								console.error(err);
								createRecipeSnackbar(
									err.response?.data.message || err.message,
									'error'
								);
							});
					})
					.catch((err) => {
						console.error(err.message);
						throw new Error('Failed to upload an image...');
					});
			} else {
				await axios
					.post(endpoint, {
						...values,
					})
					.then((res) => createRecipeSnackbar(res.data.message, 'success'))
					.catch((err) => {
						console.error(err);
						throw new Error('Something went wrong...please try again.');
					});
			}

			setValues({
				author: sessionStorage.getItem('email'),
				title: '',
				subtitle: '',
				imageId: '',
				prepTime: '',
				totalTime: '',
				serves: '',
				ingredients: [],
				instrunctions: '',
			});
			setImageFile(null);
			fileInputRef.current.children[0].value = null;
			history.push('/recipes');
		} catch (err) {
			console.error(err);
			await createRecipeSnackbar(
				err.response?.data.message || err.message,
				'error'
			);
		}

		setIsLoading(false);
	};

	// snack bars
	function createRecipeSnackbar(message, variant) {
		enqueueSnackbar(message, {
			variant,
		});
	}

	// console.log(values);

	return (
		<Container
			maxWidth="md"
			sx={{
				width: '80%',
				mt: 10,
				pb: 8,
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				flex: '1 0 auto',
			}}
		>
			<Typography variant="h6" component="h1" align="center">
				Create Your Recipe
			</Typography>
			<Stack sx={{ my: 5 }} spacing={2}>
				<TextField
					required
					id="title"
					label="Title"
					name="title"
					value={values.title}
					variant="standard"
					inputProps={{ maxLength: 30 }}
					onChange={handleOnChange}
				/>
				<TextField
					id="subtitle"
					label="Subtitle / Short description"
					name="subtitle"
					value={values.subtitle}
					variant="standard"
					inputProps={{ maxLength: 50 }}
					onChange={handleOnChange}
				/>
				<Grid container gap={3}>
					<Grid item xs={12} md={4}>
						<TextField
							id="prep-time"
							label="Prep Time (min)"
							name="prepTime"
							type="number"
							variant="standard"
							fullWidth
							inputProps={{ min: 0 }}
							value={values.prepTime}
							onChange={handleOnChange}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							id="total-time"
							label="Total Time (min)"
							name="totalTime"
							type="number"
							variant="standard"
							fullWidth
							inputProps={{ min: 0 }}
							value={values.totalTime}
							onChange={handleOnChange}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<TextField
							required
							id="serves"
							label="Serves"
							name="serves"
							type="number"
							variant="standard"
							fullWidth
							inputProps={{ min: 1 }}
							value={values.serves}
							onChange={handleOnChange}
						/>
					</Grid>
				</Grid>
				<Box sx={{ display: 'flex', flexWrap: 'wrap', padding: '1rem 0' }}>
					<label
						htmlFor="file-upload-btn"
						style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem' }}
					>
						Upload an image <AddPhotoAlternateRoundedIcon />
					</label>
					<Input
						name="image"
						accept="image/*"
						id="file-upload-btn"
						type="file"
						onChange={handleOnChange}
						ref={fileInputRef}
					/>
				</Box>
				<section style={{ marginTop: '1rem' }}>
					<Stack>
						<label htmlFor="add-ingredients">
							Ingredients
							<IconButton
								color="primary"
								area-lable="add ingredients"
								component="span"
								onClick={handleOnClickPlusBtn}
							>
								<AddCircleRoundedIcon />
							</IconButton>
						</label>
						{[...Array(numOfIngredients)].map((ele, index) => (
							<IngredientInputElements
								key={index}
								index={index}
								values={values}
								setValues={setValues}
							/>
						))}
					</Stack>
				</section>
				<section style={{ marginTop: '2rem' }}>
					<Stack>
						<Typography variant="subtitle1" component="h6">
							Instructions
						</Typography>
						<TextField
							multiline
							rows={10}
							name="instructions"
							onChange={handleOnChange}
						/>
					</Stack>
				</section>
			</Stack>
			<LoadingButton
				loading={isLoading}
				loadingPosition="start"
				disabled={values.title && values.serves ? false : true}
				variant="contained"
				startIcon={<AddBoxRoundedIcon />}
				sx={{ width: '70%', maxWidth: '300px', marginBottom: '2rem' }}
				onClick={handleOnClickAddBtn}
			>
				Create Recipe
			</LoadingButton>
		</Container>
	);
};

export default Form;

const IngredientInputElements = ({ index, values, setValues }) => {
	const [ingredient, setIngredient] = useState({
		index: '',
		ingredient: '',
		quantity: '',
	});

	const handleOnChange = (e, index) => {
		const { name, value } = e.target;

		if (name === 'ingredient') {
			setIngredient({ ...ingredient, index, ingredient: value });
		} else if (name === 'quantity') {
			setIngredient({ ...ingredient, index, quantity: value });
		}
	};

	const handleOnBlur = (index) => {
		const targetIngredientIndex = values.ingredients.findIndex(
			(ele) => ele.index === index
		);

		console.log(targetIngredientIndex, ingredient);
		if (targetIngredientIndex >= 0) {
			values.ingredients.splice(targetIngredientIndex, 1, ingredient);
			setValues({
				...values,
				ingredients: values.ingredients,
			});
		} else if (ingredient.index !== '') {
			setValues({
				...values,
				ingredients: [...values.ingredients, ingredient],
			});
		}
	};

	return (
		<Box sx={{ display: 'flex', gap: 3, marginBottom: '1.5rem' }}>
			<TextField
				label="Ingredient"
				name="ingredient"
				variant="standard"
				fullWidth
				value={ingredient.ingredient}
				onChange={(e) => handleOnChange(e, index)}
				onBlur={() => handleOnBlur(index)}
			/>
			<TextField
				label="Quantity"
				name="quantity"
				variant="standard"
				fullWidth
				value={ingredient.quantity}
				onChange={(e) => handleOnChange(e, index)}
				onBlur={() => handleOnBlur(index)}
			/>
		</Box>
	);
};
