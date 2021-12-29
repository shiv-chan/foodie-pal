import { Container, Grid } from '@mui/material';
import React, { useContext, useLayoutEffect } from 'react';
import { context } from '../../common/context';
import RecipeCard from './RecipeCard';
import { useHistory } from 'react-router-dom';

const Recipes = () => {
	const { fakeData } = useContext(context);
	const history = useHistory();

	useLayoutEffect(() => {
		const email = sessionStorage.getItem('email');
		!email && history.push('/login');
	}, [history]);

	return (
		<Container>
			<h1>This is recipes page. ({sessionStorage.getItem('email')})</h1>
			<Grid container spacing={2}>
				{fakeData.map((recipe) => (
					<Grid item xs={12} md={6}>
						<RecipeCard recipeData={recipe} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Recipes;
