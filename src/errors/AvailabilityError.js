import WilcoError from './WilcoError';

export default class AvailabilityError extends WilcoError {
	get isAvailabilityError() {
		return true;
	}

	get isNetworkError() {
		return false;
	}
}
