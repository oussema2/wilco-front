import WilcoError from './WilcoError';

export default class InputError extends WilcoError {
	get isInputError() {
		return true;
	}
}
