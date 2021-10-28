import User from '../models/userModels.js';
import bcrypt from 'bcrypt';

export const sendUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).exec();

		if (user) {
			await bcrypt.compare(password, user.password, function (err, result) {
				if (err) {
					// handle error
					throw new Error(err);
				}
				if (result) {
					res.status(201).json({ message: 'Logged in successfully!' });
				} else {
					res
						.status(403)
						.json({ message: 'Either email or password is invalid.' });
				}
			});
		} else {
			res.status(403).json({ message: 'Either email or password is invalid.' });
		}
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};
