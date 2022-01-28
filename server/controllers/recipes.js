// all handlers for routes
import Recipe from '../models/recipeModels.js';
import { handleAddRecipeErrors } from '../utils/handleErrors.js';

export const recipes_get = async (req, res) => {
	const { email } = req.query;
	try {
		const allRecipes = await Recipe.find({ author: email });
		res.status(200).json(allRecipes);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const recipes_post = async (req, res) => {
	const recipe = req.body;
	const newRecipe = new Recipe(recipe);

	try {
		const addedRecipe = await newRecipe.save();
		const id = addedRecipe._id;
		if (id) {
			res.status(201).json({ message: 'Created your recipe successfully!' });
		} else {
			res.status(409).json({ message: 'Failed to create your recipe...' });
		}
	} catch (err) {
		const message = handleAddRecipeErrors(err);
		res.status(409).json({ message });
	}
};
