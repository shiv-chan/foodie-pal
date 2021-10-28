import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipes.js';
import signUpRoutes from './routes/signUp.js';
import logInRoutes from './routes/logIn.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/recipes', recipeRoutes);
app.use('/signup', signUpRoutes);
app.use('/login', logInRoutes);

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
