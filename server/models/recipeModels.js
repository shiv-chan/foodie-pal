import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
	author: {
		type: String,
		required: [true, 'The user cannot be found.'],
	},
	title: {
		type: String,
		required: [true, 'The title is required.'],
	},
	subtitle: String,
	imageUrl: String,
	imageId: String,
	prepTime: Number,
	totalTime: Number,
	serves: {
		type: Number,
		required: [true, 'The number of serves is required.'],
	},
	ingredients: Array,
	instrunctions: String,
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
