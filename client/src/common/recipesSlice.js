import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const endpoint = 'http://localhost:5000/recipes';

export const getAllRecipes = createAsyncThunk(
	'recipes/getAllRecipes',
	async ({ email }) => {
		try {
			const res = await axios.get(`${endpoint}?email=${email}`);
			// console.log(res.data);
			return res.data;
		} catch (err) {
			console.error(`Error: ${err.response.data.message || err}`);
		}
	}
);

const initialState = {
	status: 'idle',
	recipes: [],
};

const recipesSlice = createSlice({
	name: 'recipes',
	initialState,
	reducers: {},
	extraReducers: {
		[getAllRecipes.pending]: (state) => {
			state.status = 'idle';
		},
		[getAllRecipes.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.recipes = action.payload;
		},
		[getAllRecipes.rejected]: (state) => {
			state.status = 'failed';
		},
	},
});

export default recipesSlice.reducer;
