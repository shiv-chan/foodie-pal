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
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { useHistory, useParams, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import IngredientInputElements from './IngredientInputElements';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
var sha1 = require('sha-1');

const Form = () => {
	const { enqueueSnackbar } = useSnackbar();
	const history = useHistory();
	const fileInputRef = useRef();
	const { recipeId } = useParams();
	const allRecipes = useSelector((state) => state.recipes.recipes);

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
		instructions: '',
	});
	const [imageFile, setImageFile] = useState('');
	const [numOfIngredients, setNumOfIngredients] = useState(3);
	const [isLoading, setIsLoading] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// for http request
	const endpoint = 'https://foodie-pal-backend.herokuapp.com/recipes';

	useLayoutEffect(() => {
		const email = sessionStorage.getItem('email');
		!email && history.push('/login');

		if (recipeId) {
			const targetRecipe = allRecipes.find((recipe) => recipe._id === recipeId);

			if (targetRecipe) {
				setValues({
					...values,
					title: targetRecipe.title,
					subtitle: targetRecipe.subtitle,
					imageUrl: targetRecipe.imageUrl,
					imageId: targetRecipe.imageId,
					prepTime: targetRecipe.prepTime,
					totalTime: targetRecipe.totalTime,
					serves: targetRecipe.serves,
					ingredients: targetRecipe.ingredients,
					instructions: targetRecipe.instructions,
				});

				setNumOfIngredients(targetRecipe.ingredients.length);
			}
		}
	}, [history, allRecipes, recipeId]);

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

	const handleClickListDeleteRecipe = () => {
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
	};

	const handleOnClickAddBtn = async () => {
		setIsLoading(true);

		try {
			if (imageFile) {
				if (values.imageId) {
					const timestamp = Date.now();
					const formDataDestroy = new FormData();

					formDataDestroy.append('public_id', values.imageId);
					formDataDestroy.append(
						'api_key',
						`${process.env.REACT_APP_CLOUDINARY_API_KEY}`
					);
					formDataDestroy.append('timestamp', timestamp.toString());
					formDataDestroy.append(
						'signature',
						sha1(
							`public_id=${values.imageId}&timestamp=${timestamp}${process.env.REACT_APP_CLOUDINARY_API_SECRET}`
						)
					);

					await axios.post(
						`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/destroy`,
						formDataDestroy
					);
				}

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
								_id: recipeId,
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
						_id: recipeId,
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
				instructions: '',
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

	const handleClickDeleteButton = async () => {
		try {
			await axios
				.post(`${endpoint}/delete`, { _id: recipeId })
				.then((res) => {
					createRecipeSnackbar(res.data.message, 'success');
					history.push('/recipes');
					setIsDialogOpen(false);
				})
				.catch((err) => {
					console.error(err);
					createRecipeSnackbar(
						err.response?.data.message || err.message,
						'error'
					);
				});
		} catch (err) {
			console.error(err);
			createRecipeSnackbar(err.response?.data.message || err.message, 'error');
		}
	};

	// snack bars
	function createRecipeSnackbar(message, variant) {
		enqueueSnackbar(message, {
			variant,
		});
	}

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
			<Link
				to="/recipes"
				style={{ textDecoration: 'none', alignSelf: 'flex-start' }}
			>
				<Button startIcon={<ArrowBackRoundedIcon />}>Back to recipes</Button>
			</Link>
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
						<Typography variant="subtitle1" component="h6">
							Ingredients
						</Typography>
						{[...Array(numOfIngredients)].map((ele, index) => (
							<IngredientInputElements
								key={index}
								index={index}
								values={values}
								setValues={setValues}
							/>
						))}
						<label htmlFor="add-ingredients">
							<IconButton
								color="primary"
								area-lable="add ingredients"
								component="span"
								onClick={handleOnClickPlusBtn}
							>
								<AddCircleRoundedIcon />
							</IconButton>
							Add more
						</label>
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
							value={values.instructions}
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
				sx={{ width: '70%', maxWidth: '300px', margin: '2rem 0' }}
				onClick={handleOnClickAddBtn}
			>
				{recipeId ? 'Update Recipe' : 'Create Recipe'}
			</LoadingButton>
			{recipeId ? (
				<Button
					variant="contained"
					color="warning"
					startIcon={<DeleteRoundedIcon />}
					sx={{ width: '70%', maxWidth: '300px', marginBottom: '2rem' }}
					onClick={handleClickListDeleteRecipe}
				>
					Delete Recipe
				</Button>
			) : (
				''
			)}
			<Dialog
				open={isDialogOpen}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					id="alert-dialog-title"
					color="error"
					display="flex"
					alignItems="center"
				>
					<ReportRoundedIcon />
					{'Delete Recipe'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this recipe?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} sx={{ color: 'gray' }}>
						Cancel
					</Button>
					<Button color="error" onClick={handleClickDeleteButton}>
						Delete Recipe
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default Form;
