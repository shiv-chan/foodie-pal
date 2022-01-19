import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../common/recipesSlice';

export default configureStore({
	reducer: {
		recipes: recipesReducer,
	},
});
