import Recipe from '../models/recipeModels.js';

export const deleteRecipe_post = async (req, res) => {
	const { _id } = req.body;

	try {
		const recipe = Recipe.findOne({ _id }).exec();
		if (recipe) {
			await Recipe.deleteOne({ _id }).exec();
			res.status(201).json({ message: 'Deleted the recipe successfully.' });
		} else {
			res.status(409).json({ message: 'The recipe is not found.' });
		}
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};
