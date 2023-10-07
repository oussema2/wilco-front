export default class MockModalService {
	constructor() {
		this.open = jest.fn();
		this.close = jest.fn();
		this.getData = jest.fn();
		this.modals = {};
	}
}
