import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'An email is required.'],
		validate: {
			validator: function (val) {
				return validator.isEmail(val);
			},
			message: 'Please enter a valid email.',
		},
		unique: true,
	},
	password: {
		type: String,
		required: true,
		required: [true, 'A password is required'],
		validate: {
			validator: function (val) {
				return validator.isStrongPassword(val, {
					minLength: 6,
					minLowercase: 0,
					minUppercase: 0,
					minNumbers: 0,
					minSymbols: 0,
				});
			},
			message: 'A password must be at least 6 charactors.',
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

// fire a function before an instance saved to data base
userSchema.pre('save', async function (next) {
	// encrypt the password
	const saltPassword = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, saltPassword);
	next();
});

const User = mongoose.model('User', userSchema);

export default User;
