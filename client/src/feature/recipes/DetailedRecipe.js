import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router';
import { context } from '../../common/context';
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
	TextField,
	useMediaQuery,
} from '@mui/material';

const DetailedRecipe = () => {
	const { fakeData } = useContext(context);
	const { recipeId } = useParams();
	const [rows, setRows] = useState([]);
	const targetRecipe = fakeData.find((recipe) => recipe.id == recipeId);
	const [serves, setServes] = useState(targetRecipe.serves);
	const isBiggerLaptopSize = useMediaQuery('(min-width: 1200px)');

	function createData(name, quantity) {
		return { name, quantity };
	}

	useLayoutEffect(() => {
		targetRecipe.ingredients.map((item) =>
			setRows((prevState) => [...prevState, createData(item[0], item[1])])
		);
	}, []);

	const handleChange = (e) => {
		const { value } = e.currentTarget;
		setServes(value);
	};

	// recipe image size
	const recipeImageSize = () =>
		isBiggerLaptopSize ? "height: '300px'" : "height: '200px'";

	return (
		<Container sx={{ maxWidth: '700px !important' }}>
			<Grid container spacing={2} sx={{ my: 'auto', px: 1 }}>
				<Grid item xs={6}>
					<Typography gutterBottom variant="h4" component="h1" align="start">
						{targetRecipe.title}
					</Typography>
					<Typography
						variant="subtitle1"
						component="p"
						align="start"
						sx={{ fontStyle: 'italic' }}
					>
						{targetRecipe.subtitle}
					</Typography>
					<Box sx={{ mt: 2 }}>
						{targetRecipe.prepTime ? (
							<Typography variant="subtitle2" component="p" align="start">
								Prep Time: {targetRecipe.prepTime}
							</Typography>
						) : (
							''
						)}
						<Typography variant="subtitle2" component="p" align="start">
							Total Time: {targetRecipe.totalTime}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={6} sx={recipeImageSize()}>
					<CardMedia
						component="img"
						image={targetRecipe.image}
						alt={targetRecipe.title}
						sx={{ borderRadius: '15px', objectFit: 'cover', height: '100%' }}
					/>
				</Grid>
				<Grid item xs={12} sx={{ my: 2 }}>
					<TextField
						id="serves"
						label="Serves"
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						variant="standard"
						onChange={handleChange}
						value={serves}
						size="small"
					/>
				</Grid>
				<Grid item xs={12} sx={{ mt: 2 }}>
					<TableContainer component="table">
						<Table size="small">
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.name}
										sx={{
											'&:last-child td, &:last-child th': { border: 0 },
											overflowWrap: 'anywhere',
										}}
									>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">{row.quantity}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item xs={12} sx={{ mt: 4 }}>
					{targetRecipe.instructions}
				</Grid>
			</Grid>
		</Container>
	);
};

export default DetailedRecipe;
