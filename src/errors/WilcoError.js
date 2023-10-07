export default class WilcoError extends Error {
	constructor( { name, description = null } = {} ) {
		const message = typeof description === 'string' ? description : '';

		super( message );
		this.name = this.constructor.name;
		this.errorName = name;
		this.errorDescription = description;
	}

	get isWilcoError() {
		return true;
	}

	get isAvailabilityError() {
		return false;
	}

	get isInputError() {
		return false;
	}

	get isUnknownError() {
		return false;
	}
}
