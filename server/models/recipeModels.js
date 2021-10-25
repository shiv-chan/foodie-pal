import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	selectedFile: String, // image
	ingredients: Array,
	notes: String,
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
