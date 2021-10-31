import { Container, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { context } from '../../common/context';
import RecipeCard from './RecipeCard';

const Recipes = () => {
	const { userState, fakeData } = useContext(context);
	const [user, setUser] = userState;

	return (
		<Container>
			<h1>This is recipes page. ({user.email})</h1>
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
