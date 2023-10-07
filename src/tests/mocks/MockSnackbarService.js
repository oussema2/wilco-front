export default class MockSnackbarService {
	constructor() {
		this.isVisible = false;
		this.message = '';
		this.type = 'info';

		this.showInfo = jest.fn();
		this.showSuccess = jest.fn();
		this.showError = jest.fn();
	}
}
