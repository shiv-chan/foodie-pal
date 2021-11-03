import React, { useState } from 'react';
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
	useMediaQuery,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';

const Form = () => {
	const isBiggerMediumSize = useMediaQuery('(min-width: 900px)');

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
					value=""
					variant="standard"
				/>
				<TextField
					id="subtitle"
					label="Subtitle / Short description"
					value=""
					variant="standard"
				/>
				<Grid container gap={3}>
					<Grid item sx={12} md={4}>
						<TextField
							id="prep-time"
							label="Prep Time (min)"
							type="number"
							variant="standard"
							fullWidth
						/>
					</Grid>
					<Grid item sx={12} md={4}>
						<TextField
							id="total-time"
							label="Total Time (min)"
							type="number"
							variant="standard"
							fullWidth
						/>
					</Grid>
					<Grid item sx={12} md={4}>
						<TextField
							required
							id="serves"
							label="Serves"
							type="number"
							variant="standard"
							inputProps={{ min: 1 }}
							fullWidth
						/>
					</Grid>
				</Grid>
				<label
					htmlFor="file-upload-btn"
					style={{ display: 'flex', alignItems: 'flex-end' }}
				>
					Upload an image <AddPhotoAlternateRoundedIcon />
					<Input accept="image/*" id="file-upload-btn" type="file" />
				</label>
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
						<Box sx={{ display: 'flex', gap: 3 }}>
							<TextField label="Ingredient" variant="standard" fullWidth />
							<TextField label="Quantity" variant="standard" fullWidth />
						</Box>
						<Box sx={{ display: 'flex', gap: 3 }}>
							<TextField label="Ingredient" variant="standard" fullWidth />
							<TextField label="Quantity" variant="standard" fullWidth />
						</Box>
						<Box sx={{ display: 'flex', gap: 3 }}>
							<TextField label="Ingredient" variant="standard" fullWidth />
							<TextField label="Quantity" variant="standard" fullWidth />
						</Box>
					</Stack>
				</section>
				<section style={{ marginTop: '1rem' }}>
					<Stack>
						<Typography variant="subtitle1" component="h6">
							Instructions
						</Typography>
						<TextField multiline rows={10} />
					</Stack>
				</section>
			</Stack>
		</Container>
	);
};

export default Form;
