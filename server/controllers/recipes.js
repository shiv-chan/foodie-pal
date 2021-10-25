// all handlers for routes
import Recipe from '../models/recipeModels.js';

export const getRecipes = async (req, res) => {
	try {
		const allRecipes = await Recipe.find();
		console.log(allRecipes);
		res.status(200).json(allRecipes);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const createRecipe = async (req, res) => {
	const recipe = req.body;

	const newRecipe = new Recipe(recipe);

	try {
		await newRecipe.save();
		res.status(201).json(newRecipe);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};
