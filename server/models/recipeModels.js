import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const recipeSchema = new mongoose.Schema({
	id: {
		type: String,
		default: nanoid,
	},
	title: {
		type: String,
		required: true,
	},
	subtitle: String,
	imageId: String,
	prepTime: Number,
	totalTime: Number,
	serves: {
		type: Number,
		required: true,
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
