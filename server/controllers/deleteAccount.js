import User from '../models/userModels.js';

export const deleteAccount_post = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email }).exec();
		if (user) {
			await User.deleteOne({ email }).exec();
			res.status(201).json({ message: 'Deleted the account successfully.' });
		} else {
			res.status(409).json({ message: 'The account is not found.' });
		}
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};
