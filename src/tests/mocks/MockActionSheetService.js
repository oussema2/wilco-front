export default class MockActionSheetService {
	constructor() {
		this.open = jest.fn();
		this.close = jest.fn();
		this.isOpen = false;
		this.actions = [];
	}
}
