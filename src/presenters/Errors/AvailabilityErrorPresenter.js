import ErrorPresenter from './ErrorPresenter';

export default class AvailabilityErrorPresenter extends ErrorPresenter {
	_presentErrorByType() {
		return this.errorDescription;
	}
}
