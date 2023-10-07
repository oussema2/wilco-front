import ErrorPresenter from './ErrorPresenter';

export default class UnknownErrorPresenter extends ErrorPresenter {
	_presentErrorByType() {
		return 'There has been an unexpected error';
	}
}
