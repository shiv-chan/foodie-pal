import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

const IngredientInputElements = ({ index, values, setValues }) => {
	const [ingredient, setIngredient] = useState({
		index: '',
		ingredient: '',
		quantity: '',
	});

	useEffect(() => {
		if (values.ingredients[index]) {
			setIngredient({
				index,
				ingredient: values.ingredients[index].ingredient,
				quantity: values.ingredients[index].quantity,
			});
		}
	}, [index, values]);

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

export default IngredientInputElements;
