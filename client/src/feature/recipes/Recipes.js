import { Container, Grid, Typography } from '@mui/material';
import React, { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RecipeCard from './RecipeCard';
import { useHistory } from 'react-router-dom';
import { getAllRecipes } from '../../common/recipesSlice';

const Recipes = () => {
	const history = useHistory();
	const allRecipes = useSelector((state) => state.recipes.recipes);
	const status = useSelector((state) => state.recipes.status);
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const email = sessionStorage.getItem('email');
		!email && history.push('/login');

		dispatch(getAllRecipes({ email }));
	}, [history, dispatch]);

	if (status === 'idle') {
		return (
			<Container sx={{ flex: '1 0 auto', my: 10 }}>
				<Typography variant="h5" component="p">
					Loading...
				</Typography>
			</Container>
		);
	}

	if (status === 'succeeded') {
		return (
			<Container sx={{ flex: '1 0 auto', my: 10 }}>
				<Typography variant="h4" component="h1">
					Your recipes
				</Typography>
				<Typography variant="subtitle1" component="p">
					Now you are logged in with <b>{sessionStorage.getItem('email')}</b>.
				</Typography>
				<Grid container spacing={2}>
					{allRecipes.map((recipe) => (
						<Grid item xs={12} md={6} key={recipe._id}>
							<RecipeCard recipeData={recipe} />
						</Grid>
					))}
				</Grid>
			</Container>
		);
	}

	if (status === 'failed') {
		return (
			<Container sx={{ flex: '1 0 auto', my: 10 }}>
				<Typography variant="h5" component="p">
					Something went wrong...
				</Typography>
			</Container>
		);
	}
};

export default Recipes;
