import WilcoError from './WilcoError';

export default class UnknownError extends WilcoError {
	get isUnknownError() {
		return true;
	}
}
