import React, { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import {
	Container,
	Stack,
	TextField,
	FormControl,
	InputLabel,
	Input,
	InputAdornment,
	IconButton,
	Button,
	Typography,
	Box,
	FormHelperText,
	Grid,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import { useHistory } from 'react-router-dom';

const Form = () => {
	const history = useHistory();

	const [values, setValues] = useState({
		title: '',
		subtitle: '',
		imageId: '',
		prepTime: '',
		totalTime: '',
		serves: '',
		ingredients: [],
		instrunctions: '',
	});
	const [imageFile, setImageFile] = useState(null);
	const [numOfIngredients, setNumOfIngredients] = useState(3);

	useLayoutEffect(() => {
		const email = sessionStorage.getItem('email');
		!email && history.push('/login');
	}, [history]);

	const handleOnChange = (e) => {
		const { name, value } = e.target;

		if (name === 'image') {
			const files = e.target.files;
			setImageFile(files);
		} else {
			setValues({ ...values, [name]: value });
		}
	};

	console.log(values);

	return (
		<Container maxWidth="md" sx={{ width: '80%', mt: 5, pb: 8 }}>
			<Typography variant="h6" component="h1" align="center">
				Add Your Recipe
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
