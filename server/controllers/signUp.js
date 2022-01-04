import User from '../models/userModels.js';
import { handleSignUpErrors } from '../utils/handleErrors.js';

export const signUp_post = async (req, res) => {
	const { email, password } = req.body;
	const signedUpUser = new User({
		email,
		password,
	});

	try {
		const user = await User.findOne({ email }).exec();
		if (user) {
			res.status(409).json({ message: 'This email is already registered.' });
		} else {
			const newUser = await signedUpUser.save();
			res
				.status(201)
				.json({ message: 'Signed up successfully!', email: newUser.email });
		}
	} catch (err) {
		const message = handleSignUpErrors(err);
		res.status(409).json({ message });
	}
};
