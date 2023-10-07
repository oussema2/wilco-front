import AvailabilityError from './AvailabilityError';

export default class NetworkError extends AvailabilityError {
	get isNetworkError() {
		return true;
	}
}
