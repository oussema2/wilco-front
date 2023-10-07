import ErrorPresenter from './ErrorPresenter';

export default class WilcoErrorPresenter extends ErrorPresenter {
	_presentErrorByType() {
		return this.error.errorDescription;
	}
}
