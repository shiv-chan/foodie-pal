import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipes.js';
import signUpRoutes from './routes/signUp.js';
import logInRoutes from './routes/logIn.js';
import deleteAccountRoutes from './routes/deleteAccount.js';
import deleteRecipe from './routes/deleteRecipe.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
const corsOptions = {
	origin: 'http://localhost:3000',
	credential: true,
};
app.use(cors(corsOptions));
app.use('/recipes', recipeRoutes);
app.use('/signup', signUpRoutes);
app.use('/login', logInRoutes);
app.use('/delete', deleteAccountRoutes);
app.use('/recipes/delete', deleteRecipe);

const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;

mongoose
	.connect(DATABASE_URL)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(`Failed to connect to database: ${err.message}`);
	});
