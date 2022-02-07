import React, { useLayoutEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	Container,
	Grid,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Box,
	CardMedia,
	useMediaQuery,
	Button,
} from '@mui/material';
import { getAllRecipes } from '../../common/recipesSlice';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const DetailedRecipe = () => {
	const allRecipes = useSelector((state) => state.recipes.recipes);
	const { recipeId } = useParams();
	const targetRecipe = allRecipes.find((recipe) => recipe._id === recipeId);
	const isBiggerLaptopSize = useMediaQuery('(min-width: 1200px)');
	const history = useHistory();
	const dispatch = useDispatch();
	const [instructionsEle, setInstructionsEle] = useState(null);

	useLayoutEffect(() => {
		const email = sessionStorage.getItem('email');
		!email && history.push('/login');
		dispatch(getAllRecipes({ email }));
	}, [history, dispatch]);

	// convert instruction string to HTML elements
	const convertStringToHTML = (str) => {
		const arr = str.split('\n');
		const elements = arr
			.map((ele) => {
				return `<p>${ele}</p>`;
			})
			.join('');

		if (instructionsEle) {
			instructionsEle.innerHTML = elements;
		} else {
			return 'Loading...';
		}
	};

	// recipe image size
	const recipeImageSize = () =>
		isBiggerLaptopSize ? { height: '300px' } : { height: '200px' };

	return !allRecipes.length ? null : (
		<Container
			sx={{
				maxWidth: '700px !important',
				flex: '1 0 auto',
				my: 10,
			}}
		>
			<Box
				sx={{ position: 'relative', marginBottom: '1rem', fontWeight: 'bold' }}
			>
				<Link to="/recipes" style={{ textDecoration: 'none' }}>
					<Button startIcon={<ArrowBackRoundedIcon />}>Back to recipes</Button>
				</Link>
				<Link
					to={`/edit/${recipeId}`}
					style={{ textDecoration: 'none', position: 'absolute', right: 0 }}
				>
					<Button startIcon={<EditRoundedIcon />}>Edit</Button>
				</Link>
			</Box>
			<Grid container spacing={2} sx={{ my: 'auto', px: 1 }}>
				<Grid item xs={6}>
					<Typography gutterBottom variant="h4" component="h1" align="left">
						{targetRecipe.title}
					</Typography>
					<Typography
						variant="subtitle1"
						component="p"
						align="left"
						sx={{ fontStyle: 'italic' }}
					>
						{targetRecipe.subtitle}
					</Typography>
					<Box sx={{ mt: 2 }}>
						{targetRecipe.prepTime ? (
							<Typography variant="subtitle2" component="p" align="left">
								Prep Time: {targetRecipe.prepTime}{' '}
								{targetRecipe.prepTime > 1 ? 'mins' : 'min'}
							</Typography>
						) : (
							''
						)}
						<Typography variant="subtitle2" component="p" align="left">
							Total Time: {targetRecipe.totalTime}{' '}
							{targetRecipe.totalTime > 1 ? 'mins' : 'min'}
						</Typography>
						<Typography variant="subtitle2" component="p" align="left">
							Serve: {targetRecipe.serves}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={6} sx={recipeImageSize()}>
					<CardMedia
						component="img"
						image={
							targetRecipe.imageUrl ||
							'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
						}
						alt={targetRecipe.title}
						sx={{ borderRadius: '15px', objectFit: 'cover', height: '100%' }}
					/>
				</Grid>
				<Grid item xs={12} sx={{ mt: 2 }}>
					<TableContainer>
						<Table size="small">
							<TableBody>
								{targetRecipe.ingredients.map((ele) => (
									<TableRow
										key={ele.index}
										sx={{
											'&:last-child td, &:last-child th': { border: 0 },
											overflowWrap: 'anywhere',
										}}
									>
										<TableCell component="th" scope="row">
											{ele.ingredient}
										</TableCell>
										<TableCell align="right">{ele.quantity}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item xs={12} sx={{ mt: 4 }}>
					<Typography
						gutterBottom
						variant="body1"
						component="div"
						align="left"
						ref={(node) => setInstructionsEle(node)}
						id="typo"
					>
						{convertStringToHTML(targetRecipe.instructions)}
					</Typography>
				</Grid>
			</Grid>
		</Container>
	);
};

export default DetailedRecipe;
