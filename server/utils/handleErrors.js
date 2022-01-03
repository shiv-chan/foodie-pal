export const handleSignUpErrors = (error) => {
	let ERROR = {
		email: '',
		password: '',
	};

	// validation errors
	if (error.message.includes('User validation failed:')) {
		const errorsProperty = Object.values(error.errors);
		errorsProperty.forEach(({ properties }) => {
			ERROR[properties.path] = properties.message;
		});
	}

	return ERROR;
};

export const handleAddRecipeErrors = (error) => {
	let ERROR = {
		author: '',
		title: '',
		serves: '',
	};

	// validation errors
	if (error.message.includes('Recipe validation failed:')) {
		const errorsProperty = Object.values(error.errors);
		errorsProperty.forEach(({ properties }) => {
			ERROR[properties.path] = properties.message;
		});
	}

	return ERROR;
};
