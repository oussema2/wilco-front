import ErrorPresenter from './ErrorPresenter';

export default class NetworkErrorPresenter extends ErrorPresenter {
	_presentErrorByType() {
		return 'Connection error. Please try again.';
	}
}
