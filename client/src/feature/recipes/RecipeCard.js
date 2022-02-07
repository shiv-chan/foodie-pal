import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
	Card,
	CardActionArea,
	CardMedia,
	CardContent,
	Typography,
	Box,
} from '@mui/material';

const RecipeCard = ({ recipeData }) => {
	const { path } = useRouteMatch();

	return (
		<Link to={`${path}/${recipeData._id}`} style={{ textDecoration: 'none' }}>
			<CardActionArea>
				<Card sx={{ display: 'flex', height: 151 }}>
					<CardMedia
						component="img"
						sx={{ width: 151, height: '100%' }}
						image={
							recipeData.imageUrl ||
							'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
						}
						alt={recipeData.title}
					/>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{recipeData.title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{recipeData.subtitle}
							</Typography>
						</CardContent>
					</Box>
				</Card>
			</CardActionArea>
		</Link>
	);
};

export default RecipeCard;
