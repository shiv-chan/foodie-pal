import User from '../models/userModels.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
	const { email, password } = req.body;
	const saltPassword = await bcrypt.genSalt(10);
	const securePassword = await bcrypt.hash(password, saltPassword);

	const signedUpUser = new User({
		email: email,
		password: securePassword,
	});

	try {
		const user = await User.findOne({ email }).exec();
		if (user) {
			res.status(409).send({ message: 'This email is already registered.' });
		} else {
			await signedUpUser.save();
			res.status(201).json(signedUpUser);
		}
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};
